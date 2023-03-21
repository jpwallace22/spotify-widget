import { Accessor, createSignal } from 'solid-js'

const useTrackInfo = (): [Accessor<ITrack | null>, { isLoading: Accessor<boolean> }] => {
  const [track, setTrack] = createSignal<ITrack | null>(null)
  const [isLoading, setIsLoading] = createSignal<boolean>(true)

  window.spotifyApi.getCurrentTrack((_, data) => {
    setTrack(data)
    setIsLoading(false)
  })

  return [track, { isLoading }]
}

export default useTrackInfo
