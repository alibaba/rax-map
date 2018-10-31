---
title: 聚合的使用(样式)
order: 6
---

在启用标记点聚合插件后。

如果对默认样式，作修改，可以通过 `renderCluser` 一个回调函数,设置聚合点的样式。

不同于 `render` 函数，只能在初始化阶段起作用。如果要更新,必须触发 markers 属性变化,才能改变已存在的 marker 的样式。


可以通过下面这个例子查看效果。

+ `useCluster` 是动态属性,可以随时,启用或者关闭聚合功能。

+ `renderCluser` 绑定的回调函数可以渲染，任何自定义样式。

+ `放大`地图 或者`点击`聚合点 ，查看聚合点是怎么展开的。

+ 通过勾选下面的check按钮，控制聚合功能的启用, 刷新markers点样式(必须触发 markers 属性变化)。



```jsx
import {Map,Markers} from 'rax-map';
import View from 'rax-view';
import {PureComponent, render} from 'rax';

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
      change:false
    }
  }

  toggleCluster(e){
    this.setState({isUseCluster:e.target.checked});
  }

  changeMarkers(e){
     this.markers = randomMarker(1000); // 触发 Markers 的 state 状态改变
     this.setState({change:e.target.checked});
  }

  // 自定义聚合点样式
  renderCluser(context){
    //if(context.count>10){
    if(this.state.change){
        return <View style={style1}>{`区域内共计有(${context.count})个子节点`}</View>
    }else {
        return <View style={style2}>{`区域内共计有(${context.count})个子节点`}</View>
    }

  }

  getMarkersView(){
    return (<Markers
        markers={this.markers}
        useCluster={this.state.isUseCluster}
        renderCluser={this.renderCluser.bind(this)}
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
      <label><input name="change" type="checkbox" value=""  onClick={ (e) => { this.changeMarkers(e) } }/> changeMarkers </label>
    </View>
  }
}

// 黄底样式
const style1 = {
  padding: '8px',
  backgroundColor: 'orange',
  color: '#fff',
  border: '1px solid #fff',
  padding:'0 10px',
  textAlign:'center',
  justifyContent: 'center',
  borderRadius: '80px',
  width: '80px',
  height: '80px'
};

// 红底样式
const style2 = {
    padding: '8px',
    backgroundColor: 'red',
    color: '#fff',
    border: '1px solid #fff',
    padding:'0 10px',
    textAlign:'center',
    justifyContent: 'center',
    borderRadius: '80px',
    width: '80px',
    height: '80px'
};

render(
  <App/>, mountNode
)
```

