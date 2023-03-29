import { app, BrowserWindow, nativeImage, ipcMain, Menu } from 'electron'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import path, { join } from 'path'
import spotifyClient from './src/spotify/spotifyClient'
import authFlow, { refreshToken } from './src/spotify/authFlow'
import createCustomTray from './src/createCustomTray'
import loadRender from './src/loadRender'
import fetchTrackInfo from './src/spotify/fetchTrackInfo'
import updateSavedTrack from './src/spotify/updateSavedTrack'
import pausePlay from './src/spotify/pausePlay'
import createPlaylistTemplate from './src/spotify/createPlaylistTemplate'

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
  app.dock.hide()

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
    width: 330,
    height: 112,
    useContentSize: true,
    autoHideMenuBar: true,
    backgroundColor: '#1d1d1d',
    resizable: is.dev,
    hasShadow: true,
    alwaysOnTop: true,
    frame: false,
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

  // const playlistMenu = Menu.buildFromTemplate(template)

  // Catch auth callback and set access token
  app.on('open-url', (_, redirect) => {
    const url = new URL(redirect)
    const authCode = url.searchParams.get('code')

    if (authCode) {
      spotifyApi.authorizationCodeGrant(authCode).then(
        ({ body: { access_token, refresh_token } }) => {
          spotifyApi.setCredentials({
            accessToken: access_token,
            refreshToken: refresh_token
          })
          authWindow?.close()
        },
        (err) => console.error('Error when retrieving access token', err)
      )
    }
  })

  setInterval(() => refreshToken(spotifyApi), 1000 * 60 * 45)

  let playlistMenu: Electron.Menu

  // load track on icon hover
  mainTray.on('mouse-enter', async () => {
    const track = await fetchTrackInfo(spotifyApi, authWindow)
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

  ipcMain.handle('playlist:open', async () => {
    playlistMenu.popup()
  })

  mainWindow.on('blur', () => !is.dev && mainWindow.hide())
})
