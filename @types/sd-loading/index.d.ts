import { ComponentClass } from 'react'

export interface ISDLoadingProps {
  loading?: boolean,
  hasMore?: boolean,
  hasData?: boolean,
  hideLoading?: boolean
}

declare const SDLoading: ComponentClass<ISDLoadingProps>

export default SDLoading
