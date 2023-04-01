import { BrowserWindow } from 'electron'
import SpotifyWebApi from 'spotify-web-api-node'
import store from '../store'
import authFlow from './authFlow'

export interface ITrack extends SpotifyApi.TrackObjectFull {
  is_saved: boolean
  is_playing: boolean
}

const fetchTrackInfo = async (client: SpotifyWebApi): Promise<ITrack | null> => {
  try {
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
  } catch (error) {
    // @ts-expect-error need to create error instance
    if (error?.statusCode === 401) {
      const authWindow: BrowserWindow | null = new BrowserWindow({
        resizable: true,
        useContentSize: true,
        show: false
      })
      authFlow(authWindow)
      fetchTrackInfo(client)
    }
    return null
  }
}

export default fetchTrackInfo
