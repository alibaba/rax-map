import React from 'react';

export default function Redirect() {
  console.log('首页重定向!')
  location.href = `${location.protocol}//${location.host}/rax-map/components/index`;
}
