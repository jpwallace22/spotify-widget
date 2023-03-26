import SpotifyWebApi from 'spotify-web-api-node'
import store from '../store'

export interface ITrack extends SpotifyApi.TrackObjectFull {
  is_saved: boolean
  is_playing: boolean
}

const fetchTrackInfo = async (client: SpotifyWebApi): Promise<ITrack | null> => {
  // cant use Promise.all because data is needed from first fetch
  const playbackState = await client.getMyCurrentPlaybackState()
  const playbackItem = playbackState.body.item
  const savedData = playbackItem?.id && (await client.containsMySavedTracks([playbackItem?.id]))

  if (!playbackItem) {
    return null
  }

  const track = {
    ...playbackItem,
    is_saved: !!(savedData && savedData.body[0]),
    is_playing: playbackState.body.is_playing
  }

  store.set({ track })
  return track as ITrack
}

export default fetchTrackInfo
