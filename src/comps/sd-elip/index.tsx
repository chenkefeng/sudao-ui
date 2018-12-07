import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.less'

type ISDTextProps = {
  line: number
}

type ISDTextState = {
  dynamicClass: string
}

export default class SDText extends Component<ISDTextProps, ISDTextState> {

  static defaultProps = {
    line: 1
  }

  static externalClasses = ['sd-class']

  constructor () {
    super()
    this.state = {
      dynamicClass: 'elip-single_line'
    }
  }

  componentWillReceiveProps (nextProps) {
    let { line = 1 } = nextProps
    this.setState({
      dynamicClass: line > 1 ? 'elip-multi_line' : 'elip-single_line'
    })
  }

  render () {
    const { dynamicClass } = this.state
    const { line } = this.props
    return (
      <View className={`sd-class ${dynamicClass}`} style={line > 1 ? `-webkit-line-clamp:${line};` : ''}>
        { this.props.children }
      </View>
    )
  }
}
