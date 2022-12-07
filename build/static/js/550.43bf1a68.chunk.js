"use strict";(self.webpackChunklot_scada=self.webpackChunklot_scada||[]).push([[550],{4550:function(e,t,n){n.r(t),n.d(t,{FakeData:function(){return ie}});var r=n(9439),a=n(6818),i=n(3099),u=n(8443),c=n(9603),o=n(7462),l=n(4942),s=n(1002),d=n(7295),f=n(1413),v=n(2791),m={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"}}]},name:"up",theme:"outlined"},p=n(4291),g=function(e,t){return v.createElement(p.Z,(0,f.Z)((0,f.Z)({},e),{},{ref:t,icon:m}))};g.displayName="UpOutlined";var h=v.forwardRef(g),N=n(1694),b=n.n(N),y=n(4925),S=n(1354),E=n(1605),Z=n(8834),w=n(5671),x=n(3144);function I(){return"function"===typeof BigInt}function k(e){var t=e.trim(),n=t.startsWith("-");n&&(t=t.slice(1)),(t=t.replace(/(\.\d*[^0])0*$/,"$1").replace(/\.0*$/,"").replace(/^0+/,"")).startsWith(".")&&(t="0".concat(t));var r=t||"0",a=r.split("."),i=a[0]||"0",u=a[1]||"0";"0"===i&&"0"===u&&(n=!1);var c=n?"-":"";return{negative:n,negativeStr:c,trimStr:r,integerStr:i,decimalStr:u,fullStr:"".concat(c).concat(r)}}function C(e){var t=String(e);return!Number.isNaN(Number(t))&&t.includes("e")}function M(e){var t=String(e);if(C(e)){var n=Number(t.slice(t.indexOf("e-")+2)),r=t.match(/\.(\d+)/);return(null===r||void 0===r?void 0:r[1])&&(n+=r[1].length),n}return t.includes(".")&&T(t)?t.length-t.indexOf(".")-1:0}function R(e){var t=String(e);if(C(e)){if(e>Number.MAX_SAFE_INTEGER)return String(I()?BigInt(e).toString():Number.MAX_SAFE_INTEGER);if(e<Number.MIN_SAFE_INTEGER)return String(I()?BigInt(e).toString():Number.MIN_SAFE_INTEGER);t=e.toFixed(M(t))}return k(t).fullStr}function T(e){return"number"===typeof e?!Number.isNaN(e):!!e&&(/^\s*-?\d+(\.\d+)?\s*$/.test(e)||/^\s*-?\d+\.\s*$/.test(e)||/^\s*-?\.\d+\s*$/.test(e))}function O(e){var t="number"===typeof e?R(e):k(e).fullStr;return t.includes(".")?k(t.replace(/(\d)\.(\d)/g,"$1$2.")).fullStr:e+"0"}var D=function(){function e(t){(0,w.Z)(this,e),this.origin="",this.number=void 0,this.empty=void 0,(t||0===t)&&String(t).trim()?(this.origin=String(t),this.number=Number(t)):this.empty=!0}return(0,x.Z)(e,[{key:"negate",value:function(){return new e(-this.toNumber())}},{key:"add",value:function(t){if(this.isInvalidate())return new e(t);var n=Number(t);if(Number.isNaN(n))return this;var r=this.number+n;if(r>Number.MAX_SAFE_INTEGER)return new e(Number.MAX_SAFE_INTEGER);if(r<Number.MIN_SAFE_INTEGER)return new e(Number.MIN_SAFE_INTEGER);var a=Math.max(M(this.number),M(n));return new e(r.toFixed(a))}},{key:"isEmpty",value:function(){return this.empty}},{key:"isNaN",value:function(){return Number.isNaN(this.number)}},{key:"isInvalidate",value:function(){return this.isEmpty()||this.isNaN()}},{key:"equals",value:function(e){return this.toNumber()===(null===e||void 0===e?void 0:e.toNumber())}},{key:"lessEquals",value:function(e){return this.add(e.negate().toString()).toNumber()<=0}},{key:"toNumber",value:function(){return this.number}},{key:"toString",value:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return e?this.isInvalidate()?"":R(this.number):this.origin}}]),e}(),_=function(){function e(t){if((0,w.Z)(this,e),this.origin="",this.negative=void 0,this.integer=void 0,this.decimal=void 0,this.decimalLen=void 0,this.empty=void 0,this.nan=void 0,(t||0===t)&&String(t).trim())if(this.origin=String(t),"-"!==t){var n=t;if(C(n)&&(n=Number(n)),T(n="string"===typeof n?n:R(n))){var r=k(n);this.negative=r.negative;var a=r.trimStr.split(".");this.integer=BigInt(a[0]);var i=a[1]||"0";this.decimal=BigInt(i),this.decimalLen=i.length}else this.nan=!0}else this.nan=!0;else this.empty=!0}return(0,x.Z)(e,[{key:"getMark",value:function(){return this.negative?"-":""}},{key:"getIntegerStr",value:function(){return this.integer.toString()}},{key:"getDecimalStr",value:function(){return this.decimal.toString().padStart(this.decimalLen,"0")}},{key:"alignDecimal",value:function(e){var t="".concat(this.getMark()).concat(this.getIntegerStr()).concat(this.getDecimalStr().padEnd(e,"0"));return BigInt(t)}},{key:"negate",value:function(){var t=new e(this.toString());return t.negative=!t.negative,t}},{key:"add",value:function(t){if(this.isInvalidate())return new e(t);var n=new e(t);if(n.isInvalidate())return this;var r=Math.max(this.getDecimalStr().length,n.getDecimalStr().length),a=k((this.alignDecimal(r)+n.alignDecimal(r)).toString()),i=a.negativeStr,u=a.trimStr,c="".concat(i).concat(u.padStart(r+1,"0"));return new e("".concat(c.slice(0,-r),".").concat(c.slice(-r)))}},{key:"isEmpty",value:function(){return this.empty}},{key:"isNaN",value:function(){return this.nan}},{key:"isInvalidate",value:function(){return this.isEmpty()||this.isNaN()}},{key:"equals",value:function(e){return this.toString()===(null===e||void 0===e?void 0:e.toString())}},{key:"lessEquals",value:function(e){return this.add(e.negate().toString()).toNumber()<=0}},{key:"toNumber",value:function(){return this.isNaN()?NaN:Number(this.toString())}},{key:"toString",value:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return e?this.isInvalidate()?"":k("".concat(this.getMark()).concat(this.getIntegerStr(),".").concat(this.getDecimalStr())).fullStr:this.origin}}]),e}();function j(e){return I()?new _(e):new D(e)}function F(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];if(""===e)return"";var a=k(e),i=a.negativeStr,u=a.integerStr,c=a.decimalStr,o="".concat(t).concat(c),l="".concat(i).concat(u);if(n>=0){var s=Number(c[n]);if(s>=5&&!r){var d=j(e).add("".concat(i,"0.").concat("0".repeat(n)).concat(10-s));return F(d.toString(),t,n,r)}return 0===n?l:"".concat(l).concat(t).concat(c.padEnd(n,"0").slice(0,n))}return".0"===o?l:"".concat(l).concat(o)}var A=n(3786);function B(e){var t=e.prefixCls,n=e.upNode,r=e.downNode,a=e.upDisabled,i=e.downDisabled,u=e.onStep,c=v.useRef(),s=v.useRef();s.current=u;var d=function(e,t){e.preventDefault(),s.current(t),c.current=setTimeout((function e(){s.current(t),c.current=setTimeout(e,200)}),600)},f=function(){clearTimeout(c.current)};if(v.useEffect((function(){return f}),[]),(0,A.Z)())return null;var m="".concat(t,"-handler"),p=b()(m,"".concat(m,"-up"),(0,l.Z)({},"".concat(m,"-up-disabled"),a)),g=b()(m,"".concat(m,"-down"),(0,l.Z)({},"".concat(m,"-down-disabled"),i)),h={unselectable:"on",role:"button",onMouseUp:f,onMouseLeave:f};return v.createElement("div",{className:"".concat(m,"-wrap")},v.createElement("span",(0,o.Z)({},h,{onMouseDown:function(e){d(e,!0)},"aria-label":"Increase Value","aria-disabled":a,className:p}),n||v.createElement("span",{unselectable:"on",className:"".concat(t,"-handler-up-inner")})),v.createElement("span",(0,o.Z)({},h,{onMouseDown:function(e){d(e,!1)},"aria-label":"Decrease Value","aria-disabled":i,className:g}),r||v.createElement("span",{unselectable:"on",className:"".concat(t,"-handler-down-inner")})))}var q=n(632);var P=n(5314),G=["prefixCls","className","style","min","max","step","defaultValue","value","disabled","readOnly","upHandler","downHandler","keyboard","controls","stringMode","parser","formatter","precision","decimalSeparator","onChange","onInput","onPressEnter","onStep"],U=function(e,t){return e||t.isEmpty()?t.toString():t.toNumber()},$=function(e){var t=j(e);return t.isInvalidate()?null:t},H=v.forwardRef((function(e,t){var n,a=e.prefixCls,i=void 0===a?"rc-input-number":a,u=e.className,c=e.style,d=e.min,f=e.max,m=e.step,p=void 0===m?1:m,g=e.defaultValue,h=e.value,N=e.disabled,w=e.readOnly,x=e.upHandler,I=e.downHandler,k=e.keyboard,C=e.controls,D=void 0===C||C,_=e.stringMode,A=e.parser,H=e.formatter,L=e.precision,V=e.decimalSeparator,W=e.onChange,z=e.onInput,X=e.onPressEnter,K=e.onStep,J=(0,y.Z)(e,G),Q="".concat(i,"-input"),Y=v.useRef(null),ee=v.useState(!1),te=(0,r.Z)(ee,2),ne=te[0],re=te[1],ae=v.useRef(!1),ie=v.useRef(!1),ue=v.useRef(!1),ce=v.useState((function(){return j(null!==h&&void 0!==h?h:g)})),oe=(0,r.Z)(ce,2),le=oe[0],se=oe[1];var de=v.useCallback((function(e,t){if(!t)return L>=0?L:Math.max(M(e),M(p))}),[L,p]),fe=v.useCallback((function(e){var t=String(e);if(A)return A(t);var n=t;return V&&(n=n.replace(V,".")),n.replace(/[^\w.-]+/g,"")}),[A,V]),ve=v.useRef(""),me=v.useCallback((function(e,t){if(H)return H(e,{userTyping:t,input:String(ve.current)});var n="number"===typeof e?R(e):e;if(!t){var r=de(n,t);if(T(n)&&(V||r>=0))n=F(n,V||".",r)}return n}),[H,de,V]),pe=v.useState((function(){var e=null!==g&&void 0!==g?g:h;return le.isInvalidate()&&["string","number"].includes((0,s.Z)(e))?Number.isNaN(e)?"":e:me(le.toString(),!1)})),ge=(0,r.Z)(pe,2),he=ge[0],Ne=ge[1];function be(e,t){Ne(me(e.isInvalidate()?e.toString(!1):e.toString(!t),t))}ve.current=he;var ye=v.useMemo((function(){return $(f)}),[f,L]),Se=v.useMemo((function(){return $(d)}),[d,L]),Ee=v.useMemo((function(){return!(!ye||!le||le.isInvalidate())&&ye.lessEquals(le)}),[ye,le]),Ze=v.useMemo((function(){return!(!Se||!le||le.isInvalidate())&&le.lessEquals(Se)}),[Se,le]),we=function(e,t){var n=(0,v.useRef)(null);return[function(){try{var t=e.selectionStart,r=e.selectionEnd,a=e.value,i=a.substring(0,t),u=a.substring(r);n.current={start:t,end:r,value:a,beforeTxt:i,afterTxt:u}}catch(c){}},function(){if(e&&n.current&&t)try{var r=e.value,a=n.current,i=a.beforeTxt,u=a.afterTxt,c=a.start,o=r.length;if(r.endsWith(u))o=r.length-n.current.afterTxt.length;else if(r.startsWith(i))o=i.length;else{var l=i[c-1],s=r.indexOf(l,c-1);-1!==s&&(o=s+1)}e.setSelectionRange(o,o)}catch(d){(0,q.ZP)(!1,"Something warning of cursor restore. Please fire issue about this: ".concat(d.message))}}]}(Y.current,ne),xe=(0,r.Z)(we,2),Ie=xe[0],ke=xe[1],Ce=function(e){return ye&&!e.lessEquals(ye)?ye:Se&&!Se.lessEquals(e)?Se:null},Me=function(e){return!Ce(e)},Re=function(e,t){var n,r=e,a=Me(r)||r.isEmpty();if(r.isEmpty()||t||(r=Ce(r)||r,a=!0),!w&&!N&&a){var i=r.toString(),u=de(i,t);return u>=0&&(r=j(F(i,".",u)),Me(r)||(r=j(F(i,".",u,!0)))),r.equals(le)||(n=r,void 0===h&&se(n),null===W||void 0===W||W(r.isEmpty()?null:U(_,r)),void 0===h&&be(r,t)),r}return le},Te=function(){var e=(0,v.useRef)(0),t=function(){P.Z.cancel(e.current)};return(0,v.useEffect)((function(){return t}),[]),function(n){t(),e.current=(0,P.Z)((function(){n()}))}}(),Oe=function e(t){if(Ie(),Ne(t),!ie.current){var n=j(fe(t));n.isNaN()||Re(n,!0)}null===z||void 0===z||z(t),Te((function(){var n=t;A||(n=t.replace(/\u3002/g,".")),n!==t&&e(n)}))},De=function(e){var t;if(!(e&&Ee||!e&&Ze)){ae.current=!1;var n=j(ue.current?O(p):p);e||(n=n.negate());var r=(le||j(0)).add(n.toString()),a=Re(r,!1);null===K||void 0===K||K(U(_,a),{offset:ue.current?O(p):p,type:e?"up":"down"}),null===(t=Y.current)||void 0===t||t.focus()}},_e=function(e){var t=j(fe(he)),n=t;n=t.isNaN()?le:Re(t,e),void 0!==h?be(le,!1):n.isNaN()||be(n,!1)};return(0,E.o)((function(){le.isInvalidate()||be(le,!1)}),[L]),(0,E.o)((function(){var e=j(h);se(e);var t=j(fe(he));e.equals(t)&&ae.current&&!H||be(e,ae.current)}),[h]),(0,E.o)((function(){H&&ke()}),[he]),v.createElement("div",{className:b()(i,u,(n={},(0,l.Z)(n,"".concat(i,"-focused"),ne),(0,l.Z)(n,"".concat(i,"-disabled"),N),(0,l.Z)(n,"".concat(i,"-readonly"),w),(0,l.Z)(n,"".concat(i,"-not-a-number"),le.isNaN()),(0,l.Z)(n,"".concat(i,"-out-of-range"),!le.isInvalidate()&&!Me(le)),n)),style:c,onFocus:function(){re(!0)},onBlur:function(){_e(!1),re(!1),ae.current=!1},onKeyDown:function(e){var t=e.which,n=e.shiftKey;ae.current=!0,ue.current=!!n,t===S.Z.ENTER&&(ie.current||(ae.current=!1),_e(!1),null===X||void 0===X||X(e)),!1!==k&&!ie.current&&[S.Z.UP,S.Z.DOWN].includes(t)&&(De(S.Z.UP===t),e.preventDefault())},onKeyUp:function(){ae.current=!1,ue.current=!1},onCompositionStart:function(){ie.current=!0},onCompositionEnd:function(){ie.current=!1,Oe(Y.current.value)},onBeforeInput:function(){ae.current=!0}},D&&v.createElement(B,{prefixCls:i,upNode:x,downNode:I,upDisabled:Ee,downDisabled:Ze,onStep:De}),v.createElement("div",{className:"".concat(Q,"-wrap")},v.createElement("input",(0,o.Z)({autoComplete:"off",role:"spinbutton","aria-valuemin":d,"aria-valuemax":f,"aria-valuenow":le.isInvalidate()?null:le.toString(),step:p},J,{ref:(0,Z.sQ)(Y,t),className:Q,value:he,onChange:function(e){Oe(e.target.value)},disabled:N,readOnly:w}))))}));H.displayName="InputNumber";var L=H,V=n(1929),W=n(9125),z=n(1815),X=n(1940),K=n(11),J=n(1113),Q=n(2866),Y=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},ee=v.forwardRef((function(e,t){var n,a=v.useContext(V.E_),i=a.getPrefixCls,u=a.direction,c=v.useContext(z.Z),f=v.useState(!1),m=(0,r.Z)(f,2),p=m[0],g=m[1],N=v.useRef(null);v.useImperativeHandle(t,(function(){return N.current}));var y=e.className,S=e.size,E=e.disabled,Z=e.prefixCls,w=e.addonBefore,x=e.addonAfter,I=e.prefix,k=e.bordered,C=void 0===k||k,M=e.readOnly,R=e.status,T=e.controls,O=Y(e,["className","size","disabled","prefixCls","addonBefore","addonAfter","prefix","bordered","readOnly","status","controls"]),D=i("input-number",Z),_=(0,K.ri)(D,u),j=_.compactSize,F=_.compactItemClassnames,A=v.createElement(h,{className:"".concat(D,"-handler-up-inner")}),B=v.createElement(d.Z,{className:"".concat(D,"-handler-down-inner")}),q="boolean"===typeof T?T:void 0;"object"===(0,s.Z)(T)&&(A="undefined"===typeof T.upIcon?A:v.createElement("span",{className:"".concat(D,"-handler-up-inner")},T.upIcon),B="undefined"===typeof T.downIcon?B:v.createElement("span",{className:"".concat(D,"-handler-down-inner")},T.downIcon));var P=(0,v.useContext)(X.aM),G=P.hasFeedback,U=P.status,$=P.isFormItemInput,H=P.feedbackIcon,ee=(0,Q.F)(U,R),te=j||S||c,ne=v.useContext(W.Z),re=null!==E&&void 0!==E?E:ne,ae=b()((n={},(0,l.Z)(n,"".concat(D,"-lg"),"large"===te),(0,l.Z)(n,"".concat(D,"-sm"),"small"===te),(0,l.Z)(n,"".concat(D,"-rtl"),"rtl"===u),(0,l.Z)(n,"".concat(D,"-borderless"),!C),(0,l.Z)(n,"".concat(D,"-in-form-item"),$),n),(0,Q.Z)(D,ee),F,y),ie=v.createElement(L,(0,o.Z)({ref:N,disabled:re,className:ae,upHandler:A,downHandler:B,prefixCls:D,readOnly:M,controls:q},O));if(null!=I||G){var ue,ce=b()("".concat(D,"-affix-wrapper"),(0,Q.Z)("".concat(D,"-affix-wrapper"),ee,G),(ue={},(0,l.Z)(ue,"".concat(D,"-affix-wrapper-focused"),p),(0,l.Z)(ue,"".concat(D,"-affix-wrapper-disabled"),e.disabled),(0,l.Z)(ue,"".concat(D,"-affix-wrapper-sm"),"small"===c),(0,l.Z)(ue,"".concat(D,"-affix-wrapper-lg"),"large"===c),(0,l.Z)(ue,"".concat(D,"-affix-wrapper-rtl"),"rtl"===u),(0,l.Z)(ue,"".concat(D,"-affix-wrapper-readonly"),M),(0,l.Z)(ue,"".concat(D,"-affix-wrapper-borderless"),!C),(0,l.Z)(ue,"".concat(y),!(w||x)&&y),ue));ie=v.createElement("div",{className:ce,style:e.style,onMouseUp:function(){return N.current.focus()}},I&&v.createElement("span",{className:"".concat(D,"-prefix")},I),(0,J.Tm)(ie,{style:null,value:e.value,onFocus:function(t){var n;g(!0),null===(n=e.onFocus)||void 0===n||n.call(e,t)},onBlur:function(t){var n;g(!1),null===(n=e.onBlur)||void 0===n||n.call(e,t)}}),G&&v.createElement("span",{className:"".concat(D,"-suffix")},H))}if(null!=w||null!=x){var oe,le="".concat(D,"-group"),se="".concat(le,"-addon"),de=w?v.createElement("div",{className:se},w):null,fe=x?v.createElement("div",{className:se},x):null,ve=b()("".concat(D,"-wrapper"),le,(0,l.Z)({},"".concat(le,"-rtl"),"rtl"===u)),me=b()("".concat(D,"-group-wrapper"),(oe={},(0,l.Z)(oe,"".concat(D,"-group-wrapper-sm"),"small"===c),(0,l.Z)(oe,"".concat(D,"-group-wrapper-lg"),"large"===c),(0,l.Z)(oe,"".concat(D,"-group-wrapper-rtl"),"rtl"===u),oe),(0,Q.Z)("".concat(D,"-group-wrapper"),ee,G),y);ie=v.createElement("div",{className:me,style:e.style},v.createElement("div",{className:ve},de&&v.createElement(K.BR,null,v.createElement(X.Ux,{status:!0,override:!0},de)),(0,J.Tm)(ie,{style:null,disabled:re}),fe&&v.createElement(K.BR,null,v.createElement(X.Ux,{status:!0,override:!0},fe))))}return ie})),te=n(184),ne=a.Z.Option,re=[{key:"seconds",value:"Simple Interval"}],ae=["seconds","minutes","hour","day"],ie=function(e){var t=v.useState(re[0].value),n=(0,r.Z)(t,2),o=n[0],l=n[1],s=v.useState(ae[1]),d=(0,r.Z)(s,2),f=d[0],m=d[1],p=v.useState(1),g=(0,r.Z)(p,2),h=g[0],N=g[1],b={seconds:1,minutes:60,hour:3600,day:86400};v.useEffect((function(){if(e){var t,n,r,a=null===(t=e.cell)||void 0===t?void 0:t.toJSON();l((null===(n=a.meta)||void 0===n?void 0:n.timerTypeSelect)||re[0].key);var i=S((null===(r=a.config)||void 0===r?void 0:r.seconds)||480),u=i.timer,c=i.unitType;N(u),m(c)}}),[e.cellId]),v.useEffect((function(){var t;null===(t=e.cell)||void 0===t||t.prop("config",{seconds:y(h,f)})}),[e.cellId,h,f]);var y=function(e,t){if(e||0===e)return Number(b[t])*e},S=function(e){var t=Number(e)>=86400?"day":Number(e)>=3600?"hour":Number(e)>=60?"minutes":"seconds";return{timer:Number(e)/b[t],unitType:t}},E=(0,te.jsx)(a.Z,{defaultValue:ae[0],style:{width:100},value:f,onChange:function(e){m(e)},children:ae.map((function(e){return(0,te.jsx)(ne,{children:e},e)}))});return(0,te.jsxs)(i.Z,{direction:"vertical",children:[(0,te.jsx)(u.Z,{children:"\u65e5\u7a0b\u7c7b\u578b"}),(0,te.jsx)(u.Z,{children:(0,te.jsx)(a.Z,{defaultValue:re[0].value,value:o,onChange:function(e){l(e)},style:{width:"100%"},children:re.map((function(e){return(0,te.jsx)(ne,{children:e.value},e.key)}))})}),(0,te.jsx)(u.Z,{children:"\u95f4\u9694\u65f6\u95f4"}),(0,te.jsxs)(u.Z,{align:"middle",children:[(0,te.jsx)(c.Z,{span:2,children:"\u6bcf"}),(0,te.jsx)(c.Z,{span:19,children:(0,te.jsx)(ee,{addonAfter:E,defaultValue:1,value:h,onChange:function(e){N(e)}})}),(0,te.jsx)(c.Z,{span:3,children:"\u4e00\u6b21"})]})]})}}}]);
//# sourceMappingURL=550.43bf1a68.chunk.js.map