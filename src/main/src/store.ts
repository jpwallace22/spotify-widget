import Store from 'electron-store'

const schema = {
  launchAtStart: {
    type: 'boolean',
    default: true
  }
} as const

const store = new Store({ schema })

export default store
