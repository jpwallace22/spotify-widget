import SpotifyWebApi from 'spotify-web-api-node'
import store from '../store'

type MenuTemplateItem = Record<string, string | (() => void)>

const createPlaylistTemplate = async (client: SpotifyWebApi): Promise<MenuTemplateItem[]> => {
  const template: Record<string, string | (() => void)>[] = []
  const res = await client.getUserPlaylists()

  if (res.statusCode === 200) {
    const handleClick = async (playlistId: string, currentUri: string): Promise<void> => {
      const res = await client.getPlaylistTracks(playlistId)
      const listTracks = res.body.items
      const isInPlaylist = listTracks.some((item) => item.track?.uri === currentUri)
      // TODO: Create alert window to handle response
      !isInPlaylist && client.addTracksToPlaylist(playlistId, [currentUri])
    }

    const allPlaylists = res.body.items
    const currentTrackUri = store.get('track.uri') as string
    store.set('playlists', allPlaylists)
    allPlaylists.forEach((playlist) =>
      template.push({
        type: 'normal',
        id: playlist.id,
        label: playlist.name,
        click: () => handleClick(playlist.id, currentTrackUri)
      })
    )
  }

  return template
}

export default createPlaylistTemplate
