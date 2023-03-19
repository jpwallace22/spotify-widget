import { Accessor, createSignal } from 'solid-js'

const useTrackInfo = (): [
  Accessor<SpotifyApi.TrackObjectFull | null>,
  { isLoading: Accessor<boolean> }
] => {
  const [track, setTrack] = createSignal<SpotifyApi.TrackObjectFull | null>(null)
  const [isLoading, setIsLoading] = createSignal<boolean>(true)

  window.spotifyApi.getCurrentTrack((_, data) => {
    setTrack(data)
    setIsLoading(false)
  })

  return [track, { isLoading }]
}

export default useTrackInfo
