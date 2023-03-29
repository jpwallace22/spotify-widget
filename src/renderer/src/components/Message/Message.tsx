import { Presence, Motion } from '@motionone/solid'
import useMessage from '@renderer/hooks/useMessage'
import Text from '@renderer/molecules/Text'
import { Component, Show } from 'solid-js'
import { styled } from 'solid-styled-components'

interface IMessage {
  text?: string
}

const MessageWrapper = styled.div`
  z-index: 10;
  padding: 8px 20px;
  border-radius: 8px;
  background-color: var(--primary-green);
  box-shadow: 3px 3px 5px 2px rgba(0, 0, 0, 0.75);
`

const Message: Component<IMessage> = (props) => {
  const [message] = useMessage()

  return (
    <Presence>
      <Show when={message() || props.text}>
        <Motion.div
          class="center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
        >
          <MessageWrapper>
            <Text size="lg" color="white">
              {message()?.message || props.text}
            </Text>
          </MessageWrapper>
        </Motion.div>
      </Show>
    </Presence>
  )
}

export default Message
