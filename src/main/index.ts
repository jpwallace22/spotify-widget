import { app, BrowserWindow, nativeImage, ipcMain, Menu } from 'electron'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from './src/constants'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import path, { join } from 'path'

import spotifyClient from './src/spotify/spotifyClient'
import authFlow, { refreshToken } from './src/spotify/authFlow'
import fetchTrackInfo from './src/spotify/fetchTrackInfo'
import updateSavedTrack from './src/spotify/updateSavedTrack'
import createPlaylistTemplate from './src/spotify/createPlaylistTemplate'

import createCustomTray from './src/createCustomTray'
import loadRender from './src/loadRender'
import pausePlay from './src/spotify/pausePlay'
import expandWindow from './src/expandWindow'
import store from './src/store'

// Set custom protocol
if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('spotify-mini', process.execPath, [
      path.resolve(process.argv[1])
    ])
  }
} else {
  app.setAsDefaultProtocolClient('spotify-mini')
}

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // init client for Api
  const spotifyApi = spotifyClient()

  // create windows
  const authWindow: BrowserWindow | null = new BrowserWindow({
    resizable: true,
    useContentSize: true,
    show: false
  })

  const mainWindow = new BrowserWindow({
    show: false,
    title: 'Spotify Widget',
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    useContentSize: true,
    autoHideMenuBar: true,
    backgroundColor: '#282828',
    resizable: is.dev,
    hasShadow: true,
    alwaysOnTop: true,
    frame: false,
    icon: nativeImage.createFromPath(join(__dirname, '../../build/icon.png')),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js')
    }
  })

  authFlow(authWindow)
  loadRender(mainWindow, 'index')

  // Create Tray with main window
  const icon = nativeImage.createFromPath(join(__dirname, '../../resources/icon.png'))
  const mainTray = createCustomTray({
    icon,
    clickWindow: mainWindow
  })

  // Catch auth callback and set access token
  app.on('open-url', (_, redirect) => {
    const url = new URL(redirect)
    const authCode = url.searchParams.get('code')

    if (authCode) {
      spotifyApi.authorizationCodeGrant(authCode).then(
        ({ body: { access_token, refresh_token } }) => {
          const credentials = {
            accessToken: access_token,
            refreshToken: refresh_token
          }
          authWindow?.close()
          spotifyApi.setCredentials(credentials)
          store.set('credentials', credentials)
        },
        (err) => console.error('Error when retrieving access token', err)
      )
    }

    app.dock.hide()
  })

  setInterval(() => refreshToken(spotifyApi), 1000 * 60 * 45)

  // load track on icon hover
  let playlistMenu: Electron.Menu
  mainTray.on('mouse-enter', async () => {
    const track = await fetchTrackInfo(spotifyApi)
    mainWindow.webContents.send('spotify:send-track', track)
    const template = await createPlaylistTemplate(spotifyApi, mainWindow)
    playlistMenu = Menu.buildFromTemplate(template)
  })

  // handle the saving of tracks
  ipcMain.handle('spotify:update-saved', async () => {
    const updatedTrack = await updateSavedTrack(spotifyApi)
    updatedTrack && mainWindow.webContents.send('spotify:send-track', updatedTrack)
  })

  // handle Skip Track
  ipcMain.handle('spotify:next-track', async () => {
    await spotifyApi.skipToNext()
    const track = await fetchTrackInfo(spotifyApi)
    mainWindow.webContents.send('spotify:send-track', track)
  })

  // handle Prev Track
  ipcMain.handle('spotify:prev-track', async () => {
    await spotifyApi.skipToPrevious()
    const track = await fetchTrackInfo(spotifyApi)
    mainWindow.webContents.send('spotify:send-track', track)
  })

  // handle pause/play Track
  ipcMain.handle('spotify:toggle-play', async () => {
    const updatedTrack = await pausePlay(spotifyApi)
    mainWindow.webContents.send('spotify:send-track', updatedTrack)
  })

  ipcMain.handle('electron:open-playlist', async () => {
    playlistMenu.popup()
  })

  ipcMain.handle('electron:expand-window', async () => {
    expandWindow(mainWindow)
  })

  mainWindow.on('blur', () => {
    mainWindow.hide()
    // !is.dev && mainWindow.hide()
    app.dock.hide()
    refreshToken(spotifyApi)
  })
})
