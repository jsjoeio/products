import * as React from 'react'
import cx from 'classnames'
import {useVideo} from '../../context/video-context'
import {useSelector} from '@xstate/react'
import {selectWithSidePanel} from '../../selectors'

type SidePanelToggleProps = {
  className?: string
}

export const SidePanelToggleControl: React.FC<SidePanelToggleProps> = ({
  className,
}) => {
  const videoService = useVideo()
  const withSidePanel = useSelector(videoService, selectWithSidePanel)
  function handleClick() {
    videoService.send({type: 'TOGGLE_SIDE_PANEL'})
  }
  return (
    <button
      className={cx(
        className,
        {
          'cueplayer-react-icon-format-indent-decrease': !withSidePanel,
          'cueplayer-react-icon-format-indent-increase': withSidePanel,
        },
        'cueplayer-react-side-panel-control cueplayer-react-control cueplayer-react-button cueplayer-react-icon',
      )}
      type="button"
      tabIndex={0}
      onClick={handleClick}
    >
      <span className="cueplayer-react-control-text">
        {withSidePanel ? '1' : '0'}
      </span>
    </button>
  )
}