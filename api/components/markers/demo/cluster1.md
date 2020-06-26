---
title: 聚合的使用(默认)
order: 5
---

在上一个例子中，需要在地图添加大量标记点，显示起来非常拥挤。

高德提供了一个叫做 [AMap.MarkerClusterer](http://lbs.amap.com/api/javascript-api/reference/plugin#AMap.MarkerClusterer) 的聚合坐标点插件；

在`Rax-amap` 组件中，你可以切换`useCluster`的值来选择是否启用这个插件。

可以通过下面这个例子查看效果。

+ `useCluster` 是动态属性,可以随时,启用或者关闭聚合功能。

+ 默认状态下的聚合效果,如果需要改变聚合样式,请参考 [聚合的使用(样式)](/rax-map/components/markers/cluster2)。

`放大`地图 或者`点击`聚合点 ，查看聚合点是怎么展开的。



```jsx
import {createElement, PureComponent, render} from 'rax';
import DriverUniversal from "driver-universal";
import {Map,Markers} from 'rax-map';
import View from 'rax-view';

const alphabet = 'ABCDEFGHIJKLMNOP'.split('');

const randomMarker = (len) => (
  Array(len).fill(true).map((e, idx) => ({
    position: {
      longitude: 100 + Math.random() * 30,
      latitude: 30 + Math.random() * 20,
    },
    myLabel: alphabet[idx%alphabet.length],
    myIndex: idx + 1,
  }))
);

class App extends PureComponent {
  constructor(){
    super();
    this.markers = randomMarker(1000);
    this.center = {longitude: 115, latitude: 40};
    this.state = {
      isUseCluster:true,
      isRender:false,
      isRenderCluser:false
    }
  }

  toggleCluster(e){
    const state = Object.assign({},this.state);
    state[e.target.name] = e.target.checked;
    this.setState(state);
  }

  renderCluserMarker = (context, scope) => {
      const dom = document.createElement('div');
      dom.innerHTML = '123123'
      context.marker.setContent(dom);
    }

  getMarkersView(){
    return (<Markers
        markers={this.markers}
        useCluster={this.state.isUseCluster}
      />)
  }


  render(){
    return <View style={{width: '100%', height: '100%'}}>
      <View style={{width: '100%', height: '100%'}}>
        <Map plugins={['ToolBar']} center={this.center} zoom={5}>
          {this.getMarkersView()}
        </Map>
      </View>
      <label><input name="isUseCluster" type="checkbox" value="" checked onClick={ (e) => { this.toggleCluster(e) } }/> isUseCluster </label>
    </View>
  }
}

const style = {
  padding: '8px',
  backgroundColor: '#000',
  color: '#fff',
  border: '1px solid #fff',
  padding:'0 10px',
  textAlign:'center',
  whiteSpace:'nowrap'
};

render(<App />,mountNode,{ driver: DriverUniversal }); // 实际开发中, mountNode不用传，这里是为了放入示例dom中;
```

