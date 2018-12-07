import { ComponentClass } from 'react'

export interface ISDBodyProps {
  loading?: boolean,
  showLine?: boolean,
  showPadding?: boolean,
  lineColor?: string
}

declare const SDBody: ComponentClass<ISDBodyProps>

export default SDBody
