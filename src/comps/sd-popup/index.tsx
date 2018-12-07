import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.less'

type ISDPopupProps = {
  id?: string,
  animationMode: 'none' | 'center' | 'top' | 'bottom' | 'left' | 'right',
  align: 'center' | 'top' | 'bottom' | 'left' | 'right',
  locked: boolean
}

type ISDPopupStates = {
  status: 'hide' | 'show' | 'fadeOut' | 'fadeIn',
  maskStatus: 'hide' | 'show'
}

export default class SDPopup extends Component<ISDPopupProps, ISDPopupStates> {

  static defaultProps = {
    animationMode: 'bottom',
    align: 'bottom',
    locked: false
  }

  constructor () {
    super()
    this.state = {
      status: 'hide',
      maskStatus: 'hide'
    }
  }

  timer?: any = undefined

  render () {
    const { status, maskStatus } = this.state
    const { animationMode, align } = this.props

    return (
      maskStatus == 'show' ? <View className='container'>
        <View className='masker-layer' onTouchMove={this.handleMaskLayerTouchMove} onClick={this.handleMaskLayerTaped}></View>
        <View className={`popup popup__status--${status} popup__content-align--${align} popup__status--${status}--animotion-${animationMode}`} onTouchMove={this.handleMaskLayerTouchMove} onClick={this.handleMaskLayerTaped}>
          <View style='width:100%;' onClick={this.stopTouchEvent}>{this.props.children}</View>
        </View>
      </View> : null
    )
  }

  handleMaskLayerTouchMove = (e) => {
    e.stopPropagation()
  }

  handleMaskLayerTaped = e => {
    e.stopPropagation()
    const { locked } = this.props
    if (locked) { return }
    this.dismiss()
  }

  stopTouchEvent = e => {
    e.stopPropagation()
  }

  show = () => {
    const { animationMode } = this.props
    if (animationMode !== 'none') {
      this.setState({
        status: 'fadeIn',
        maskStatus: 'show',
      }, () => {
        this.setState({
          status: 'show'
        })
      })
    } else {
      this.setState({
        status: 'show',
        maskStatus: 'show',
      })
    }
  }

  dismiss = () => {
    const { animationMode } = this.props
    if (animationMode !== 'none') {
      this.setState({
        status: 'fadeOut'
      }, () => {
        clearInterval(this.timer)
        this.timer = setTimeout(() => {
          this.setState({
            status: 'hide',
            maskStatus: 'hide'
          })
        }, 300)
      })
    } else {
      this.setState({
        status: 'hide',
        maskStatus: 'hide'
      })
    }
  }
}
