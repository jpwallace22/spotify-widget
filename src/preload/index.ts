import { contextBridge, ipcRenderer } from 'electron'

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('spotifyApi', {
      getCurrentTrack: (callback) => ipcRenderer.on('spotify:send-track', callback),
      updateSavedTrack: () => ipcRenderer.invoke('spotify:update-saved'),
      nextTrack: () => ipcRenderer.invoke('spotify:next-track'),
      prevTrack: () => ipcRenderer.invoke('spotify:prev-track'),
      togglePlay: () => ipcRenderer.invoke('spotify:toggle-play')
    })
    contextBridge.exposeInMainWorld('playlistApi', {})
    contextBridge.exposeInMainWorld('electronApi', {
      getMessage: (callback) => ipcRenderer.on('electron:send-message', callback),
      expandWindow: () => ipcRenderer.invoke('electron:expand-window'),
      openPlaylist: () => ipcRenderer.invoke('electron:open-playlist')
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
