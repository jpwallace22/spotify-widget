import AlbumInfo from '@renderer/components/AlbumInfo/AlbumInfo'
import Base from '@renderer/molecules/Base'
import Spinner from '@renderer/components/Spinner/Spinner'
import useTrackInfo from '@renderer/hooks/useTrackInfo'
import { Component } from 'solid-js'

const App: Component = () => {
  const [track, { isLoading }] = useTrackInfo()

  return (
    <Base>
      {isLoading() ? <Spinner /> : <AlbumInfo loading={isLoading()} track={track() as ITrack} />}
    </Base>
  )
}

export default App
