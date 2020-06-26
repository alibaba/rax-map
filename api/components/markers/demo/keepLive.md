---
title: 渐进式无限加载(优化)
order: 7
---

`keepLive` 属性,是为了加载大量 markers 数据,而增加的功能,

开启后,通过每次对 `markers` 属性的前后两次结果 (hash值) 对比,

产生 交集 和 差集, 交集的 marker 即为已经存在的,不会在做请求；差集 即为 需要新生成的 marker 点。

这样做好处有两个:

- markers 不会全量重绘,减少瞬时 marker 生成产生的计算，请求和内存的负荷。

- 利用渐进式加载,只需加载当前屏幕内的点，在拖拽或者跳转时，增量加载，提过地图操作的流畅度, 比如：在 "地图找房" 项目中，要全市区拖拽，寻找已有的房源，这种场景需求下,就可以启用。

> 由于目前 `useCluster` 和 `keepLive` 会有计算冲突,所以二者是相斥关系,选择 `useCluster=true` 会替换掉 `keepLive=true` 的功能。


可以通过下面这个例子查看效果。

+ `keepLive` 开启后的,增量增加效果,可以看到已经添加到地图上的 marker 不会重绘。

+ `keepLive = false`,每次递增，所有的 marker 会重新绘制(统一刷新成一样颜色)。

+ `keepLive = true`,每次递增， marker 只绘制新增 marker (会分批次，刷新新生成的颜色)。



```jsx
import {createElement, PureComponent, render} from 'rax';
import DriverUniversal from "driver-universal";
import {Map,Markers} from 'rax-map';
import View from 'rax-view';

const alphabet = 'ABCDEFGHIJKLMNOP'.split('');

let gidx = 0 ;

class App extends PureComponent {
  constructor(){
    super();
    this.myMarkers = [];
    this.mapInstance = null;
    this.center = {longitude: 115, latitude: 40};
    this.mapEvents = {
          created: (map) => {
            console.log('----->>>:',map);
            this.mapInstance = map; // 获取到原生 map 实例
          },
          zoomstart: () => {
            // 地图缩放级别更改开始触发
          },

          moveend: () => {
            // 地图移动结束后触发，包括平移，以及中心点变化的缩放。如地图有拖拽缓动效果，则在缓动结束后触发
          },
          dragend: () => {
            // 停止拖拽地图时触发。如地图有拖拽缓动效果，则在拽停止，缓动开始前触发
            const lngLat = this.mapInstance.getCenter();
            this.addMarker(lngLat.lng,lngLat.lat);
          },

          zoomend: () => {
            // 地图缩放级别更改后触发
          },

         complete: () => {
            // 地图图块加载完成后触发事件
            const lngLat = this.mapInstance.getCenter();
            this.addMarker(lngLat.lng,lngLat.lat);
         }
      }
    this.state = {
      keepLive:true
    }
  }

  randomMarker = (len,longitude,latitude) => {
  const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
  return Array(len).fill(true).map((e, idx) => ({
      position: {
        longitude: longitude + Math.random() * 1 * plusOrMinus,
        latitude: latitude + Math.random() * 1 * plusOrMinus,
      },
      myLabel: alphabet[idx%alphabet.length],
      myIndex: gidx,
    }))
  };


  // 每次增加定量的 marker 数据
  addMarker = (longitude,latitude) => {
    gidx++;
    const newMarkers = [...this.myMarkers.concat(this.randomMarker(5,longitude,latitude))];
    this.myMarkers = newMarkers;
    this.setState({
        markers:newMarkers
    });
  };

  toggleCluster(e){
    this.setState({keepLive:e.target.checked});
  }

  renderMarker(extData){
    const label = extData.myIndex+'-'+extData.myLabel;
    markerStyle.backgroundColor = '#'+Math.floor(Math.random()*0xffffff).toString(16);
    return <View style={markerStyle}>{label}</View>
  }

  changeMarkers(e){
     this.markers = randomMarker(1000); // 触发 Markers 的 state 状态改变
     this.setState({change:e.target.checked});
  }

  getMarkersView(){
    return (<Markers
        markers={this.myMarkers}
        render={this.renderMarker}
        keepLive = {this.state.keepLive}
      />)
  }


  render(){
    return <View style={{width: '100%', height: '100%'}}>
      <View style={{width: '100%', height: '100%'}}>
        <Map events={this.mapEvents}  plugins={['ToolBar']} center={this.center} zoom={8}>
          {this.getMarkersView()}
        </Map>
      </View>
      <label><input name="keepLive" type="checkbox" value="" checked onClick={ (e) => { this.toggleCluster(e) } }/> keepLive : {String(this.state.keepLive)} </label>
    </View>
  }
}

const markerStyle = {
  padding: '8px',
  backgroundColor: '#fff',
  color: '#000',
  border: '1px solid #000',
}

render(<App />,mountNode,{ driver: DriverUniversal }); // 实际开发中, mountNode不用传，这里是为了放入示例dom中;
```

