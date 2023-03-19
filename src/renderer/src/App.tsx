import AlbumInfo from '@renderer/components/AlbumInfo/AlbumInfo'
import Base from '@renderer/components/Base/Base'
import useTrackInfo from '@renderer/hooks/useTrackInfo'
import { Component } from 'solid-js'

const App: Component = () => {
  const [track, { isLoading }] = useTrackInfo()

  return <Base>{isLoading() ? 'loading...' : <AlbumInfo track={track()} />}</Base>
}

export default App
