import { BrowserWindow, NativeImage, Tray, Menu } from 'electron'

interface ICustomTray {
  icon: NativeImage
  clickWindow: BrowserWindow
  rightClickWindow?: BrowserWindow
}

const createCustomTray = ({ icon, clickWindow, rightClickWindow }: ICustomTray): Tray => {
  const tray = new Tray(icon)
  tray.setIgnoreDoubleClickEvents(true) // required for macOS

  const getWindowPosition = (window: BrowserWindow): { x: number; y: number } => {
    const windowBounds = window.getBounds()
    const trayBounds = tray.getBounds()
    const x = Math.round(trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2)
    const y = Math.round(trayBounds.y + trayBounds.height)
    return { x, y }
  }

  const showWindow = (window: BrowserWindow): void => {
    const position = getWindowPosition(window)
    window.setPosition(position.x, position.y, false)
    window.show()
    window.setVisibleOnAllWorkspaces(true)
    window.focus()
    window.setVisibleOnAllWorkspaces(false)
  }

  const toggleWindow = (window: BrowserWindow): void => {
    if (window.isVisible()) {
      window.hide()
    } else {
      showWindow(window)
    }
  }

  const defaultRightClick = (): void => {
    const menu = [
      {
        role: 'quit',
        accelerator: 'Command+Q'
      } as const
    ]
    tray.popUpContextMenu(Menu.buildFromTemplate(menu))
  }

  tray.on('click', () => toggleWindow(clickWindow))
  tray.on('right-click', () =>
    rightClickWindow ? toggleWindow(rightClickWindow) : defaultRightClick()
  )

  return tray
}

export default createCustomTray
