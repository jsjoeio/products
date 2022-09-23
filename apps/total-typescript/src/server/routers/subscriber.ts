import {createRouter} from 'server/createRouter'
import {SubscriberSchema} from '../../lib/convertkit'

export const subscriberRouter = createRouter().query('current', {
  async resolve({ctx, input}) {
    const subscriber = ctx.req.cookies['ck_subscriber']
    return subscriber
      ? SubscriberSchema.parse(JSON.parse(subscriber))
      : undefined
  },
})