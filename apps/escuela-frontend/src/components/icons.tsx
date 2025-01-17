import React from 'react'

type IconProperties = {
  className?: string
  viewBox?: string
  title?: string
  role?: string
  size?: '16' | '20' | '24' | '32' | '40'
  name: IconNames
}

const Icons = {
  Stars: () => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
      />
    </svg>
  ),
  Checkmark: () => (
    <polygon
      points="0.5,7.5 2,6 5.5,8.5 14,2 15.5,3.5 5.5,13.5"
      fill="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  Rocket: () => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
      />
    </svg>
  ),
  Playmark: () => (
    <path
      fill="currentColor"
      d="m13.6 7.2-10-7A1 1 0 0 0 2 1v14a1 1 0 0 0 1.6.8l10-7c.5-.4.5-1.2 0-1.6Z"
    />
  ),
  Puzzle: () => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
      />
    </svg>
  ),
  Github: () => (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      fill="currentColor"
      d="M8,0.2c-4.4,0-8,3.6-8,8c0,3.5,2.3,6.5,5.5,7.6 C5.9,15.9,6,15.6,6,15.4c0-0.2,0-0.7,0-1.4C3.8,14.5,3.3,13,3.3,13c-0.4-0.9-0.9-1.2-0.9-1.2c-0.7-0.5,0.1-0.5,0.1-0.5 c0.8,0.1,1.2,0.8,1.2,0.8C4.4,13.4,5.6,13,6,12.8c0.1-0.5,0.3-0.9,0.5-1.1c-1.8-0.2-3.6-0.9-3.6-4c0-0.9,0.3-1.6,0.8-2.1 c-0.1-0.2-0.4-1,0.1-2.1c0,0,0.7-0.2,2.2,0.8c0.6-0.2,1.3-0.3,2-0.3c0.7,0,1.4,0.1,2,0.3c1.5-1,2.2-0.8,2.2-0.8 c0.4,1.1,0.2,1.9,0.1,2.1c0.5,0.6,0.8,1.3,0.8,2.1c0,3.1-1.9,3.7-3.7,3.9C9.7,12,10,12.5,10,13.2c0,1.1,0,1.9,0,2.2 c0,0.2,0.1,0.5,0.6,0.4c3.2-1.1,5.5-4.1,5.5-7.6C16,3.8,12.4,0.2,8,0.2z"
    />
  ),
  Video: () => (
    <path
      d="M16,14V2a2,2,0,0,0-2-2H2A2,2,0,0,0,0,2V14a2,2,0,0,0,2,2H14A2,2,0,0,0,16,14ZM6.258,10.938A.5.5,0,0,1,6,10.5v-5a.5.5,0,0,1,.765-.424l4,2.5a.52.52,0,0,1,0,.848l-4,2.5A.5.5,0,0,1,6.258,10.938Z"
      fill="currentColor"
    />
  ),

  Figma: () => (
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M4.714 2.214c.297-.297.7-.464 1.12-.464h1.583v3.167H5.815a1.583 1.583 0 0 1-1.101-2.703Zm4.203 8.431v2.022a3.083 3.083 0 1 1-5.1-2.334 3.083 3.083 0 0 1 0-4.667A3.088 3.088 0 0 1 2.75 3.334 3.083 3.083 0 0 1 5.833.25H10.5a3.084 3.084 0 0 1 2.016 5.417 3.105 3.105 0 0 1 .833 1.153 3.084 3.084 0 0 1-4.432 3.825ZM4.714 6.88a1.583 1.583 0 0 1 1.1-.463h1.603v3.166H5.833a1.583 1.583 0 0 1-1.12-2.703Zm0 4.667c.297-.297.7-.463 1.12-.463h1.583v1.583a1.583 1.583 0 1 1-2.703-1.12Zm5.786-5.13h-.022a1.583 1.583 0 1 0 .04 0H10.5Zm.606-1.62a1.583 1.583 0 0 1-.587.12H8.917V1.75H10.5a1.583 1.583 0 0 1 .606 3.046Z"
      clipRule="evenodd"
    />
  ),
} as const

type IconNames = keyof typeof Icons

const Icon: React.FC<IconProperties> = ({
  viewBox,
  title,
  size,
  name,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox={viewBox}
    aria-hidden={!title}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {title && <title>{title}</title>}
    {Icons[name]()}
  </svg>
)

Icon.defaultProps = {
  viewBox: '0 0 16 16',
  size: '16',
  role: 'img',
}

export default Icon

export const IconGithub: React.FC<{className?: string}> = ({
  className = 'w-4 h-4',
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
    >
      <title>logo-github</title>
      <g fill="currentColor">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="currentColor"
          d="M8,0.2c-4.4,0-8,3.6-8,8c0,3.5,2.3,6.5,5.5,7.6 C5.9,15.9,6,15.6,6,15.4c0-0.2,0-0.7,0-1.4C3.8,14.5,3.3,13,3.3,13c-0.4-0.9-0.9-1.2-0.9-1.2c-0.7-0.5,0.1-0.5,0.1-0.5 c0.8,0.1,1.2,0.8,1.2,0.8C4.4,13.4,5.6,13,6,12.8c0.1-0.5,0.3-0.9,0.5-1.1c-1.8-0.2-3.6-0.9-3.6-4c0-0.9,0.3-1.6,0.8-2.1 c-0.1-0.2-0.4-1,0.1-2.1c0,0,0.7-0.2,2.2,0.8c0.6-0.2,1.3-0.3,2-0.3c0.7,0,1.4,0.1,2,0.3c1.5-1,2.2-0.8,2.2-0.8 c0.4,1.1,0.2,1.9,0.1,2.1c0.5,0.6,0.8,1.3,0.8,2.1c0,3.1-1.9,3.7-3.7,3.9C9.7,12,10,12.5,10,13.2c0,1.1,0,1.9,0,2.2 c0,0.2,0.1,0.5,0.6,0.4c3.2-1.1,5.5-4.1,5.5-7.6C16,3.8,12.4,0.2,8,0.2z"
        ></path>
      </g>
    </svg>
  )
}
