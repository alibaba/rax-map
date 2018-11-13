/**
 * Created with WebStorm.
 * User: 一晟
 * Date: 2018/9/29
 * Time: 下午11:17
 * email: zhu.yan@alibaba-inc.com
 * To change this template use File | Settings | File Templates.
 */
 export const swiper_container = {
     margin: '0 auto',
     position: 'relative',
     overflow: 'hidden',
     listStyle: 'none',
     padding: '0',
     zIndex: 1
   },
   swiper_wrapper = {
     position: 'relative',
     width: '100%',
     height: '100%',
     zIndex: '1',
     display: '-webkit-box',
     transitionProperty: 'transform',
     boxSizing: 'content-box'
   },
   swiper_slide = {
     textAlign: 'center',
     fontSize: '18px',
     backgroundColor: 'rgba(0,0,0,0)',
     display: '-webkit-box',
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center'
   },
   img = {
     width: '100%'
   },
   swiper_pagination = {
     position: 'absolute',
     left: '50%',
     bottom: '12px',
     zIndex: 2,
     WebkitTransform: 'translate(-50%)',
     MozTransform: 'translate(-50%)',
     transform: 'translate(-50%)',
     OTransform: 'translate(-50%)',
   },
   pagination_item = {
     display: 'inline-block',
     width: '12px',
     height: '12px',
     borderRadius: '50%',
     backgroundColor: '#fff',
     marginLeft: '12px'
   },
   pagination_item_active = {
     display: 'inline-block',
     width: '12px',
     height: '12px',
     borderRadius: '50%',
     backgroundColor: '#de3031',
     marginLeft: '12px'
   };