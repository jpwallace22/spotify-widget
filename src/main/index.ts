import { app, BrowserWindow, ipcMain } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import path from 'path'
import spotifyClient from './src/spotifyClient'
import authFlow from './src/authFlow'
import startApp from './src/startApp'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'

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

// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  const authWindow: BrowserWindow | null = new BrowserWindow({
    resizable: true,
    useContentSize: true,
    show: false
  })

  const mainWindow = new BrowserWindow({
    show: false,
    autoHideMenuBar: true,
    transparent: true,
    resizable: false,
    hasShadow: false,
    useContentSize: true,
    alwaysOnTop: true,
    frame: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  const spotifyApi = spotifyClient()
  authFlow(authWindow)

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
          startApp(mainWindow)
        },
        (err) => console.log('Error when retrieving access token', err)
      )
    }
  })

  ipcMain.handle('spotify:getClient', () => ({
    accessToken: spotifyApi.getAccessToken(),
    refreshToken: spotifyApi.getRefreshToken()
  }))

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) startApp(mainWindow)
  })
})

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
