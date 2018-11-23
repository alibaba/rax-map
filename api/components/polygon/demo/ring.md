---
title: 环多边形示例
order: 2
---


```jsx
import {createElement, PureComponent, render} from 'rax';
import {Map,Markers,Polygon} from 'rax-map';
import View from 'rax-view';

class App extends PureComponent{
  constructor(){
    super();
    const outPath = [
      [100, 40],
      [123, 40],
      [123, 28],
      [100, 28]
    ]
    const innerRing1 = [
      [101, 39],
      [111, 39],
      [111, 29],
      [101, 29]
    ]
    const innerRing2 = [
      [112, 39],
      [122, 39],
      [122, 29],
      [112, 29]
    ]

    // 环多边形1
    this.path1 = [
      outPath,
      innerRing1,
      innerRing2
    ]

    // 环多边形2
    this.path2 = [
      [
        {longitude: 110, latitude: 30},
        {longitude: 115, latitude: 30},
        {longitude: 120, latitude: 20},
        {longitude: 110, latitude: 20},

      ],[
        {longitude: 113, latitude: 28},
        {longitude: 118, latitude: 22},
        {longitude: 112, latitude: 22}
      ]
    ]

    this.mapCenter = [112, 34]
  }

  render(){
    return <View style={{width: '100%', height: '100%'}}>
      <Map zoom={4} center={this.mapCenter}>
        <Polygon path={this.path1} />
        <Polygon path={this.path2} />
      </Map>
    </View>
  }
}

render(
  <App/>, mountNode
); // 实际开发中, mountNode不用传，这里是为了放入示例dom中;
```
