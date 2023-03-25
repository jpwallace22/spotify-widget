import { styled } from 'solid-styled-components'
import * as CSS from 'csstype'
import { colors, sizes } from '@renderer/atoms/atoms'
import { lineClamp } from '@renderer/utils/cssUtils'

interface IText extends CSS.Properties {
  size?: keyof typeof sizes
  color?: keyof typeof colors
  clamp?: number
}

const Text = styled.div<IText>`
  ${({ size, color }): string => `
  display: block;
  font-size: ${sizes[size || 'sm']};
  color: ${colors[color || 'white']};
  `}
  ${({ clamp }): string | undefined => lineClamp(clamp)}
`
export default Text
