import {
  AlbumArt,
  AlbumWrapper,
  FlexWrapper,
  StyledHeart,
  TextWrapper
} from '@renderer/components/AlbumInfo/albumInfo.styles'
import Tooltip from '@renderer/components/Tooltip/Tooltip'

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
        <FlexWrapper>
          <Text size="md">{props.track?.name}</Text>
          <Text size="sm" color="lightGray">
            {props.track?.artists[0].name} - {props.track?.album.name}
          </Text>
        </FlexWrapper>
        <Tooltip tip="Save This Track">
          <StyledHeart
            class={classNames({ saved: props.track.is_saved })}
            onClick={(): void => window.spotifyApi.updateSavedTrack()}
          />
        </Tooltip>
      </TextWrapper>
    </AlbumWrapper>
  )
}

export default AlbumInfo
