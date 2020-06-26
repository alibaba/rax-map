import React from 'react';
import ReactDOM from 'react-dom';
import DemoItem from './DemoItem';

export default class DemoSubArticle extends React.Component {
  constructor() {
    super();
    this.state = {
      isWide: true
    };
    this.changeLayout = this.changeLayout.bind(this);
  }

  componentWillMount() {
    console.log('DemoSubArticle = @componentWillMount@');
    this.changeLayout();
    ///// window.addEventListener('resize', this.changeLayout);// ryan+
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return ((this.state.isWide !== nextState.isWide) ||
  //       (this.props.routeParams.doc !== nextProps.routeParams.doc));
  // }

  changeLayout() {
    const width = document.body.clientWidth;
    const isWide = width > 800;
    console.log('DemoSubArticle = @width@',width);
    this.setState({
      isWide
    });
  }

  componentDidMount(){
    console.log('DemoSubArticle = @componentDidMount@');
    const props = this.props;
    const {pageData,childName} = props;
    const key = childName.children;
    const item =  pageData.demo[key];
    console.log('DemoSubArticle = @preview@',this.state.isWide);
   this.state.isWide ?
    (setTimeout(()=>{ // 延迟能够找到 mountNode 对象
      window.mountNode = document.querySelector('.code-preview');
      if(!window.mountNode)return;
      window.React = require('rax');
      window.ReactDOM = require('rax-view');
      window.aaa = item;
      process.env.NODE_ENV = 'production';
      item.preview(); // run md 的 code 的关键命令
      console.log('DemoSubArticle = @preview::setTimeout@');
    },500))&&console.log('delay mountNode!',item)
    : null;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.changeLayout);
  }

  render() {
    const props = this.props;
    const {pageData,childName} = props;
    const key = childName.children;
    const item =  pageData.demo[key];
    const content = props.utils.toReactComponent(['div'].concat(item.content));
  // console.log('DemoSubArticle = @preview@',this.state.isWide);
  //  this.state.isWide ?
  //   (setTimeout(()=>{ // 延迟能够找到 mountNode 对象
  //     window.mountNode = document.querySelector('.code-preview');
  //     if(!window.mountNode)return;
  //     window.React = require('rax');
  //     window.ReactDOM = require('rax-view');
  //     window.aaa = item;
  //     process.env.NODE_ENV = 'production';
  //     item.preview(); // run md 的 code 的关键命令
  //     console.log('DemoSubArticle = @preview::setTimeout@');
  //   },500))&&console.log('delay mountNode!',item)
  //   : null;

    console.log('pageData.demo::',pageData.demo);

    const demoComponent = (<DemoItem
        key={0}
        title={item.meta.title}
        content={content}
        code={props.utils.toReactComponent(item.highlightedCode)}
        isWide={this.state.isWide}
    >
      {/*{ this.state.isWide ? item.preview(React, ReactDOM) : null}*/}
    </DemoItem>);

    // const demoComponent = Object.keys(pageData.demo).map(key => pageData.demo[key])
    //     .filter(item => !item.meta.hidden)
    //     .sort((a, b) => a.meta.order - b.meta.order)
    //     .map((item, i) => {
    //       const content = props.utils.toReactComponent(['div'].concat(item.content));
    //       return (<DemoItem
    //           key={i}
    //           title={item.meta.title}
    //           content={content}
    //           code={props.utils.toReactComponent(item.highlightedCode)}
    //           isWide={this.state.isWide}
    //       >
    //         {/*{ this.state.isWide ? item.preview(React, ReactDOM) : null}*/}
    //       </DemoItem>);
    //     });


    const pageContent = pageData.index.content;
    const pageAPI = pageData.index.api;
    const title = pageData.index.meta.title;
    return <div>
      <h1>{title}</h1>
      {/*<div className="page-content">*/}
        {/*{props.utils.toReactComponent(pageContent)}*/}
      {/*</div>*/}
      <div className="demo-wrapper">
        {demoComponent}
      </div>
      {/*<div className="page-api">*/}
        {/*{props.utils.toReactComponent(pageAPI)}*/}
      {/*</div>*/}
    </div>;
  }
}
