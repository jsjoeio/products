import React from 'react'
import Layout from 'layouts'
import bundle from '../data/bundle'
import Link from 'next/link'
import get from 'lodash/get'
import Image from 'next/image'
import Markdown from 'react-markdown'
import LandingCopy from 'components/content/homepage.mdx'
import Header from 'components/hero'

const Home = () => {
  return (
    <Layout className=" dark:bg-gray-900 bg-white-50">
      <Header currentPrice={0} />
      <main>
        <article className="prose sm:prose-lg mx-auto lg:pt-24 sm:pt-16 pt-8">
          <LandingCopy />
        </article>
        <div className="sm:flex border-t border-gray-100 items-center justify-center py-16 mt-24 sm:-mx-10 -mx-5 sm:px-10 px-5 bg-gradient-to-r from-white via-gray-50 to-gray-100">
          <div className="relative max-w-screen-xl space-y-16">
            <h2 className="text-center lg:text-5xl md:text-4xl text-4xl pt-8 font-extrabold">
              {/* <div className="h-[2px] w-24 absolute left-0 -translate-x-28 bg-black" />{' '} */}
              What's Inside
            </h2>
            <TestingSection />
            <EpicReactSection />
          </div>
        </div>
      </main>
    </Layout>
  )
}

const TestingSection = () => {
  const testingJS = get(bundle, 'testing-js')
  return (
    <section className="md:grid grid-cols-5 lg:gap-16 gap-10 py-8">
      <div className="col-span-3">
        <BundleSectionContent {...testingJS} />
      </div>
      <div className="col-span-2">
        <Bundle {...testingJS} title="Testing JavaScript" />
      </div>
    </section>
  )
}

const EpicReactSection = () => {
  const epicReact = get(bundle, 'epic-react')
  return (
    <section className="md:grid grid-cols-5 lg:gap-16 gap-10 py-8">
      <div className="col-span-3">
        <BundleSectionContent {...epicReact} />
      </div>
      <div className="col-span-2">
        <Bundle
          className="border-indigo-500"
          {...epicReact}
          title="Epic React"
        />
      </div>
    </section>
  )
}

const Bundle = ({
  title,
  url,
  name,
  description,
  image,
  modules,
  interviews,
  includes,
}: any) => {
  const Item = ({
    image,
    title,
    duration,
    lessonCount,
    className = '',
    i,
  }: any) => (
    <li
      className={`rounded-md py-2 px-3 leading-tight lg:text-base text-sm font-medium flex items-center space-x-2 ${
        i % 2 && 'bg-gray-50'
      } ${className}`}
    >
      {image && (
        <div className="flex-shrink-0 flex items-center justify-center">
          <Image
            src={image}
            width={32}
            height={32}
            alt={title}
            className={lessonCount ? 'rounded-md' : 'rounded-full'}
          />
        </div>
      )}
      <div className="flex-grow">{title}</div>
      {duration && lessonCount && (
        <div className="flex-shrink-0 text-xs font-normal opacity-60">
          {lessonCount} lessons
          <br />
          {duration}
        </div>
      )}
    </li>
  )
  return (
    <article className="bg-white rounded-lg shadow-lg">
      <header
        className={`relative flex w-full justify-between items-start overflow-visible border-t-8 ${
          name === 'TestingJavaScript.com'
            ? 'border-yellow-400'
            : 'border-indigo-500'
        } px-5 pt-5 lg:pb-0 pb-5 rounded-t-lg`}
      >
        <div>
          <h4 className="text-2xl font-bold pr-3 leading-none">{title}</h4>
          <div className="pt-2 flex items-center">
            <Image
              src="/kent-c-dodds@2x.jpg"
              alt="Kent C. Dodds"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="sm:pl-2 pl-1 md:text-base text-sm font-medium">
              Kent C. Dodds
            </div>
          </div>
        </div>
        <div className="-translate-y-9 flex items-center justify-center bg-white shadow-md rounded-md overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={140 / 1.75}
            height={180 / 1.75}
            quality={100}
          />
        </div>
      </header>
      <div className="px-3 pt-4 border-t border-gray-100">
        <h5 className="px-1 py-2 lg:text-base text-sm font-bold">
          {description}
        </h5>
        <ul>
          {modules.map((module: any, i: number) => (
            <Item key={module.title} i={i} {...module} />
          ))}
        </ul>
        <h5 className="px-1 pt-6 pb-2 lg:text-base text-sm font-bold">
          {interviews.length} interviews with industry experts
        </h5>
        <ul>
          {interviews?.map((module: any, i: number) => (
            <Item key={module.title} i={i} {...module} />
          ))}
        </ul>
        <h5 className="px-1 pt-6 pb-2 lg:text-base text-sm font-bold">
          In the bundle
        </h5>
        <ul className="ml-2 relative">
          {includes?.map((i: string) => (
            <li
              key={i}
              className="px-3 leading-tight py-2 lg:text-base text-sm font-medium"
            >
              <span className="gg-check absolute -left-2" />
              <span className="pl-1 inline-block">{i}</span>
            </li>
          ))}
        </ul>
      </div>
      <footer className="p-5 space-y-2 border-t border-gray-50 mt-8">
        <div className="">
          <a
            className=" text-center opacity-80 items-center justify-center flex w-full font-medium hover:opacity-100 transition-all ease-in-out duration-200 rounded-md px-5 lg:text-base text-sm text-gray-800"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="gg-arrow-top-right scale-75" />
            <span className="pl-2">Open {name}</span>{' '}
          </a>
        </div>
      </footer>
    </article>
  )
}

const BundleSectionContent = ({
  title,
  copy,
  price,
  newPrice,
  name,
  image,
  reviews,
}: any) => {
  return (
    <div>
      <div
        className={`sm:text-base text-sm font-semibold pb-2 ${
          name === 'TestingJavaScript.com'
            ? 'text-amber-500'
            : 'text-indigo-500'
        }`}
      >
        {name}
      </div>
      <h3 className="sm:text-4xl text-3xl font-bold pb-5">{title}</h3>
      <Markdown className="prose sm:prose-lg">{copy}</Markdown>
      <div className="grid sm:mt-10 mt-4">
        <p className="font-bold sm:text-2xl text-2xl sm:text-left text-center sm:pb-6 pb-10 pt-10">
          What other developers are saying
        </p>
        {reviews?.map((review: any) => (
          <Review key={review.author.name} {...review} className="pb-6" />
        ))}
      </div>
    </div>
  )
}
const Review = ({text, author, className = ''}: any) => {
  return (
    <blockquote className={`relative ${className}`}>
      {/* <div className="text-4xl opacity-50 absolute -left-2">“</div> */}
      <Markdown className="prose md:prose-lg">{text}</Markdown>
      <div className="flex items-center pt-2">
        {author.image && (
          <Image
            src={author.image}
            alt={author.name}
            width={32}
            height={32}
            className="rounded-full "
          />
        )}
        <div className="pl-2 text-sm">{author.name}</div>
      </div>
    </blockquote>
  )
}

export default Home
