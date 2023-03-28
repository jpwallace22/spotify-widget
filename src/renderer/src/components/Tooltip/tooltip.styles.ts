import { styled } from 'solid-styled-components'

export const TooltipWrapper = styled.div`
  position: relative;
`

export const StyledTip = styled.div`
  position: absolute;
  bottom: calc(100% + 15px);
  width: max-content;
  transform: translate(-40%, 5px);
  font-size: 14px;
  letter-spacing: 0.02em;
  padding: 12px;
  border-radius: 4px;
  color: var(--white);
  filter: drop-shadow(1px 2px 8px #0f0f0f);
  background-color: var(--dark-gray);
`
