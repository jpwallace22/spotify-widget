import { StyledDiv } from '@renderer/components/Skeleton/skeleton.styles'
import { Component, JSXElement } from 'solid-js'

export interface ISkeleton {
  width: number | string
  height: number | string
  loading: boolean
  children: JSXElement
}

const Skeleton: Component<ISkeleton> = (props) => (
  <>{props.loading ? <StyledDiv width={props.width} height={props.height} /> : props.children}</>
)

export default Skeleton
