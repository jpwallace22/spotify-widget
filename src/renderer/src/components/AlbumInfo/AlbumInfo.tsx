import {
  AlbumArt,
  AlbumWrapper,
  FlexCol,
  TextWrapper
} from '@renderer/components/AlbumInfo/albumInfo.styles'
import ControlPanel from '@renderer/components/ControlPanel/ControlPanel'
import Text from '@renderer/molecules/Text'
import { Component, Show } from 'solid-js'

interface IAlbumInfo {
  track: ITrack
}

const AlbumInfo: Component<IAlbumInfo> = (props) => {
  return (
    <Show
      when={props.track}
      fallback={
        <div class="center">
          <Text size="lg" color="white">
            No active devices
          </Text>
        </div>
      }
    >
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
          <ControlPanel isPlaying={props.track.is_playing} isSaved={props.track.is_saved} />
        </TextWrapper>
      </AlbumWrapper>
    </Show>
  )
}

export default AlbumInfo
