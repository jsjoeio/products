import React from 'react'
import {UserGroupIcon} from '@heroicons/react/solid'

const Card: React.FC<
  React.PropsWithChildren<{
    icon: React.ReactElement
    title: {
      as: React.ElementType
      content: string
    }
  }>
> = ({
  children,
  icon = <UserGroupIcon className="w-5 text-green-500" aria-hidden="true" />,
  title = {as: 'h1', content: `Invite your team`},
}) => {
  const Title = (props: any) =>
    React.createElement(title.as, props, `${title.content}`)
  return (
    <div className="w-full rounded-lg bg-white px-5 py-5 sm:px-8 sm:py-8">
      <div className="flex items-center gap-2 text-xl font-bold">
        {icon} <Title />
      </div>
      <div className="pt-3">{children}</div>
    </div>
  )
}

export default Card
