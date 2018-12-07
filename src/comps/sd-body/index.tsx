import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.less'

type ISDBodyProps = {
  loading: boolean,
  showLine: boolean,
  showPadding: boolean,
  lineColor: string
}

export default class SDBody extends Component<ISDBodyProps, {}> {

  static defaultProps = {
    loading: false,
    showLine: true,
    showPadding: true,
    lineColor: '#e3e3e3'
  }

  static externalClasses = ['sd-class']

  render () {
    const { loading, showLine, showPadding, lineColor } = this.props
    const { statusBarHeight } = Taro.getSystemInfoSync()
    const paddingBottom = statusBarHeight == 44 ? 34 : 0

    const innerElement: JSX.Element = loading ? ( <View className='loading-container'>
        <View className='weui-loading'></View>
        <View>正在加载中...</View>
      </View>
    ) : this.props.children

    return (
      <View className='sd-class' style={showPadding && paddingBottom > 0 ? `padding-bottom: ${paddingBottom}px;` : ''}>
        { showLine ? <View className='nav-line' style={`background-color:${lineColor};`}></View> : null }
        { innerElement }
      </View>
    )
  }
}
