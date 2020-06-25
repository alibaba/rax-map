---
title: 基本用法
order: 1
---

本例演示了 `marker` 可以以滑动或者自动轮播的方式,切换。
- 应用场景如下:
    - 如果对大量 `marker` 用拖动地图的方式,查找会比较难以找到,准确定位
    - 如果采用滑动下面的,标签 `card` 去滑动选择，会快速定位到目标 `marker`
    - 相反,如果点击 `marker` 事件,同样也可以切换下面的标签 `card`,做到 `marker` 和 `card` 同步联动。

```jsx 
import {createElement, PureComponent, render} from 'rax';
import {Map,Markers,Polyline} from 'rax-map';
import {DetailSwiper} from 'rax-map';
import View from 'rax-view';
const Touchable = View;

// touch容器样式
 const touchStyle = {
      borderStyle: 'solid',
      borderColor: '#dddddd',
      borderWidth: 1,
      padding:2,
      margin:5,
      width:60,
      height:20,
      backgroundColor:'#FFF',
      justifyContent:'center',
      alignItems:'center',
      fontSize:5,
      textAlign: 'center',
      boxShadow: '5px 5px 5px #888888'
  }

  const rowStyle = {
    position:'absolute',
    flexDirection:'column',
    justifyContent:'space-between',
    right:-80,
    top:-20
  }

const alphabet = 'ABCDEFGHIJKLMNOP'.split('');
const randomMarker = (len) => (
  Array(len).fill(true).map((e, idx) => ({
    position: {
      longitude: 100 + Math.random() * 30,
      latitude: 30 + Math.random() * 20,
    },
    myLabel: '标的名称:'+alphabet[idx],
    myIndex: idx + 1,
  }))
);

const style = {
  padding: '8px',
  backgroundColor: '#000',
  color: '#fff',
  border: '1px solid #fff',
};

const mouseoverStyle = {
  padding: '8px',
  backgroundColor: '#fff',
  color: '#000',
  border: '1px solid #000',
}

class App extends PureComponent{
  constructor(){
    super();
    this.markers = randomMarker(10);
    this.mapCenter = {longitude: 115, latitude: 40};
    this.state = {
      useCluster: false,
    };
    this.mapEvents = {
      complete:() => {
          console.log('地图图块加载完成后触发事件!');
          this.randomMarkers();
      },
      created:() => {
        console.log('markers 加载完成后触发事件!');
      }
    }
    this.markerEvents = {
      click:(e)=>{
        console.log('markers click事件!',e,e.target.getPosition());
        const marker = e.target;
        marker.getMap().setCenter(marker.getPosition());
      }
    }
  }

  randomMarkers() {
      this.setState({
        markers: randomMarker(10)
      })
  }

  renderMarkerLayout(extData){
      return <View style={style}>{extData.myLabel}</View>
  }

  render(){
    console.log('map->render');
    return <View style={{width: '100%', height: '100%'}}>
      <View style={{width: '100%', height: '100%'}}>
        <Map plugins={['ToolBar']} center={this.mapCenter} zoom={4} events={this.mapEvents}>
          <DetailSwiper animationEndHanler={(e)=>{
             console.log('swiper结束:',e)
          }}/>
          <Markers
            events={this.markerEvents}
            markers={this.markers}
            render={this.renderMarkerLayout}
          />
        </Map>
      </View>
      <View style={rowStyle}>
        <Touchable style={touchStyle} onClick={this.randomMarkers.bind(this)}>
              点击:刷新多个 Markers
        </Touchable>
      </View>
    </View>
  }
}

render(<App/>, mountNode); //实际开发中, mountNode不用传，这里是为了放入示例dom中;
```