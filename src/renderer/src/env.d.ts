/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly R_VITE_SPOTIFY_CLIENT_ID: string
  readonly R_VITE_SPOTIFY_CLIENT_SECRET: string
  readonly R_VITE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface ITrack extends SpotifyApi.TrackObjectFull {
  is_saved: boolean
}

interface ISpotifyApi {
  getCurrentTrack: (request: (event: IpcMainEvent, data: ITrack) => void) => void
  updateSavedTrack: () => void
}

interface Window {
  spotifyApi: ISpotifyApi
}
