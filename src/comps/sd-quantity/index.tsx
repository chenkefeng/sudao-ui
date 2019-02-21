import Taro, { Component } from '@tarojs/taro'
import { View, Input } from '@tarojs/components'

import './index.less'

type ISDQuantityProps = {
  max: number,
  min: number,
  value: number | string,
  disabled: boolean,
  extData: any,
  onValueChange?: ((value: string, extData: any) => void),
  onBoundary?: ((value: string, type: 'minus' | 'plus', extData: any) => void),
  isLogin: Boolean,
  onLoginTrigger?:(() => void)
}

type ISDQuantityStates = {
  inputValue: string | number
}

export default class SDQuantity extends Component<ISDQuantityProps, ISDQuantityStates> {

  static defaultProps = {
    max: Number.MAX_SAFE_INTEGER,
    min: 0,
    disabled: false,
    value: '',
    extData: '',
    isLogin: true
  }

  value: number | string = ''

  componentDidMount () {
    const { value } = this.props
    this.value = value
    this.setState({
      inputValue: value
    })
  }

  componentWillReceiveProps (nextProps) {
    const { value } = nextProps
    this.value = value
    this.setState({
      inputValue: value
    })
  }

  render () {
    const { max = Number.MAX_SAFE_INTEGER, min = 0, disabled = false } = this.props
    const { inputValue = '' } = this.state
      return (
      <View className='main-content'>
        <View className='main-btn iconfont icon-minus1' onClick={this.doMinus}></View>
        <Input className='main-input' value={`${inputValue}`} disabled={min > max || disabled} onInput={this.onInputChange} onClick={this.handleInputTap} onBlur={this.onInputBlur} />
        <View className='main-btn iconfont icon-add' onClick={this.doPlus}></View>
      </View>
    )
  }

  doMinus = e => {
    e.stopPropagation()
    let value = this.value
    const { max, min, disabled, extData, isLogin } = this.props
    if (!isLogin) {
      this.props.onLoginTrigger && this.props.onLoginTrigger();
    }
    if (min > max || disabled) {
      return;
    }

    value = parseInt(`${value}`);
    value = isNaN(value) ? 0 : value
    value -= 1

    if(value < min){
      value = min
      this.setState({
        inputValue: value
      }, () => {
        this.props.onBoundary && this.props.onBoundary(`${value}`, 'minus', extData)
      })
      return
    }

    this.setState({
      inputValue: value
    }, () => {
      this.value = value
      this.props.onValueChange && this.props.onValueChange(`${value}`, extData)
    })
  }

  doPlus = e => {
    e.stopPropagation()
    let value = this.value
    const { max, min, disabled, extData, isLogin } = this.props
    if (!isLogin) {
      this.props.onLoginTrigger && this.props.onLoginTrigger();
    }
    if (min > max || disabled) {
      return;
    }
    value = parseInt(`${value}`);
    value = isNaN(value) ? min : value
    value += 1
    if (value > max) {
      value = max
      this.setState({
        inputValue: value
      }, () => {
        this.props.onBoundary && this.props.onBoundary(`${value}`, 'plus', extData)
      })
      return
    }

    this.setState({
      inputValue: value
    }, () => {
      this.value = value
      this.props.onValueChange && this.props.onValueChange(`${value}`, extData)
    })

  }

  onInputChange = e => {
    e.stopPropagation()
    const {isLogin} = this.props
    if (!isLogin) {
      this.props.onLoginTrigger && this.props.onLoginTrigger();
      return {
        value: this.state.inputValue
      }
    }
    let inputVal: any = e.detail.value || ''
    inputVal = inputVal.replace(/\s*/ig, '')
    if(inputVal.length == 0){
      this.value = ''
      return {
        value: ''
      }
    }
    if (!/^\d+$/.test(inputVal)){
      return {
        value: this.value
      }
    }
    const { min } = this.props
    inputVal = parseInt(inputVal)
    if(isNaN(inputVal)){
      inputVal = min
    }
    this.value = inputVal
    return {
      value: inputVal
    }
  }

  onInputBlur = e =>  {
    e.stopPropagation()
    let inputVal = e.detail.value
    inputVal = inputVal.replace(/\s*/ig, '')
    if(inputVal.length == 0){
      return
    }
    const { min, max, extData } = this.props
    inputVal = parseInt(inputVal)
    if(isNaN(inputVal)){
      inputVal = min
    }
    if (inputVal > max){
      inputVal = max
    }
    if(inputVal < min){
      inputVal = min
    }
    this.value = inputVal
    this.setState({
      inputValue: inputVal
    }, () => {
      this.props.onValueChange && this.props.onValueChange(`${inputVal}`, extData)
    })
  }

  handleInputTap = e => {
    e.stopPropagation()
  }
}
