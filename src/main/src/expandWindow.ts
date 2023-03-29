import { BrowserWindow } from 'electron'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from './constants'

const expandWindow = (window: BrowserWindow): void => {
  const { height: currentHeight } = window.getContentBounds()
  if (currentHeight < WINDOW_WIDTH) {
    window.setSize(WINDOW_WIDTH, WINDOW_WIDTH, true)
  } else {
    window.setSize(WINDOW_WIDTH, WINDOW_HEIGHT, true)
  }
}

export default expandWindow
