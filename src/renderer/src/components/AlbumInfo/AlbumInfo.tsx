import {
  AlbumArt,
  AlbumWrapper,
  FlexWrapper,
  StyledHeart,
  TextWrapper
} from '@renderer/components/AlbumInfo/albumInfo.styles'

import Text from '@renderer/molecules/Text'
import classNames from 'classnames'
import { Component, createEffect } from 'solid-js'

interface IAlbumInfo {
  track: ITrack
}

const AlbumInfo: Component<IAlbumInfo> = (props) => {
  return (
    <AlbumWrapper>
      <AlbumArt src={props.track.album.images[0].url} />
      <TextWrapper>
        <FlexWrapper>
          <Text size="md">{props.track?.name}</Text>
          <Text size="sm" color="lightGray">
            {props.track?.artists[0].name} - {props.track?.album.name}
          </Text>
        </FlexWrapper>
        <StyledHeart class={classNames({ saved: props.track.is_saved })} />
      </TextWrapper>
    </AlbumWrapper>
  )
}

export default AlbumInfo
