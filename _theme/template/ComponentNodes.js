import React from 'react';
import Layout from './Layout';
import SideMenu from './Menu/SideMenu';
import DemoSubArticle from './Content/DemoSubArticle';
import PureArticle from './Content/PureArticle';

export default class Nodes extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.location.pathname !== nextProps.location.pathname;
  }
  render() {
    // const props = this.props;
    // let type;
    // if (props.pageData.demo) {
    //   type = 'demo';
    // }
    // console.log('type:::',type,props)
    //
    // return <Layout route={props.route}>
    //   <div id="doc">
    //     <aside id="aside">
    //       <SideMenu
    //           type="components"
    //           defaultSelectedKey={props.routeParams.doc}
    //           data={props.data}
    //       />
    //     </aside>
    //     <article id="article">
    //       {
    //         type === 'demo'
    //             ? <DemoSubArticle routeParams={props.routeParams} pageData={props.pageData} utils={props.utils}/>
    //             : <PureArticle pageData={props.pageData} utils={props.utils}/>
    //       }
    //     </article>
    //   </div>
    // </Layout>;
    return <div>5555555555555555</div>
  }
}

