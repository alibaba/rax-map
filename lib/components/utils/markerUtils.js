'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderMarkerComponent = exports.getPropValue = exports.MarkerAllProps = exports.MarkerConfigurableProps = undefined;

var _common = require('./common');

var _rax = require('rax');

var _raxView = require('rax-view');

var _raxView2 = _interopRequireDefault(_raxView);

var _tool = require('./tool');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MarkerConfigurableProps = exports.MarkerConfigurableProps = ['position', 'offset', 'icon', 'content', 'draggable', 'visible', 'zIndex', 'angle', 'animation', 'shadow', 'title', 'clickable', 'extData', 'label'];
// import React from 'react';
// import { render } from 'react-dom';

var MarkerAllProps = exports.MarkerAllProps = MarkerConfigurableProps.concat(['topWhenClick', 'bubble', 'raiseOnDrag', 'cursor', 'autoRotation', 'shape']);

var getPropValue = exports.getPropValue = function getPropValue(key, value) {
  if (MarkerAllProps.indexOf(key) === -1) {
    return null;
  }
  if (key === 'position') {
    return (0, _common.toLnglat)(value);
  } else if (key === 'offset') {
    return (0, _common.toPixel)(value);
  }
  return value;
};

var renderMarkerComponent = exports.renderMarkerComponent = function renderMarkerComponent(component, marker) {
  var child = component;
  if ((0, _tool.isFun)(component)) {
    var extData = marker.getExtData();
    child = component(extData);
  }
  if (child) {
    (0, _rax.render)((0, _rax.createElement)(
      _raxView2.default,
      null,
      child
    ), marker.getContent());
  }
};