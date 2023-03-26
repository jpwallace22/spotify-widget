import {
  AlbumArt,
  AlbumWrapper,
  FlexCol,
  TextWrapper
} from '@renderer/components/AlbumInfo/albumInfo.styles'
import Button from '@renderer/components/Button/Button'
import ControlPanel from '@renderer/components/ControlPanel/ControlPanel'
import FlexRow from '@renderer/molecules/FlexRow'
import Text from '@renderer/molecules/Text'
import classNames from 'classnames'
import { Component } from 'solid-js'

interface IAlbumInfo {
  track: ITrack
  loading?: boolean
}

const AlbumInfo: Component<IAlbumInfo> = (props) => {
  return (
    <AlbumWrapper>
      <AlbumArt src={props.track.album.images[0].url} />
      <TextWrapper>
        <FlexCol>
          <Text size="md" clamp={1}>
            {props.track?.name}
          </Text>
          <Text size="sm" color="lightGray" clamp={2}>
            {props.track?.artists[0].name} - {props.track?.album.name}
          </Text>
        </FlexCol>
        <FlexRow gap="24px">
          <Button
            id="heart"
            class={classNames('icon', { saved: props.track.is_saved })}
            onClick={(): void => window.spotifyApi.updateSavedTrack()}
            tooltip={props.track.is_saved ? 'Remove from Library' : 'Add to Library'}
          />
          <ControlPanel isPlaying={props.track.is_playing} />
          <Button id="playlist" class="icon" tooltip="Add to Playlist" />
        </FlexRow>
      </TextWrapper>
    </AlbumWrapper>
  )
}

export default AlbumInfo
