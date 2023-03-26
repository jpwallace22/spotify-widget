import SpotifyWebApi from 'spotify-web-api-node'
import store from '../store'
import { ITrack } from './fetchTrackInfo'

const updateSavedTrack = async (client: SpotifyWebApi): Promise<ITrack | null> => {
  // TODO need to build schema for store to remove type assertions
  const trackId = store.get('track.id') as string | undefined
  const currentState = store.get('track.is_saved') as boolean

  if (trackId) {
    const res = currentState
      ? await client.removeFromMySavedTracks([trackId])
      : await client.addToMySavedTracks([trackId])
    if (res.statusCode === 200) {
      store.set('track.is_saved', !currentState)
      const updatedTrack = store.get('track') as ITrack
      return updatedTrack
    }
  }

  return null
}

export default updateSavedTrack
