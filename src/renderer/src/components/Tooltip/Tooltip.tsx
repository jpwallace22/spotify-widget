import { StyledTip, TooltipWrapper } from '@renderer/components/Tooltip/tooltip.styles'
import classNames from 'classnames'
import { Component, createEffect, createSignal, JSXElement, mergeProps, on } from 'solid-js'

interface ITooltip {
  tip: string
  children: JSXElement
  waitTime?: number
}

const Tooltip: Component<ITooltip> = (props) => {
  const [showTip, setShowTip] = createSignal(false)
  const merged = mergeProps({ waitTime: 500 }, props)

  let timer: number

  const handleMouseEnter = (): void => {
    timer = setTimeout(() => setShowTip(true), merged.waitTime)
  }
  const handleMouseLeave = (): void => {
    clearTimeout(timer)
    setShowTip(false)
  }

  createEffect(on(showTip, () => clearTimeout(timer)))

  return (
    <TooltipWrapper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <StyledTip class={classNames({ active: showTip() })}> {props.tip}</StyledTip>
      {props.children}
    </TooltipWrapper>
  )
}

export default Tooltip
