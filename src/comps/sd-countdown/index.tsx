import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.less'

type ISDCountDownProps = {
  duration: number,      // 持续时长, 单位秒
  title: string,        // 展示的内容
  refresh?: number,      // 多久回调一次 默认 1 （1s）
  onEnd?: (()=>void)     // 倒计时结束时回调
  onRender?:((current: number) => void), // 每次回调执行
  onTaped?: (() => void),  // 点击处理
}

type ISDCountDownState = {
  currentDuration: number
}

export default class SDCountDown extends Component<ISDCountDownProps, ISDCountDownState> {

  static externalClasses = ['sd-class']

  static defaultProps = {
    refresh: 1
  }

  constructor () {
    super(...arguments)
    this.currentDuration = this.props.duration
  }

  loading: boolean = false

  timer: any = undefined

  currentDuration: number = 0

  render () {
    const {title} = this.props

    return (
      <View className='container sd-class' onClick={this.onBtnTaped}>
        {title}
      </View>
    )
  }

  onBtnTaped = () => {
    if (this.loading) { return }
    this.loading = true
    const { duration, refresh = 1} = this.props
    this.currentDuration = duration
    this.stopTimer()

    this.props.onTaped && this.props.onTaped()

    if (duration <= 0) {
      this.loading = false
      this.props.onEnd && this.props.onEnd()
      return
    }
    this.props.onRender && this.props.onRender(duration)

    this.timer = setInterval(() => {
      console.log(this.currentDuration)
      let currentDuration = this.currentDuration
      currentDuration -= 1
      if (currentDuration <= 0) {
        this.stopTimer()
        this.loading = false
        this.props.onEnd && this.props.onEnd()
        return
      }
      this.currentDuration = currentDuration

      this.props.onRender && this.props.onRender(currentDuration)
    }, refresh * 1000)

  }

  componentWillUnmount () {
    this.stopTimer()
  }

  stopTimer = () => {
    if (this.timer !== undefined) { clearInterval(this.timer) }
  }
}
