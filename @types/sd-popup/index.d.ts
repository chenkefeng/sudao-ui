import { ComponentClass } from 'react'

export interface ISDPopupProps  {
  id?: string,
  animationMode?: 'none' | 'center' | 'top' | 'bottom' | 'left' | 'right',
  align?: 'center' | 'top' | 'bottom' | 'left' | 'right',
  locked?: boolean
}

declare const SDPopup: ComponentClass<ISDPopupProps>

export default SDPopup
