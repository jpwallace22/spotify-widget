import parseSizes from '@renderer/utils/parseSizes'
import { styled, keyframes } from 'solid-styled-components'

interface Styles {
  width: number | string
  height: number | string
}

const lightPassing = keyframes`
    0% {
      left: -100%;
    }
    90% {
      left: 140%;
    }
    100% {
      left: 140%;
    }
`

export const StyledDiv = styled.div<Styles>`
  width: ${(props): string => parseSizes(props.width)};
  height: ${(props): string => parseSizes(props.height)};
  border-radius: 4px;
  background-color: var(--gray);
  position: relative;
  contain: paint;

  &::before {
    content: '';
    transform: skew(-30deg);
    position: absolute;
    top: 0;
    filter: blur(10px);
    left: -50%;
    width: 70%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    animation: ${lightPassing} 1.7s ease-in-out infinite;
  }
`
