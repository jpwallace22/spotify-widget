import AlbumArt from '@renderer/components/AlbumArt/AlbumArt'
import { AlbumWrapper, FlexCol, TextWrapper } from '@renderer/components/AlbumInfo/albumInfo.styles'
import ControlPanel from '@renderer/components/ControlPanel/ControlPanel'
import Message from '@renderer/components/Message/Message'
import Text from '@renderer/molecules/Text'
import { Component, Show } from 'solid-js'

interface IAlbumInfo {
  track: ITrack
}

const AlbumInfo: Component<IAlbumInfo> = (props) => {
  return (
    <Show when={props.track} fallback={<Message text="No active device" />}>
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
        <Message />
      </AlbumWrapper>
    </Show>
  )
}

export default AlbumInfo
