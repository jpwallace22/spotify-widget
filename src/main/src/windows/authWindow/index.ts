import { BrowserWindow } from 'electron'
import createWindow from '../mainWindow'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyAuthFlow = (): void => {
  const AUTH_URL = 'https://accounts.spotify.com/authorize?'
  const URI_CALLBACK = 'spotify-mini://callback'
  const { M_VITE_SPOTIFY_CLIENT_ID, M_VITE_SPOTIFY_CLIENT_SECRET } = import.meta.env

  let authWindow: BrowserWindow | null = new BrowserWindow({
    width: 800,
    height: 600,
    show: false
  })

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: M_VITE_SPOTIFY_CLIENT_ID,
    scope: 'streaming user-read-playback-state user-modify-playback-state',
    redirect_uri: URI_CALLBACK
  }).toString()

  authWindow.loadURL(AUTH_URL + params)

  authWindow.webContents.on('did-redirect-navigation', (_, redirect) => {
    const url = new URL(redirect)
    const authCode = url.searchParams.get('code')

    const spotifyApi = new SpotifyWebApi({
      redirectUri: URI_CALLBACK,
      clientSecret: M_VITE_SPOTIFY_CLIENT_SECRET,
      clientId: M_VITE_SPOTIFY_CLIENT_ID
    })

    authCode &&
      spotifyApi.authorizationCodeGrant(authCode).then((data) => {
        console.log({
          accessToken: data.body.access_token,
          refreshToken: data.body.refresh_token,
          expiresIn: data.body.expires_in
        })
        createWindow()
      })
  })

  authWindow.on('closed', function () {
    authWindow = null
  })
}

export default spotifyAuthFlow
