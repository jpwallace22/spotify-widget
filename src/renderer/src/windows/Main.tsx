import AlbumInfo from '@renderer/components/AlbumInfo/AlbumInfo'
import Base from '@renderer/molecules/Base'
import Spinner from '@renderer/components/Spinner/Spinner'
import useTrackInfo from '@renderer/hooks/useTrackInfo'
import { Component, Show } from 'solid-js'
const App: Component = () => {
  const [track, { isLoading }] = useTrackInfo()

  return (
    <Base>
      <Show when={!isLoading()} fallback={<Spinner />}>
        <AlbumInfo track={track() as ITrack} />
      </Show>
    </Base>
  )
}

export default App
