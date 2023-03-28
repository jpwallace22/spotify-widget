import { Accessor, createSignal } from 'solid-js'

const useMessage = (): [Accessor<IMessage | null>] => {
  const [message, setMessage] = createSignal<IMessage | null>(null)

  window.electronApi.getMessage((_, data) => {
    console.log(data.message)

    setMessage(data)
    setTimeout(() => setMessage(null), 750)
  })

  return [message]
}

export default useMessage
