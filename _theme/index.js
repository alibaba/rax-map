'use strict';

module.exports = {
  lazyLoad: false,
  home: '/',
  routes: [{
    path: '/',
    //component: './template/Redirect'
    component: './template/Cover'
  }, {
    path: '/api/components/:doc',
    component: './template/Components',
    // indexRoute: { component: './template/Articles' },
    childRoutes: [{
      path: ':children',
      component: './template/ComponentNodes',
    }]
  }, {
    path: '/api/modules/:doc',// 这里的 doc 对应的是 rax-map/modules 库里的doc
    component: './template/Components',
    childRoutes: [{
      path: ':children',// 这里的 children 对应的是 rax-map/modules/demo 库里的doc
      component: './template/ComponentNodes',
    }]
  },{
    path: '/articles/:doc',
    component: './template/Articles'
  }, {
    path: '/404',
    component: './template/NotFound'
  },//{
    // path: '/googleSiteVerification',
    // component: './template/googleSiteVerification'
    //}
  ]
};
