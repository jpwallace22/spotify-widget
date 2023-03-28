import { BrowserWindow } from 'electron'
import SpotifyWebApi from 'spotify-web-api-node'
import store from '../store'
import authFlow from './authFlow'

export interface ITrack extends SpotifyApi.TrackObjectFull {
  is_saved: boolean
  is_playing: boolean
}

const fetchTrackInfo = async (
  client: SpotifyWebApi,
  authWindow?: BrowserWindow
): Promise<ITrack | null> => {
  try {
    const playbackState = await client.getMyCurrentPlaybackState()

    if (playbackState.statusCode === 401 && authWindow) {
      authFlow(authWindow)
      setTimeout(() => {
        return fetchTrackInfo(client)
      }, 1000)
    }

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
  } catch (error) {
    console.log(error)
    return null
  }
}

export default fetchTrackInfo
