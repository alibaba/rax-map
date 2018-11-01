---
category: 辅助组件
order: 1
title: marker滑动选择组件
---


## 何时使用

`marker` 可以以滑动或者自动轮播的方式切换,下面的 标签`card`

## API


### 静态属性

| 属性       |  类型 | 默认取值 | 说明     |
|-----------|-----------|-------|-----|
| render  | `Function`  | /   | 底部 card 的渲染样式,回调方法 |
| arrowRender  | `Function` | / | 箭头的渲染样式,支持参数: 'left','right' |
| loop  | `Boolean` | true | card 是否支持轮播 |
| autoPlay  | `Boolean` | true | 是否支持自动播放 |
| animationEndHanler | `Function` | / | 底部 `card` 每次滑动效果结束触发的事件 |



