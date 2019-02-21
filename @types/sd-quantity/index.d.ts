import { ComponentClass } from 'react'

export interface ISDQuantityProps  {
  max?: number,
  min?: number,
  value?: number | string,
  disabled?: boolean,
  extData?: any,
  onValueChange?: ((value: string, extData: any) => void),
  onBoundary?: ((value: string, type: 'minus' | 'plus', extData: any) => void),
  isLogin?: Boolean,
  onLoginTrigger?:(() => void)
}

declare const SDQuantity: ComponentClass<ISDQuantityProps>

export default SDQuantity
