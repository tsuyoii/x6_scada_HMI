"use strict";(self.webpackChunklot_scada=self.webpackChunklot_scada||[]).push([[584],{7584:function(e,t,n){n.r(t),n.d(t,{FakeData:function(){return p}});var o=n(9439),i=n(3099),a=n(8443),l=n(2730),c=n(4835),r=n(2791),u=n(8399),s=(n(8219),n(8716),n(8418)),d=n(4988),f=n(184),p=function(e){var t=r.useState(!1),n=(0,o.Z)(t,2),p=n[0],v=n[1],h=r.useState(!1),b=(0,o.Z)(h,2),m=b[0],g=b[1],y=r.useState("/*\n* payload variable contains current payload.\n* e.g. payload.data.myValue\n*\n* You can modify the current payload variable\n* or return an object that will entirely\n* replace the payload.\n*\n* console.log() will write a message to\n* the Debug tab.\n*\n* The Buffer object is available for\n* complex parsing: https://nodejs.org/dist/latest-v6.x/docs/api/buffer.html\n*/"),j=(0,o.Z)(y,2),w=j[0],x=j[1],Z=(0,s.N)(w,2e3);r.useEffect((function(){if(e){var t,n,o=null===(t=e.cell)||void 0===t?void 0:t.toJSON();x(null===(n=o.config)||void 0===n?void 0:n.script)}}),[e.cellId]),r.useEffect((function(){var t;null===(t=e.cell)||void 0===t||t.prop("config",{script:Z})}),[e.cellId,Z]);return(0,f.jsx)(i.Z,{direction:"vertical",children:(0,f.jsxs)(a.Z,{children:[(0,f.jsx)(l.Z,{title:"Function (JavaScript)",extra:(0,f.jsx)(d.Z,{onClick:function(){v(!0)}}),style:{width:220},bodyStyle:{width:220,overflow:"auto"},children:(0,f.jsx)("pre",{children:Z})}),(0,f.jsx)(c.Z,{title:"Title",visible:p,onOk:function(){g(!0),setTimeout((function(){v(!1),g(!1)}),500)},confirmLoading:m,onCancel:function(){console.log("Clicked cancel button"),v(!1)},width:1e3,children:(0,f.jsx)(u.ZP,{mode:"javascript",theme:"tomorrow",name:"editor",onChange:function(e){x(e)},value:w,fontSize:14,style:{width:"900px"},editorProps:{$blockScrolling:!0}})})]})})}},8418:function(e,t,n){n.d(t,{N:function(){return a}});var o=n(9439),i=n(2791),a=function(e,t){var n=(0,i.useState)(e),a=(0,o.Z)(n,2),l=a[0],c=a[1];return(0,i.useEffect)((function(){var n=setTimeout((function(){c(e)}),t);return function(){return clearTimeout(n)}}),[e,t]),l}}}]);
//# sourceMappingURL=584.95043ba9.chunk.js.map