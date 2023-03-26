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
  is_playing: boolean
}

interface ISpotifyApi {
  getCurrentTrack: (request: (event: IpcMainEvent, data: ITrack) => void) => void
  updateSavedTrack: () => void
  nextTrack: () => void
  prevTrack: () => void
  togglePlay: () => void
}

interface IPlaylistApi {
  openPlaylist: () => void
}

interface Window {
  spotifyApi: ISpotifyApi
  playlistApi: IPlaylistApi
}
