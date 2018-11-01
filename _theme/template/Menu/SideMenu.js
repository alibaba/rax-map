import React from 'react';
import ComponentsMenu from './ComponentsMenu';
import ArticlesMenu from './ArticlesMenu';

export default class SideMenu extends React.Component {
  constructor() {
    super();
    this.changeMenuLayout = this.changeMenuLayout.bind(this);
    this.state = {
      mode: 'inline'
    };
  }

  changeMenuLayout() {
    const width = document.body.clientWidth;
    let mode;
    if (width < 800) {
      mode = 'horizontal';
    } else {
      mode = 'inline';
    }
    this.setState({
      mode
    });
  }
  componentWillMount() {
    this.changeMenuLayout();
    window.addEventListener('resize', this.changeMenuLayout);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.changeMenuLayout);
  }
  render() {
    const { data, defaultSelectedKey, type} = this.props;
    const modData = data['api']['modules'];
    const compData = data['api']['components'];
    const docData  = Object.assign(modData,compData); // 合并 modules 和 components 文件夹里的组件
    if (type === 'components') {
      return <ComponentsMenu mode={this.state.mode} data={docData} defaultSelectedKey={defaultSelectedKey} scope={this}/>;
    } else if (type === 'articles') {
      return <ArticlesMenu mode={this.state.mode} data={data.articles} defaultSelectedKey={defaultSelectedKey} scope={this}/>;
    }
  }
}
