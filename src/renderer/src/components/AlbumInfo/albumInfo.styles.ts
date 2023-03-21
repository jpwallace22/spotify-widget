import { styled } from 'solid-styled-components'
import Heart from '../../assets/svg/heart.svg?component-solid'

export const AlbumWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const AlbumArt = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 16px;
  border-radius: 8px;
`

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-items: center;
`

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const StyledHeart = styled(Heart)`
  stroke: var(--light-gray);
  fill: transparent;
  width: 18px;
  cursor: pointer;
  :hover {
    stroke: var(--white);
  }
  &.saved {
    stroke: var(--primary-green);
    fill: var(--primary-green);
    :hover {
      stroke: var(--primary-green);
    }
  }
`
