import { BrowserWindow } from 'electron'

const authFlow = (authWindow: BrowserWindow | null): void => {
  const AUTH_URL = 'https://accounts.spotify.com/authorize?'
  const { M_VITE_SPOTIFY_CLIENT_ID, M_VITE_SPOTIFY_URI_CALLBACK } = import.meta.env

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: M_VITE_SPOTIFY_CLIENT_ID,
    scope: 'streaming user-read-playback-state user-modify-playback-state',
    redirect_uri: M_VITE_SPOTIFY_URI_CALLBACK
    // show_dialog: 'true'
  }).toString()

  authWindow?.loadURL(AUTH_URL + params)

  authWindow?.webContents.on('did-navigate', () => {
    authWindow?.show()
  })

  authWindow?.on('closed', function () {
    authWindow = null
  })
}

export default authFlow
