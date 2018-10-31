import React from 'react';
import { Link } from 'react-router';

export default function Cover() {
  const elemeAdd = {
    longitude: 121.3807354258945,
    latitude: 31.231765630889992
  };
  return <div className="cover-wrapper">
    <div className="cover-map">
      {/*<Map*/}
        {/*zoom={18}*/}
        {/*features={['bg', 'road', 'building']}*/}
        {/*mapStyle={'fresh'}*/}
        {/*center={elemeAdd}*/}
      {/*/>*/}
    </div>
    <div className="cover-content">
      <div className="cover-icon">
        <img src="https://img.alicdn.com/tfs/TB1hKleuiQnBKNjSZFmXXcApVXa-700-700.png" alt=""/>
      </div>
      <h3>rax-map</h3>
      <div className="cover-link">
        {/*<a className="github" href="https://github.com/ElemeFE/react-amap" target="_blank">GitHub</a>*/}
        {/*<Link className="start" to="/articles/start ` " >Get Started</Link>*/}
        <Link className="start" to="/rax-map/components/index" >Get Started</Link>
      </div>
      <div className="slogan">

      </div>
    </div>
  </div>;
}
