import { Presence, Motion } from '@motionone/solid'
import { StyledTip, TooltipWrapper } from '@renderer/components/Tooltip/tooltip.styles'
import { Component, createEffect, createSignal, JSXElement, mergeProps, on, Show } from 'solid-js'

interface ITooltip {
  tip?: string
  children: JSXElement
  waitTime?: number
}

const Tooltip: Component<ITooltip> = (props) => {
  const [showTip, setShowTip] = createSignal(false)
  const merged = mergeProps({ waitTime: 200 }, props)

  let timer: number

  const handleMouseEnter = (): void => {
    if (props.tip) {
      timer = setTimeout(() => setShowTip(true), merged.waitTime)
    }
  }
  const handleMouseLeave = (): void => {
    clearTimeout(timer)
    setShowTip(false)
  }

  createEffect(on(showTip, () => clearTimeout(timer)))

  return (
    <TooltipWrapper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Presence>
        <Show when={showTip()}>
          <Motion.div
            initial={{ opacity: 0, y: -7 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -7 }}
            transition={{ duration: 0.3 }}
          >
            <StyledTip>{props.tip}</StyledTip>
          </Motion.div>
        </Show>
      </Presence>
      {props.children}
    </TooltipWrapper>
  )
}

export default Tooltip
