import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.less'

type ISDLoadingProps = {
  loading: boolean,
  hasMore: boolean,
  hasData: boolean,
  hideLoading: boolean
}

export default class SDLoading extends Component<ISDLoadingProps, {}> {

  static defaultProps = {
    loading: false,
    hasMore: true,
    hasData: true,
    hideLoading: false
  }

  render () {
    const { loading, hasData, hasMore, hideLoading } = this.props


    return (
      <View className='container'>
        <View className='loading-container' hidden={!(hasMore || loading) || hideLoading}>
          <View className='weui-loading'></View>
          <View>正在加载中...</View>
        </View>
        <View className='nomore-container' hidden={hasMore}></View>
        <View className='nodata-container' hidden={hasData}>
          { this.props.children }
        </View>
      </View>
    )
  }
}

