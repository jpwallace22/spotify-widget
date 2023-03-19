import SpotifyWebApi from 'spotify-web-api-node'

interface Keys {
  accessToken: string
  refreshToken: string
}

const clientInit = async (): Promise<Keys> => {
  // @ts-expect-error declared on window interface but not working?
  const keys = await window.electronAPI.getClient()
  return keys
}
const spotifyClient = async (): Promise<SpotifyWebApi> => {
  const { R_VITE_SPOTIFY_CLIENT_ID, R_VITE_SPOTIFY_CLIENT_SECRET } = import.meta.env

  const spotifyApi = new SpotifyWebApi({
    clientSecret: R_VITE_SPOTIFY_CLIENT_SECRET,
    clientId: R_VITE_SPOTIFY_CLIENT_ID
  })

  const credentials = await clientInit()

  spotifyApi.setCredentials(credentials)

  return spotifyApi
}

export default spotifyClient
