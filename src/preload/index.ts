import { contextBridge, ipcRenderer } from 'electron'

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('spotifyApi', {
      getCredentials: () => ipcRenderer.invoke('spotify:getCredentials'),
      getCurrentTrack: (callback) => ipcRenderer.on('send-track', callback)
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
