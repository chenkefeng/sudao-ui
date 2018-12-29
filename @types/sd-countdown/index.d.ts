import { ComponentClass } from 'react'

export interface ISDCountDownProps {
  duration: number,      // 持续时长
  title: string,        // 展示的内容
  refresh?: number,      // 多久回调一次 默认 1000 （1s）
  onEnd?: (()=>void)     // 倒计时结束时回调
  onRender?:((current: number) => void), // 每次回调执行
  onTaped?: (() => void),  // 点击处理
}

declare const SDCountDown: ComponentClass<ISDCountDownProps>

export default SDCountDown
