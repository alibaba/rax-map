import {toLnglat, toPixel, toSize} from './common';

/**
 * Created with WebStorm.
 * User: 一晟
 * Date: 2018/11/13
 * Time: 下午7:02
 * email: zhu.yan@alibaba-inc.com
 * To change this template use File | Settings | File Templates.
 */
export const isFun = (arg) => {
  return !!arg && (typeof arg === 'function');
};

export const toCapitalString = (str) => {
  return str[0].toUpperCase() + str.slice(1, str.length);
};

export default {
  isFun,
  toCapitalString
};
