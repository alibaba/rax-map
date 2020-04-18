/**
 * Created with WebStorm.
 * User: 一晟
 * Date: 2018/12/9
 * Time: 下午11:01
 * email: zhu.yan@alibaba-inc.com
 * To change this template use File | Settings | File Templates.
 */
import {createElement, Component, render} from 'rax';
import View from 'rax-view';

const style = {
  container: {
    minHeight: 750,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: 'red',
    backgroundColor: 'yellow'
  }
};

class Hi extends Component {
  render() {
    return (
      <View style={style.container}>
        <View style={style.text}>
            🚧 目前 'RAX-MAP' 不支持 'Weex native 渲染方式';
        </View>
        <View style={style.text}>
            🔌 只支持 'h5-webView方式'，请调整 URL 参数为 'wh_weex=false' 的降级模式。
        </View>
      </View>
    );
  }
}

export default {
  Map: Hi,
  Marker: Hi,
  Markers: Hi,
  Circle: Hi,
  // CircleEditor,
  Polyline: Hi,
  Polygon: Hi,
  Tip: Hi,
  // PolyEditor,
  // InfoWindow,
  // GroundImage,
  // MouseTool
  checkZoom: Hi,
  CurrentLocation: Hi,
  mapServices: Hi,
  DetailSwiper: Hi,
};