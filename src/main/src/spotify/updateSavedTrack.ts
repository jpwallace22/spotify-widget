import SpotifyWebApi from 'spotify-web-api-node'
import store from '../store'

const updateSavedTrack = async (client: SpotifyWebApi): Promise<{ statusCode: number }> => {
  // TODO need to build schema for store to remove type assertions
  const trackId = store.get('track.id') as string | undefined
  const currentState = store.get('track.is_saved') as boolean

  if (trackId) {
    const res = currentState
      ? await client.removeFromMySavedTracks([trackId])
      : await client.addToMySavedTracks([trackId])
    if (res.statusCode === 200) {
      store.set('track.is_saved', !currentState)
    }
    return { statusCode: res.statusCode }
  }

  return { statusCode: 500 }
}

export default updateSavedTrack
