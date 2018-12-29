import Taro, { Component } from '@tarojs/taro'
import { MovableView, MovableArea, View } from '@tarojs/components'

import './index.less'

const { windowWidth } = Taro.getSystemInfoSync()

type ISDSlideProps = {
  id?: string,
  width: number,
  height: number,
  slideWidth: number,
  extData: any,
  renderSlide?: JSX.Element,
  onWillEditing?: (extData: any) => void
}

type ISDSlideState = {
  moveX: number,
  outOfBounds: boolean
}

export default class SDSlide extends Component<ISDSlideProps, ISDSlideState> {

  static defaultProps = {
    width: 750,
    extData: '',
  }

  needHandle: boolean | undefined = undefined
  threshold: number = 0
  touchStartX: number = 0

  isInTouch: boolean = false

  componentWillReceiveProps (nextProps) {
    const { slideWidth } = nextProps
    this.threshold = (slideWidth * 0.5) * windowWidth / 750
  }

  render () {
    const { width, height, slideWidth = 0 } = this.props
    let { outOfBounds, moveX = 0 } = this.state
    this.threshold = (slideWidth * 0.5) * windowWidth / 750

    if (!this.isInTouch) {
      if (Math.abs(moveX) < Math.abs(this.threshold)) {
        moveX = 0
      } else {
        moveX = -this.threshold * 2
      }
    }
    return (
      <MovableArea className='container'
                   style={`width:${width}rpx; height: ${height}rpx;`}>
        <MovableView direction='horizontal'
                     damping={60}
                     friction={10}
                     className='cell-item'
                     outOfBounds={outOfBounds}
                     x={moveX}
                     style={`width: ${slideWidth + width}rpx; height: ${height}rpx;`}
                     onTouchEnd={this.handleTouchEnd}
                     onTouchStart={this.handleTouchStart}
                     onChange={this.handleChange}>
          <View className='cell-item__left' style={`width: ${width}rpx;`}>
            {this.props.children}
          </View>
          <View className='cell-item__right' style={`width: ${slideWidth}rpx;`}>
            {this.props.renderSlide}
          </View>
        </MovableView>
      </MovableArea>
    )
  }

  handleChange = (e) => {
    this.needHandle = true
    const { outOfBounds } = this.state
    if (!outOfBounds && e.detail.x < -this.threshold) {
      this.setState({
        outOfBounds: true,
        moveX: e.detail.x
      })
    } else if (outOfBounds && e.detail.x >= -this.threshold) {
      this.setState({
        outOfBounds: false,
        moveX: e.detail.x
      })
    }
  }

  handleTouchStart = (e) => {
    this.isInTouch = true
    this.needHandle = undefined
    this.touchStartX = e.changedTouches[0].pageX
  }

  handleTouchEnd = (e) => {
    let touchEndX = e.changedTouches[0].pageX
    let touchStartX = this.touchStartX || touchEndX
    this.isInTouch = false
    if (!this.needHandle) { return }
    let threshold = this.threshold

    if (Math.abs(touchEndX - touchStartX) < 10) {
      return
    }
    if (touchEndX > touchStartX) {
      this.endEditing()
      return
    }
    let dX = touchStartX - touchEndX
    if (dX >= threshold) {
      // 触发willditing事件
      this.props.onWillEditing && this.props.onWillEditing(this.props.extData)
      this.$scope.setData({ // 修复未知BUG， cell打开不全
        moveX: -threshold * 2
      }, () => {
        this.setState({
          moveX: -threshold * 2
        })
      });
    } else {
      this.endEditing();
    }
  }

  endEditing = () => {
    this.$scope.setData({ // 修复未知BUG， cell无法关闭
      moveX: 0
    }, () => {
      this.setState({
        moveX: 0
      })
    });
  }

  isInEditing = (): boolean => {
    return this.state.moveX < -this.threshold
  }
}
