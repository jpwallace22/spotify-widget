import Button from '@renderer/components/Button/Button'
import FlexRow from '@renderer/molecules/FlexRow'

import type { Component } from 'solid-js'

const ControlPanel: Component = () => {
  return (
    <FlexRow gap="16px">
      <Button id="previous" tooltip="Previous Track" />
      <Button id="pause" tooltip="Pause Track" />
      <Button id="next" tooltip="Next Track" />
    </FlexRow>
  )
}

export default ControlPanel
