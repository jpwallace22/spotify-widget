import classNames from 'classnames'
import { Component, splitProps } from 'solid-js'
import { styled } from 'solid-styled-components'

import PrevSVG from '../../assets/svg/previous.svg?component-solid'
import PlaySVG from '../../assets/svg/play.svg?component-solid'
import PauseSVG from '../../assets/svg/pause.svg?component-solid'
import Tooltip from '@renderer/components/Tooltip/Tooltip'
import HeartSVG from '../../assets/svg/heart.svg?component-solid'
import PlaylistSVG from '../../assets/svg/playlist.svg?component-solid'

export interface IButton {
  id: keyof typeof svgMap
  css?: string
  tooltip?: string
  class?: string
  onClick?: () => void
}

const ButtonWrapper = styled.div`
  cursor: pointer;
  svg {
    fill: var(--light-gray);
    width: 18px;
  }
  &:hover svg {
    fill: var(--white);
  }
  .flipped {
    transform: rotate(180deg);
  }
  &.icon svg {
    stroke: var(--light-gray);
    fill: transparent;
    &:hover {
      stroke: var(--white);
    }
  }
  &.saved {
    svg {
      stroke: var(--primary-green);
      fill: var(--primary-green);
    }
    &:hover svg {
      stroke: var(--primary-green);
    }
  }
`

const svgMap = {
  previous: PrevSVG,
  next: PrevSVG,
  play: PlaySVG,
  pause: PauseSVG,
  heart: HeartSVG,
  playlist: PlaylistSVG
}

const Button: Component<IButton> = (props) => {
  const [local, rest] = splitProps(props, ['tooltip', 'id'])
  // eslint-disable-next-line solid/reactivity
  const SVG = svgMap[local.id]
  return (
    <Tooltip tip={local.tooltip}>
      <ButtonWrapper {...rest}>
        <SVG class={classNames({ flipped: props.id === 'next' })} />
      </ButtonWrapper>
    </Tooltip>
  )
}

export default Button
