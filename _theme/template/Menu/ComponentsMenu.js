import React from 'react';
import {Menu} from 'antd';
import {Link, Router, Route, browserHistory} from 'react-router';
import {findDomNode} from 'react-dom';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const whoIsOpen = {level1: '', level2: ''};
let scope = null;

const componentOrder = [
  '地图',
  '覆盖物',
  '辅助组件'
];

const url = location.pathname;
const index = url.indexOf('/rax-map/');
const params = url.substring(index,url.length).split('/');
console.log('params==>',params)
if (params[1] === 'rax-map' && (params[2] === 'components' || params[2] === 'modules')) {
  params[3] && (whoIsOpen.level1 = params[3]);
  params[4] && (whoIsOpen.level2 = params[4]);
}
console.log('url传递的参数:', params, whoIsOpen);

const AboutPage = React.createClass({
  render() {
    return <div>
      {this.props.children}
    </div>
  }
});

/*一级菜单控制*/
function getComponentsMenuLink(meta, subItem, key) {
  const filename = meta.filename;
  const link = '/' + filename.slice(0, filename.indexOf('index.md') - 1);
  return <div>
    <div onClick={(e, a) => {
      if (whoIsOpen.level1 === key) {
        whoIsOpen.level1 = '';
      } else {
        whoIsOpen.level1 = key;
        whoIsOpen.level2 = '';
      }
      scope.setState({});

    }}>
      <Link to={link} title='展开有详细示例'>{meta.title}</Link>
    </div>
    <ul>{getComponentsMenuNodes(subItem, link)}</ul>
  </div>;
}

/*二级菜单控制*/
function getComponentsMenuNodes(data, link) {
  const arr = data.sort((it1, it2) => {
    return parseInt(it1.meta.order) > parseInt(it2.meta.order)
  })
  return arr.map((feature, index) => {
    const item = feature.meta.title;
    const key = feature.meta.order;
    const urlKey = feature.key;
    // console.log('ppppllll---->',key,item);
    const liStyle = (whoIsOpen.level2 === urlKey) ? {textIndent: '20px',background:'#108ee9'} : {textIndent: '20px'};
    const iconStyle = (whoIsOpen.level2 === urlKey) ? {color: 'white',paddingLeft:'30px'} : {color: '#108ee9','paddingLeft':'30px'};
    return (<li key={key} style={liStyle}>
      <Link to={`${link}/${urlKey}`} style={iconStyle} onClick={(e, a) => {
        whoIsOpen.level2 = urlKey;
        console.log('1,2级:', whoIsOpen)
        scope.setState({});
      }}>{item}</Link>
    </li>)
  });
}

function getComponentsMenuItem(menus) {
  return menus.sort((a, b) => (a.meta.order - b.meta.order)).map((item) => {
    const menuStyle = (whoIsOpen.level1 === item.key) ? {height: 'auto'} : null;//sub 栏目展开
    const menuArrowStyle = (whoIsOpen.level1 === item.key) ? 'customMeuns down' : 'customMeuns up';//sub 栏目展开
    return <Menu.Item id='item' key={item.key} style={menuStyle} className={menuArrowStyle}>
      {getComponentsMenuLink(item.meta, item.subMenus, item.key)}
    </Menu.Item>;
  });
}

function getComponentsMenuGroups(data) {
  const menuGroups = componentOrder.map(category => ({
    category: category,
    menus: []
  }));
  for (let key in data) {
    if (key !== 'index') {
      const curCategory = data[key].index.meta.category;
      const idx = componentOrder.indexOf(curCategory);
      if (idx !== -1) {
        const menuData = data[key].index;
        menuData.key = key;
        menuData.subMenus = Object.keys(data[key].demo).map((it) => {
          return Object.assign(data[key].demo[it], {key: it})
        });
        menuGroups[idx].menus.push(menuData);
      }
    }
  }
  return menuGroups.map((item) => {
    return (<MenuItemGroup key={item.category} title={item.category}>
      {getComponentsMenuItem(item.menus)}
    </MenuItemGroup>);
  });
}

export default function ComponentsMenu(props) {
  const {data, defaultSelectedKey} = props;
  console.log('ComponentsMenu:::',props);
  scope = props.scope;
  return (<Menu
      mode={props.mode}
      defaultOpenKeys={['components']}
      selectedKeys={[defaultSelectedKey]}
  >
    <Menu.Item key="index">
      <Link to="/rax-map/components/index">基本介绍</Link>
    </Menu.Item>
    <SubMenu key={'components'} title={'组件'}>
      {getComponentsMenuGroups(data)}
    </SubMenu>
  </Menu>);
}
