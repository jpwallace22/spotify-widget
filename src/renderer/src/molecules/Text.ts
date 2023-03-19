import { styled } from 'solid-styled-components'
import * as CSS from 'csstype'
import { colors, sizes } from '@renderer/atoms/atoms'

interface IText extends CSS.Properties {
  size?: keyof typeof sizes
  color?: keyof typeof colors
}

const Text = styled.div<IText>`
  ${({ size, color }): string => `
  font-size: ${sizes[size || 'sm']};
  color: ${colors[color || 'white']};
  `}
`
export default Text
