import Button from '@renderer/components/Button/Button'
import FlexRow from '@renderer/molecules/FlexRow'

import { Component } from 'solid-js'

interface IControlPanel {
  isPlaying: boolean
}

const ControlPanel: Component<IControlPanel> = (props) => {
  return (
    <FlexRow gap="16px">
      <Button
        id="previous"
        tooltip="Previous Track"
        onClick={(): void => window.spotifyApi.prevTrack()}
      />
      {props.isPlaying ? (
        <Button
          id="pause"
          tooltip="Pause Track"
          onClick={(): void => window.spotifyApi.togglePlay()}
        />
      ) : (
        <Button
          id="play"
          tooltip="Play Track"
          onClick={(): void => window.spotifyApi.togglePlay()}
        />
      )}
      <Button id="next" tooltip="Next Track" onClick={(): void => window.spotifyApi.nextTrack()} />
    </FlexRow>
  )
}

export default ControlPanel
