import { BrowserWindow } from 'electron'

interface IMessage {
  message: string
  status?: 'error' | 'success'
}

const sendMessage = (window: BrowserWindow, { message, status = 'success' }: IMessage): void => {
  window.webContents.send('electron:send-message', { message, status })
}

export default sendMessage
