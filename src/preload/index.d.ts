interface ISpotifyApi {
  getCurrentTrack: (
    request: (event: IpcMainEvent, data: SpotifyApi.TrackObjectFull) => void
  ) => void
}

declare global {
  interface Window {
    spotifyApi: ISpotifyApi
  }
}
