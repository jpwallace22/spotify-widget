import SpotifyWebApi from 'spotify-web-api-node'

const spotifyClient = (): SpotifyWebApi => {
  const { M_VITE_SPOTIFY_CLIENT_ID, M_VITE_SPOTIFY_CLIENT_SECRET, M_VITE_SPOTIFY_URI_CALLBACK } =
    import.meta.env

  console.log(M_VITE_SPOTIFY_URI_CALLBACK)

  const spotifyApi = new SpotifyWebApi({
    redirectUri: M_VITE_SPOTIFY_URI_CALLBACK,
    clientSecret: M_VITE_SPOTIFY_CLIENT_SECRET,
    clientId: M_VITE_SPOTIFY_CLIENT_ID
  })

  return spotifyApi
}

export default spotifyClient
