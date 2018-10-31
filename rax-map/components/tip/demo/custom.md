---
title: 自定义tip
order: 2
---

Rax-map 提供两种方式定义信息窗体的内容：
+ 按照高德原生的方式通过定义 content 属性（取值是一个字符串或者一个 DOM）；
+ 不设置 content 属性，直接以 JSX 语法在 InfoWindow 标签下写子元素，即 props.children;

**如果同时设置了 content 属性且有 children，children 将被忽略**


```jsx 
import {Map,Tip} from 'rax-map';
import {PureComponent, render} from 'rax';
import View from 'rax-view';
import Touchable from 'rax-touchable'; //  导入touch 容器

class App extends PureComponent{
  constructor() {
    super();
    this.state = {
      curVisibleWindow: null,
      count: 1,
      positionA: {
        longitude: 120,
        latitude: 30
      },
      positionB: {
        longitude: 130,
        latitude: 30
      },
      positionC: {
        longitude: 120,
        latitude: 20
      },
      positionD: {
        longitude: 130,
        latitude: 20
      },
    }
  }

  showTip(id) {
    this.setState({
      curVisibleWindow: id,
    });
  }
  
  closeTip(){
    this.setState({
      curVisibleWindow: null,
    })
  }
  
  changeCount() {
    this.setState({
      count: this.state.count + 1,
    })
  }

  render(){
    const html2 = `<div><h3>通过content属性,自定义html样式的tip</h3><p>This is a window</p><p>Changing Value: ${this.state.count}</p></div>`;
    const html4 = `<div><h3>非自定义html样式的tip</h3><p>This is a window</p><p>Changing Value: ${this.state.count}</p></div>`;

    return <View style={{width: '100%', height: '100%'}}>
      <View style={{width: '100%', height: '100%'}}>
        <Map zoom={3}>
          <Tip
              position={this.state.positionA}
              visible={this.state.curVisibleWindow === 1}
              isCustom
            >
              <h3>普通tip</h3>
              <p>Changing Value: {this.state.count}</p>
              <button onClick={() => {this.closeTip()}}>Close Window</button>
            </Tip>

            <Tip
              position={this.state.positionB}
              visible={this.state.curVisibleWindow === 2}
              content={html2}
              isCustom
            />

            <Tip
              position={this.state.positionC}
              visible={this.state.curVisibleWindow === 3}
              isCustom={false}
            >
              <h3>通过内部biaoq,定义html样式的tip</h3>
              <p>Changing Value: {this.state.count}</p>
              <button onClick={() => {this.closeTip()}}>Close Window</button>
            </Tip>

            <Tip
              position={this.state.positionD}
              visible={this.state.curVisibleWindow === 4}
              content={html4}
              isCustom={false}
            />
        </Map>
      </View>
      <View style={rowStyle}>
          <Touchable style={touchStyle} onPress={this.showTip.bind(this,1)}>
              点我 : 普通tip
          </Touchable>
          <Touchable style={touchStyle} onPress={this.showTip.bind(this,2)}>
              点我 : 通过content属性,自定义html样式的tip
          </Touchable>
          <Touchable style={touchStyle} onPress={this.showTip.bind(this,3)}>
              点我 : 通过内部biaoq,定义html样式的tip
          </Touchable>
          <Touchable style={touchStyle} onPress={this.showTip.bind(this,4)}>
              点我 : 非自定义html样式的tip
          </Touchable>
          <Touchable style={touchStyle} onPress={this.changeCount.bind(this)}>
              点我 : 改变tip内的state
          </Touchable>
      </View>
    </View>
  }
}

// touch容器样式
 const touchStyle = {
      borderStyle: 'solid',
      borderColor: '#dddddd',
      borderWidth: 1,
      padding:2,
      margin:5,
      width:50,
      height:30,
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
     right:-70
 }

render(
  <App/>, mountNode
)
```