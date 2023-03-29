import classNames from 'classnames'
import { Component, createSignal, JSX } from 'solid-js'
import { styled } from 'solid-styled-components'

interface IAlbumArt extends JSX.HTMLAttributes<HTMLImageElement> {
  src?: string
}

const Image = styled.img<IAlbumArt>`
  width: 80px;
  position: relative;
  cursor: pointer;
  height: 80px;
  margin-right: 16px;
  border-radius: 8px;
  transition: 0.25s linear;
  transition-property: width, height;
  &:after {
    content: 'Expand';
    display: block;
    z-index: 10;
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: red;
  }
  &.expanded {
    width: 298px;
    height: 298px;
  }
`
const ImageWrapper = styled.div<IAlbumArt>`
  position: relative;
  &:not(.expanded):after {
    content: '';
    color: white;
    font-size: 12px;
    letter-spacing: 0.04em;
    display: grid;
    place-items: center;
    z-index: 10;
    position: absolute;
    width: 80px;
    height: 0px;
    transition: 0.3s ease;
    transition-property: content, height;
    background-color: rgba(0, 0, 0, 0.6);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    top: 0;
    left: 0;
  }
  &:not(.expanded):hover:after {
    content: 'Expand';
    height: 30px;
  }
  &.expanded {
    width: 298px;
    height: 298px;
    margin-right: 16px;
  }
`

const AlbumArt: Component<IAlbumArt> = (props) => {
  const [expanded, setExpanded] = createSignal()
  const handleClick = (): void => {
    window.electronApi.expandWindow()
    setExpanded((prev) => !prev)
  }

  return (
    <ImageWrapper class={classNames({ expanded: expanded() })}>
      <Image src={props.src} onClick={handleClick} class={classNames({ expanded: expanded() })} />
    </ImageWrapper>
  )
}

export default AlbumArt
