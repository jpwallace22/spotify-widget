import { BrowserWindow } from 'electron'
import type SpotifyWebApi from 'spotify-web-api-node'
import store from '../store'

export const refreshToken = async (client: SpotifyWebApi): Promise<void> => {
  client.refreshAccessToken().then(
    ({ body: { access_token } }) => {
      client.setCredentials({ accessToken: access_token })
      store.set('accessToken', access_token)
    },
    (err) => console.error('Error when refreshing access token', err)
  )
}

const authFlow = (authWindow: BrowserWindow | null): void => {
  const AUTH_URL = 'https://accounts.spotify.com/authorize?'
  const { M_VITE_SPOTIFY_CLIENT_ID, M_VITE_SPOTIFY_URI_CALLBACK } = import.meta.env

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: M_VITE_SPOTIFY_CLIENT_ID,
    scope:
      'streaming user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-email user-read-private app-remote-control user-library-read user-library-modify playlist-modify-private playlist-modify-public',
    redirect_uri: M_VITE_SPOTIFY_URI_CALLBACK
  }).toString()

  authWindow?.loadURL(AUTH_URL + params)

  // Show window for callback
  authWindow?.webContents.on('did-navigate', () => {
    authWindow?.show()
  })

  authWindow?.on('closed', function () {
    authWindow = null
  })
}

export default authFlow
