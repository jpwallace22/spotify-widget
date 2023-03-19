import SpotifyWebApi from 'spotify-web-api-node'

interface ITrack extends SpotifyApi.TrackObjectFull {
  is_saved: boolean
}

const fetchTrackInfo = async (client: SpotifyWebApi): Promise<ITrack> => {
  // cant use Promise.all because data is needed from first fetch
  const trackData = await client.getMyCurrentPlayingTrack()
  const track = trackData.body.item

  const savedData = track?.id && (await client.containsMySavedTracks([track?.id]))

  const result = {
    ...track,
    is_saved: !!(savedData && savedData.body[0])
  }

  return result as ITrack
}

export default fetchTrackInfo
