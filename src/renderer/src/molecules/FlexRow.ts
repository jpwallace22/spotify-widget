import { styled } from 'solid-styled-components'

const FlexRow = styled.div<{ gap?: string; css?: string }>`
  display: flex;
  align-items: center;
  gap: ${(props): string | undefined => props.gap};
  ${(props): string | undefined => props.css}
`

export default FlexRow
