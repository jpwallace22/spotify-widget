import { styled } from 'solid-styled-components'

export const TooltipWrapper = styled.div`
  position: relative;
`

export const StyledTip = styled.div`
  position: absolute;
  bottom: calc(100% + 15px);
  width: fit-content;
  transform: translate(-30%, 5px);
  font-size: 14px;
  letter-spacing: 0.02em;
  padding: 8px 12px;
  border-radius: 4px;
  color: var(--white);
  filter: drop-shadow(1px 2px 8px #0f0f0f);
  background-color: var(--dark-gray);
  opacity: 0;
  visibility: hidden;
  &.active {
    visibility: visible;
    opacity: 1;
    transition: 0.2s ease-out;
    transform: translate(-30%, 0px);
    transition-property: opacity, transform;
  }
`
