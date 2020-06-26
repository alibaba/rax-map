---
title: 地图loading
order: 5
---

Map 组件现在还支持配置 loading 属性，在地图加载完成之前渲染。
> loading 是一个对象,有两个关键属性。
- `time`:loading动画持续时间,默认为0。
- `render`:loading 的DOM 渲染成RaxNode,默认为null。
- 可以自由的在 `render` 里插入入场动画。

> [在线示例]演示内容:

> 1.通过绑定map属性loading,加入loading动画,或者入场动画;

```jsx
import {createElement, PureComponent, render} from 'rax';
import DriverUniversal from "driver-universal";
import View from 'rax-view';
import Text from 'rax-text';
import {Map} from 'rax-map';

const loadingStyle = {
  position: 'relative',
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize:10,
  fontWeight:'blod',
  color:'red'
}

let cdId = 0;

class Loading extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        countDown:5
    }
    cdId = setInterval(()=>{
        let count = this.state.countDown;
        count -=1;
        this.setState({
            countDown:count
        });
        if(count<=0) {
           clearInterval(cdId);
        }
    },1000)
  }

  render() {
    return (<View style={loadingStyle}>
        <Text style={{fontSize:8}}>脑补大片级的入场特效...</Text>
        <Text style={{fontSize:8}}>Loading Map 倒计时:{this.state.countDown}</Text>
        </View>);
  }
}

class App extends PureComponent{

  render(){
    console.log('ok===>')
    return <View style={{width: '100%', height: '100%'}}>
      <Map loading={{time:5000,render:()=>{
        return (<Loading></Loading>)
      }}}/>
    </View>
  }
}

render(<App />,mountNode,{ driver: DriverUniversal });  //实际开发中, mountNode不用传，这里是为了放入示例dom中;


```
