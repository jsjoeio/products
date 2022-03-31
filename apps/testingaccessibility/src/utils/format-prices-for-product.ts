import {getPPPDiscountPercent} from './parity-coupon'
import {getBulkDiscountPercent} from './bulk-coupon'
import {getCalculatedPriced} from './get-calculated-price'
import {getSdk} from '../lib/prisma-api'
import {Context, defaultContext} from '../lib/context'

// TODO: create specific errors when there is an issue
// TODO: investigate upgrades using ad hoc pricing or fixed discount
// ad hoc: calculate the price difference between the two tiers
// where the product is immediately archived on the strip side
// but give the product a standard name/identifier to track upgrade
// revenue
// fixed discount: Upgrade to [Tier] is a product and the cost is a ratio
// of the tier you are upgrading from. Basic -> Pro
// TODO: Return the upgrade price for the product
// TODO: Checkout with ad hoc upgrade pricing
// TODO: Checkout with generated dynamic coupon
// https://stripe.com/docs/products-prices/manage-prices#ad-hoc-prices
// no upgrade for a bulk purchase
// upgrade price to a product requires
// - product is a higher tier
// - valid purchase of the qualifying upgradeable product
// - upgrade From X to Y cost -> (Target Product Price - Purchase Price) * 1.1
// 10% premium for an upgrade
// TODO: Display Coupon Errors
// TODO: Display Applied Site Coupon w/ Expiration
// TODO: Three tiers: Foundations / Pro / Team
// departure from the three tiers we've used in the past and the third tier
// is for teams

type FormatPricesForProductOptions = {
  productId: string
  country?: string
  quantity?: number
  code?: string
  couponId?: string
  ctx?: Context
}

export type FormattedPrice = {
  id: string
  quantity: number
  unitPrice: number
  calculatedPrice: number
  availableCoupons: any[]
  appliedCoupon?: any
}

/**
 *
 * @param productId
 * @param country
 * @param quantity
 * @param code
 * @param couponId
 * @param {Context} ctx the Prisma context
 */
export async function formatPricesForProduct({
  productId,
  country = 'US',
  quantity = 1,
  code,
  couponId,
  ctx = defaultContext,
}: FormatPricesForProductOptions) {
  const {getProduct, getMerchantCoupon, getCoupon, getPrice} = getSdk(ctx)
  if (quantity > 101) {
    throw new Error(
      'Please contact support and we will help you with your team order ASAP!',
    )
  }

  const product = await getProduct({
    where: {id: productId},
    include: {
      prices: true,
    },
  })

  if (!product) {
    throw new Error(`no-product-found-${productId}`)
  }

  const price = await getPrice({where: {productId}})

  if (!price) throw new Error(`no-price-found-${productId}`)

  const pppDiscountPercent = getPPPDiscountPercent(country)
  const bulkCouponPercent = getBulkDiscountPercent(quantity)

  // if there's a coupon implied because an id is passed in, load it to verify
  const appliedCoupon = couponId
    ? await getMerchantCoupon({where: {id: couponId}})
    : undefined

  console.log({appliedCoupon, couponId})

  const pppApplied =
    quantity === 1 && appliedCoupon?.type === 'ppp' && pppDiscountPercent > 0

  // pick the bigger discount during a sale
  const appliedCouponLessThanPPP = appliedCoupon
    ? appliedCoupon.percentageDiscount.toNumber() < pppDiscountPercent
    : true
  const appliedCouponLessThanBulk = appliedCoupon
    ? appliedCoupon.percentageDiscount.toNumber() < bulkCouponPercent
    : true

  const pppAvailable =
    quantity === 1 && pppDiscountPercent > 0 && appliedCouponLessThanPPP
  const bulkDiscountAvailable =
    bulkCouponPercent > 0 && appliedCouponLessThanBulk && !pppApplied

  let defaultPriceProduct: FormattedPrice = {
    ...product,
    quantity,
    unitPrice: price.unitAmount.toNumber(),
    calculatedPrice: price.unitAmount.toNumber() * quantity,
    availableCoupons: [],
  }

  if (appliedCoupon?.type === 'site') {
    defaultPriceProduct = {
      ...defaultPriceProduct,
      calculatedPrice: getCalculatedPriced({
        unitPrice: defaultPriceProduct.unitPrice,
        percentOfDiscount: appliedCoupon.percentageDiscount.toNumber(),
        quantity,
      }),
      appliedCoupon,
    }
  }

  // no ppp or bulk if you're applying a code
  if (code) {
    const coupon = await getCoupon({where: {code}})

    if (!coupon) throw new Error(`No coupon found for code [${code}`)

    if (coupon) {
      if (coupon.restrictedToProductId !== productId) {
        throw new Error('Invalid coupon.')
      }

      const calculatedPrice = getCalculatedPriced({
        unitPrice: defaultPriceProduct.unitPrice,
        percentOfDiscount: coupon.percentageDiscount.toNumber(),
      })

      return {
        ...defaultPriceProduct,
        calculatedPrice,
        appliedCoupon: coupon,
      }
    }
  } else if (pppApplied) {
    const invalidCoupon =
      pppDiscountPercent !== appliedCoupon.percentageDiscount.toNumber()

    if (invalidCoupon || appliedCoupon.type !== 'ppp')
      throw new Error('Invalid coupon')

    const {identifier, ...merchantCouponWithoutIdentifier} = appliedCoupon

    return {
      ...defaultPriceProduct,
      calculatedPrice: getCalculatedPriced({
        unitPrice: defaultPriceProduct.unitPrice,
        percentOfDiscount: appliedCoupon.percentageDiscount.toNumber(),
      }),
      appliedCoupon: merchantCouponWithoutIdentifier,
    }
  } else if (pppAvailable) {
    // no PPP for bulk
    const pppCoupons = await couponForType('ppp', pppDiscountPercent, ctx)

    return {
      ...defaultPriceProduct,
      availableCoupons: pppCoupons,
    }
  } else if (bulkDiscountAvailable) {
    const bulkCoupons = await couponForType('bulk', bulkCouponPercent, ctx)
    const bulkCoupon = bulkCoupons[0]

    return {
      ...defaultPriceProduct,
      calculatedPrice: getCalculatedPriced({
        unitPrice: defaultPriceProduct.unitPrice,
        percentOfDiscount: bulkCoupon.percentageDiscount.toNumber(),
        quantity,
      }),
      ...(bulkCoupon && {appliedCoupon: bulkCoupon}),
    }
  }

  return defaultPriceProduct
}

async function couponForType(
  type: string,
  percentageDiscount: number,
  ctx: Context,
) {
  const {getMerchantCoupons} = getSdk(ctx)
  const merchantCoupons =
    (await getMerchantCoupons({
      where: {type, percentageDiscount},
    })) || []

  return merchantCoupons.map((coupon) => {
    // for pricing we don't need the identifier so strip it here
    const {identifier, ...rest} = coupon
    return rest
  })
}
