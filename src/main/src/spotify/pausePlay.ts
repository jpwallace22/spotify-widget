import SpotifyWebApi from 'spotify-web-api-node'
import store from '../store'
import type { ITrack } from './fetchTrackInfo'

const pausePlay = async (client: SpotifyWebApi): Promise<ITrack | null> => {
  const isPlaying = store.get('track.is_playing') as ITrack
  const res = isPlaying ? await client.pause() : await client.play()

  if (res.statusCode === 204) {
    store.set('track.is_playing', !isPlaying)
    const updatedTrack = store.get('track')
    return updatedTrack as ITrack
  }

  return null
}

export default pausePlay
