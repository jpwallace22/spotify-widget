import Button from '@renderer/components/Button/Button'
import FlexRow from '@renderer/molecules/FlexRow'
import classNames from 'classnames'
import { Component } from 'solid-js'

interface IControlPanel {
  isPlaying: boolean
  isSaved: boolean
}

const ControlPanel: Component<IControlPanel> = (props) => {
  return (
    <FlexRow gap="24px">
      <Button
        id="heart"
        class={classNames('icon', { saved: props.isSaved })}
        onClick={(): void => window.spotifyApi.updateSavedTrack()}
        tooltip={props.isSaved ? 'Remove from Library' : 'Add to Library'}
      />
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
        <Button
          id="next"
          tooltip="Next Track"
          onClick={(): void => window.spotifyApi.nextTrack()}
        />
      </FlexRow>
      <Button
        id="playlist"
        class="icon"
        tooltip="Add to Playlist"
        onClick={(): void => window.electronApi.openPlaylist()}
      />
    </FlexRow>
  )
}

export default ControlPanel
