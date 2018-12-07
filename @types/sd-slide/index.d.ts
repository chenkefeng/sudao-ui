import { ComponentClass } from 'react'

export interface ISDSlideProps  {
  id?: string,
  width?: number,
  height: number,
  slideWidth: number,
  extData?: any,
  renderSlide?: JSX.Element,
  onWillEditing?: ((extData: any) => void)
}

declare const SDSlide: ComponentClass<ISDSlideProps>

export default SDSlide
