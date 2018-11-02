import React from 'react';
import { Link } from 'react-router';
import { Icon } from 'antd';

const shareIt = () => {
  const curPage = window.encodeURIComponent(window.location.href);
  let text = '#Rax-map# 是一个基于 Rax 封装的高德地图组件；帮助你轻松的接入地图到 React 项目中。除了必须引用的 Map 组件外，我们目前提供了最常用的 10 个地图组件，能满足大部分简单的业务场景；如果你有更复杂的需求，或者觉得默认提供的组件功能不够，你完全可以自定义一个地图组件，然后根据高德原生 API 做高德允许你做的一切事情';
  const article = document.querySelector('article');
  if (article) {
    text = '#Rax-map# ' + article.innerText.slice(0, 140);
  }
  const url = `http://service.weibo.com/share/share.php?url=${curPage}&appkey=3975764953&language=zh_cn&title=${window.encodeURIComponent(text)}&source=thisissourcetest&sourceUrl=https://elemefe.github.io/rax-map/&ralateUid=oslh&message=&uids=&pic=https://img.alicdn.com/tfs/TB1hKleuiQnBKNjSZFmXXcApVXa-700-700.png&searchPic=true&content=`;
  window.open(url, '_blank');
};

const onSearchKeyDOwn = e => {
  const { keyCode, target } = e;
  const keyword = target.value.trim();
  if (keyCode === 13) {
    if (keyword !== '') {
      window.open(`https://www.google.com.hk/search?q=${encodeURIComponent(keyword)}+site:github.com/alibaba/rax-map&oq=$+site:github.com/ryan730/rax-map`);
    }
  }
};

export default function Header(props) {
  const route = props.route;
  let path = '';
  if (route && route.path) {
    path = route.path;
  }
  return <header id="header">
    {/*<div className="header-logo"><i className="header-icon"></i></div>*/}
    <div className="header-inner">
      <i className="header-icon"/>
      <h2>RAX-MAP</h2>
      <ul>
        {/*<li className="searchForm">*/}
          {/*<input type="text" placeholder="请输入关键词搜索（Google）" onKeyDown={onSearchKeyDOwn}/>*/}
        {/*</li>*/}
        {/*<li><Link to="/"><Icon type="home"/><span>首页</span></Link></li>*/}
        {/*<li><Link className={path.indexOf('articles') === -1 ? '' : 'current'} to="/articles/start"><Icon type="bulb"/><span>快速开始</span></Link></li>*/}
        <li><Link className={path.indexOf('components') === -1 ? '' : 'current'} to="/api/components/index"><Icon type="appstore-o"/><span>组件文档</span></Link></li>
        <li><a href="https://github.com/alibaba/rax-map" target="_blank"><Icon type="github"/><span>GitHub</span></a></li>
        <li>
          <a target="_blank" href="javascript:;" onClick={shareIt}>
            <Icon type="share-alt"/>
          </a>
        </li>
      </ul>
    </div>
  </header>;
}
