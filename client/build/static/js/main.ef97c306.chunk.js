(this["webpackJsonptwi-react"]=this["webpackJsonptwi-react"]||[]).push([[0],{148:function(e,t,a){},166:function(e,t,a){},178:function(e,t,a){},207:function(e,t){},210:function(e,t,a){},212:function(e,t,a){},213:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),s=a(43),c=a.n(s),l=(a(93),a(4)),i=a(19),o=a(7),u=a.n(o),m=a(14),d=a(6),f=a(3),v=a(2),b=a(15),h=["bounceIn","bounceInLeft","bounceInRight","bounceInUp"];var p=function(){return h[function(e,t){var a=e-.5+Math.random()*(t-e+1);return Math.round(a)}(0,h.length-1)]},g=function(e){var t=document.getElementById("msgs");if(e)return setTimeout((function(e){e.scrollTo(0,e.scrollHeight-e.offsetHeight)}),e,t);t.scrollTo(0,t.scrollHeight-t.offsetHeight)},E=function(e,t){return e?t?"https://res.cloudinary.com/sketchcorp/image/upload/c_fill,h_".concat(t,",w_").concat(t,"/").concat(e):"https://res.cloudinary.com/sketchcorp/image/upload/".concat(e):"/images/load.gif"},O=function(e){switch(e){case"dev":return r.a.createElement("div",{className:"tag dev"},"Dev");case"+":return r.a.createElement("div",{className:"tag confirmed"},"\u2714");default:return""}},j=(a(148),a(80)),w=a.n(j),N=function(){var e=Object(n.useState)(!1),t=Object(v.a)(e,2),a=t[0],r=t[1],s=Object(n.useState)(null),c=Object(v.a)(s,2),l=c[0],i=c[1];return{loading:a,request:Object(n.useCallback)(function(){var e=Object(m.a)(u.a.mark((function e(t){var a,n,s,c,l,o=arguments;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=o.length>1&&void 0!==o[1]?o[1]:"GET",n=o.length>2&&void 0!==o[2]?o[2]:null,s=o.length>3&&void 0!==o[3]?o[3]:{},r(!0),e.prev=4,n&&(n=JSON.stringify(n),s["Content-Type"]="application/json"),e.next=8,fetch(t,{method:a,body:n,headers:s});case 8:return c=e.sent,e.next=11,c.json();case 11:if(l=e.sent,c.ok){e.next=14;break}throw new Error(l.message||l||"\u0427\u0442\u043e \u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a");case 14:return r(!1),e.abrupt("return",l);case 18:throw e.prev=18,e.t0=e.catch(4),r(!1),i(e.t0.message),e.t0;case 23:case"end":return e.stop()}}),e,null,[[4,18]])})));return function(t){return e.apply(this,arguments)}}(),[]),requestFormData:Object(n.useCallback)(function(){var e=Object(m.a)(u.a.mark((function e(t){var a,n,s,c,l=arguments;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=l.length>1&&void 0!==l[1]?l[1]:"GET",n=l.length>2&&void 0!==l[2]?l[2]:new FormData,s=l.length>3&&void 0!==l[3]?l[3]:{},r(!0),e.prev=4,s["Content-Type"]="application/x-www-form-urlencoded",e.next=8,w()({url:t,method:a,headers:s,data:n});case 8:return c=e.sent,r(!1),e.abrupt("return",c);case 13:throw e.prev=13,e.t0=e.catch(4),console.log(e.t0),r(!1),i(e.t0.message),e.t0;case 19:case"end":return e.stop()}}),e,null,[[4,13]])})));return function(t){return e.apply(this,arguments)}}(),[]),error:l,clearError:Object(n.useCallback)((function(){return i(null)}),[])}};function x(){}var I=Object(n.createContext)({token:null,userId:null,login:x,logout:x,reload:x,isAuthenticated:!1});function y(){var e=Object(n.useContext)(I),t=Object(n.useState)({username:"",password:""}),a=Object(v.a)(t,2),s=a[0],c=a[1],i=Object(n.useState)(0),o=Object(v.a)(i,2),h=o[0],g=o[1],E=Object(n.useState)(""),O=Object(v.a)(E,2),j=O[0],w=O[1],x=Object(n.useState)({username:0,password:0}),y=Object(v.a)(x,2),k=y[0],S=y[1],C=N(),_=C.loading,A=C.request,P=function(e){e.target.classList.remove("input-red"),g(0),c(Object(f.a)({},s,Object(d.a)({},e.target.name,e.target.value)))},D=function(){var t=Object(m.a)(u.a.mark((function t(a){var n;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a.preventDefault(),S(Object(f.a)({},k,{username:0,password:0})),s.username){t.next=7;break}return g(1),w("\u041b\u043e\u0433\u0438\u043d \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e\u0435 \u043f\u043e\u043b\u0435!"),S(Object(f.a)({},k,{username:1})),t.abrupt("return");case 7:if(s.password){t.next=12;break}return g(1),w("\u041f\u0430\u0440\u043e\u043b\u044c \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e\u0435 \u043f\u043e\u043b\u0435!"),S(Object(f.a)({},k,{password:1})),t.abrupt("return");case 12:return t.prev=12,t.next=15,A("/api/auth/login","POST",Object(f.a)({},s));case 15:n=t.sent,e.login(n.token,n.userId,n.username),t.next=25;break;case 19:t.prev=19,t.t0=t.catch(12),console.log(t.t0.message),g(1),w(t.t0.message),S(Object(f.a)({},k,{username:1,password:1,repPassword:1}));case 25:case"end":return t.stop()}}),t,null,[[12,19]])})));return function(e){return t.apply(this,arguments)}}(),T=function(e){switch(k[e]){case 0:return"";case 1:return"animated shake fast input-red";case 2:return"input-red";default:return""}};return r.a.createElement("form",{className:"fullheight"},r.a.createElement(b.Animated,{style:{height:"100%"},animationIn:p(),isVisible:!0},r.a.createElement("div",{className:"auth-container"},r.a.createElement("div",{className:"wrapper"},r.a.createElement("h2",null,"TwiChat v0.8.1"),r.a.createElement("span",{className:function(){switch(h){case 0:return"warn-hide";case 1:return"warning animated fadeIn";case 2:return"warning";default:return""}}(),onAnimationEnd:function(){g(2)}},j),r.a.createElement("div",{className:"left"},r.a.createElement("label",{htmlFor:"username"},"\u041b\u043e\u0433\u0438\u043d")),r.a.createElement("input",{autoComplete:"login",id:"username",name:"username",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0438\u043a",type:"text",value:s.username,onChange:P,className:T("username"),onAnimationEnd:function(){S(Object(f.a)({},k,{username:2}))}}),r.a.createElement("div",{className:"left"},r.a.createElement("label",{htmlFor:"password"},"\u041f\u0430\u0440\u043e\u043b\u044c")),r.a.createElement("input",{autoComplete:"password",id:"password",name:"password",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u0430\u0440\u043e\u043b\u044c",type:"password",value:s.password,onChange:P,className:T("password"),onAnimationEnd:function(){S(Object(f.a)({},k,{password:2}))}}),r.a.createElement("button",{onClick:D,disabled:_},"\u0412\u043e\u0439\u0442\u0438"),r.a.createElement(l.b,{to:"/register"},"\u0415\u0449\u0435 \u043d\u0435 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u043d\u044b?")))))}function k(){var e=Object(n.useContext)(I),t=Object(n.useState)({username:"",password:"",repPassword:""}),a=Object(v.a)(t,2),s=a[0],c=a[1],i=Object(n.useState)(0),o=Object(v.a)(i,2),h=o[0],p=o[1],g=Object(n.useState)(""),E=Object(v.a)(g,2),O=E[0],j=E[1],w=Object(n.useState)({username:0,password:0,repPassword:0}),x=Object(v.a)(w,2),y=x[0],k=x[1],S=N(),C=S.loading,_=S.request,A=function(e){e.target.classList.remove("input-red"),p(0),c(Object(f.a)({},s,Object(d.a)({},e.target.name,e.target.value.trim())))},P=function(){var t=Object(m.a)(u.a.mark((function t(a){var n;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a.preventDefault(),k(Object(f.a)({},y,{username:0,password:0,repPassword:0})),s.username){t.next=7;break}return p(1),j("\u041b\u043e\u0433\u0438\u043d \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e\u0435 \u043f\u043e\u043b\u0435!"),k(Object(f.a)({},y,{username:1})),t.abrupt("return");case 7:if(!s.username.includes(" ")){t.next=12;break}return p(1),j("\u041b\u043e\u0433\u0438\u043d \u043d\u0435 \u0434\u043e\u0436\u0435\u043d \u0441\u043e\u0434\u0435\u0440\u0436\u0430\u0442\u044c \u043f\u0440\u043e\u0431\u0435\u043b\u043e\u0432!"),k(Object(f.a)({},y,{username:1})),t.abrupt("return");case 12:if(s.password){t.next=17;break}return p(1),j("\u041f\u0430\u0440\u043e\u043b\u044c \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e\u0435 \u043f\u043e\u043b\u0435!"),k(Object(f.a)({},y,{password:1})),t.abrupt("return");case 17:if(s.password===s.repPassword){t.next=22;break}return p(1),k(Object(f.a)({},y,{password:1,repPassword:1})),j("\u041f\u0430\u0440\u043e\u043b\u0438 \u043d\u0435 \u0441\u043e\u0432\u043f\u0430\u0434\u0430\u044e\u0442!"),t.abrupt("return");case 22:return t.prev=22,t.next=25,_("/api/auth/register","POST",Object(f.a)({},s));case 25:n=t.sent,e.login(n.token,n.userId,n.username),t.next=35;break;case 29:t.prev=29,t.t0=t.catch(22),console.log(t.t0.message),p(1),j(t.t0.message),k(Object(f.a)({},y,{username:1,password:1,repPassword:1}));case 35:case"end":return t.stop()}}),t,null,[[22,29]])})));return function(e){return t.apply(this,arguments)}}(),D=function(e){switch(y[e]){case 0:return"";case 1:return"animated shake fast input-red";case 2:return"input-red";default:return""}};return r.a.createElement("form",{className:"fullheight"},r.a.createElement(b.Animated,{style:{height:"100%"},animationIn:"fadeIn",isVisible:!0},r.a.createElement("div",{className:"auth-container"},r.a.createElement("div",{className:"wrapper"},r.a.createElement("h2",null,"TwiChat v0.8.1"),r.a.createElement("span",{className:function(){switch(h){case 0:return"warn-hide";case 1:return"warning animated fadeIn";case 2:return"warning";default:return""}}(),onAnimationEnd:function(){p(2)}},O),r.a.createElement("div",{className:"left"},r.a.createElement("label",{htmlFor:"username"},"\u041b\u043e\u0433\u0438\u043d")),r.a.createElement("input",{autoComplete:"login",id:"username",name:"username",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0438\u043a",type:"text",onChange:A,className:D("username"),onAnimationEnd:function(){k(Object(f.a)({},y,{username:2}))}}),r.a.createElement("div",{className:"left"},r.a.createElement("label",{htmlFor:"password"},"\u041f\u0430\u0440\u043e\u043b\u044c")),r.a.createElement("input",{autoComplete:"password",id:"password",name:"password",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u0430\u0440\u043e\u043b\u044c",type:"password",onChange:A,className:D("password"),onAnimationEnd:function(){k(Object(f.a)({},y,{password:2}))}}),r.a.createElement("div",{className:"left"},r.a.createElement("label",{htmlFor:"repPassword"},"\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u043f\u0430\u0440\u043e\u043b\u044c")),r.a.createElement("input",{autoComplete:"repPassword",id:"repPassword",name:"repPassword",placeholder:"\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u043f\u0430\u0440\u043e\u043b\u044c",type:"password",onChange:A,className:D("repPassword"),onAnimationEnd:function(){k(Object(f.a)({},y,{repPassword:2}))}}),r.a.createElement("button",{onClick:P,disabled:C},"\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c\u0441\u044f"),r.a.createElement(l.b,{to:"/login"},"\u0423\u0436\u0435 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u043d\u044b?")))))}var S=a(13),C=(a(166),a(18)),_=a(83),A=a(0),P=Object(n.createContext)({userId:null,username:null,avatar:null,status:null,tag:null,load:null});function D(e){var t=e.viewState,a=e.chatSwitch,s=e.hide,c=e.socket,o=e.chats,u=e.chat,m=e.chatRoute,d=e.chatButtons,f=Object(n.useContext)(P),v=f.username,b=f.avatar,h=f.load,p=Object(n.useContext)(I),O=Object(i.g)(),j=function(e){return o[e]&&o[e].last?o[e].last.username===v?"\u0422\u044b: ".concat(o[e].last.text):"".concat(o[e].last.username,": ").concat(o[e].last.text):""};return r.a.createElement("div",{id:"side-bar",className:t?" ":"side-bar-hide",style:s?{zIndex:-1}:{zIndex:0}},r.a.createElement("div",{className:"heading"},r.a.createElement("div",{id:"back",onClick:function(){a()}}," ",r.a.createElement(C.a,null)," "),r.a.createElement("div",{className:"app-name"},"TwiChat v0.8.1 Beta"),r.a.createElement("div",{onClick:function(){a()},className:"menu"},m?r.a.createElement(A.b.Provider,{value:{color:"white",size:"20px"}},r.a.createElement(l.b,{to:"/profile"},r.a.createElement(C.d,{className:"react-button"}))):r.a.createElement(A.b.Provider,{value:{color:"white",size:"20px"}},r.a.createElement(l.b,{to:"/chat"},r.a.createElement(_.a,{className:"react-button"}))))),r.a.createElement("div",{className:"users"},r.a.createElement(l.b,{onClick:function(){a(),g()},to:"/chat"},r.a.createElement("div",{className:"user "+("community"===u?"active":"")},r.a.createElement("div",{className:"user-photo"},"C"),r.a.createElement("div",{className:"user-info"},r.a.createElement("div",{className:"name"},"Community"),r.a.createElement("div",{className:"last-message"},j("community"))))),d.map((function(e,t){var n=e.chatId,s=e.userId,c=e.username,i=e.avatar;return j(n)?r.a.createElement(l.b,{key:t,onClick:function(){a(),g()},to:"/direct/".concat(s)},r.a.createElement("div",{className:"user "+(u===n?"active":"")},r.a.createElement("div",{className:"user-photo"},r.a.createElement("img",{className:"chat-avatar",src:E(i,65),alt:"chatAvatar",width:"65"})),r.a.createElement("div",{className:"user-info"},r.a.createElement("div",{className:"name"},c),r.a.createElement("div",{className:"last-message"},j(n))))):r.a.createElement(r.a.Fragment,null)}))),r.a.createElement("div",{className:"current-user"},r.a.createElement("div",{className:"user-container"},r.a.createElement(l.b,{to:"/profile"},r.a.createElement("img",{className:"avatar"+(h?" none":" animated slideInRight"),onClick:function(){a()},src:E(b,54),alt:"avatar"})),r.a.createElement("span",{className:"username"+(h?" none":" animated slideInRight")},v)),r.a.createElement(A.b.Provider,{value:{color:"white",size:"20px"}},r.a.createElement(C.c,{onClick:function(e){e.preventDefault(),c.emit("logout"),p.logout(),O.push("/")},className:"react-button"}))))}function T(e){var t=e.title,a=e.barSwitch;return r.a.createElement("div",{className:"chat-header"},r.a.createElement("div",{className:"user-info"},r.a.createElement("div",{className:"user-name"},t)),r.a.createElement("div",{id:"chats-back",onClick:function(){a()}},r.a.createElement(C.e,null)))}function B(e){var t=e.message,a=e.me,s=e.name,c=e.avatarId,i=e.userId,o=Object(n.useState)("png"),u=Object(v.a)(o,2),m=u[0],d=u[1],f=Object(n.useState)(!1),b=Object(v.a)(f,2),h=b[0],p=b[1];Object(n.useEffect)((function(){var e=c.split("/")[1].split(".")[1];d(e)}),[c]);return r.a.createElement("div",{onMouseEnter:function(){p(!0)},onMouseLeave:function(){p(!1)},className:"message-container"+(a?" me":" ")},r.a.createElement("div",{className:"avatarFront"},r.a.createElement(l.b,{to:a?"/profile":"/profile/".concat(i)},r.a.createElement("img",{src:function(e){return E("gif"===m&&h?e:"".concat(e.split(".")[0],".png"),69)}(c),alt:"avatar"}))),r.a.createElement("div",{className:"data"},r.a.createElement("div",{className:"message"},t),r.a.createElement("div",{className:"name"},s)))}var L=a(84),F=a.n(L);a(178);function R(e){var t=e.loader;return"main"===t?r.a.createElement("div",{className:"loader-container"},r.a.createElement("div",{className:"loadingio-spinner-dual-ball-1bcrbgm9zs1"},r.a.createElement("div",{className:"ldio-ws5kmlhv8h"},r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null)))):"messages"===t?r.a.createElement("div",{className:"loader-container"},r.a.createElement("div",{className:"loadingio-spinner-ripple-93sai1jh985"},r.a.createElement("div",{className:"ldio-bn935j38u6"},r.a.createElement("div",null),r.a.createElement("div",null)))):"msgload"===t?r.a.createElement("div",{className:"loadingio-spinner-ellipsis-ls8rjpa7b19"},r.a.createElement("div",{className:"ldio-xetx4216ci"},r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null))):r.a.createElement("div",null)}function q(e){var t=e.setVisibleButton,a=e.messages,s=e.loading,c=e.socket,l=e.next,i=e.finishMessages,o=e.chat,u=e.RefreshChat,m=Object(n.useState)(!0),d=Object(v.a)(m,2),f=d[0],b=d[1],h=Object(n.useState)(0),p=Object(v.a)(h,2),E=p[0],O=p[1],j=Object(n.useState)(0),w=Object(v.a)(j,2),N=w[0],x=w[1],I=Object(n.useState)(0),y=Object(v.a)(I,2),k=y[0],S=y[1],C=Object(n.useState)(!1),_=Object(v.a)(C,2),A=_[0],D=_[1],T=Object(n.useState)(!1),L=Object(v.a)(T,2),q=L[0],H=L[1],z=Object(n.useContext)(P);return Object(n.useEffect)((function(){var e,t=document.getElementById("msgs"),n=t.scrollHeight-t.offsetHeight;if(x(n),S(l),O(a.length),E!==a.length){if(D(!0),f&&g(),l>1&&l!==k)return e=n-N,void document.getElementById("msgs").scrollTo(0,e);g()}}),[a,z,E,f,l,k,N,o,t]),r.a.createElement("div",{className:"thread-container",id:"msgs",onScroll:function(){var e=document.getElementById("msgs"),a=e.scrollHeight-e.offsetHeight,n=e.scrollTop;if(a-.1*a<=n?(A&&(u(o),D(!1)),H(!1),t(!1),b(!0)):(H(!0),D(!0),t(!0),b(!1)),0===n&&a>0){if(i)return;c.emit("load_more_messages",{next:l,chat:o})}}},s?r.a.createElement(R,{loader:"messages"}):r.a.createElement("div",{className:"thread",id:"msgsInner"},!i&&q?r.a.createElement("div",{className:"msgload"},r.a.createElement(R,{loader:"msgload"})):"",r.a.createElement(F.a,{transitionName:{enter:"animated",enterActive:"zoomIn",leave:"animated",leaveActive:"fadeOut"},transitionEnterTimeout:400,transitionLeaveTimeout:400},a.map((function(e,t){return r.a.createElement(B,{key:e.id,message:e.text,me:z.userId===e.userId,name:e.username,avatarId:e.avatar,userId:e.userId})})))))}var H=a(85);function z(e){var t=e.visibleButton,a=e.socket,s=e.chat,c=e.typing,l=e.load,o=Object(n.useState)(""),u=Object(v.a)(o,2),m=u[0],d=u[1],f=Object(n.useState)(""),h=Object(v.a)(f,2),p=h[0],g=h[1],E=Object(n.useContext)(P),O=E.username,j=E.userId,w=E.avatar,N=Object(i.h)().id,x=new Date,I=x.setSeconds(x.getSeconds()+3),y=Object(H.useTimer)({expiryTimestamp:I,onExpire:function(){a.emit("send_typing_off",{username:O,chat:s})}}),k=y.restart,S=y.pause;Object(n.useEffect)((function(){if(!c[s])return g("");c[s].length<=0?g(""):1===c[s].length?g("".concat(c[s][0]," \u043a\u0430\u0441\u0442\u0443\u0435\u0442...")):2===c[s].length?g("".concat(c[s][0]," \u0438 ").concat(c[s][1]," \u043a\u0430\u0441\u0442\u0443\u044e\u0442...")):3===c[s].length?g("".concat(c[s][0],", ").concat(c[s][1]," \u0438 ").concat(c[s][2]," \u043a\u0430\u0441\u0442\u0443\u044e\u0442...")):g("\u041a\u0430\u0441\u0442\u0443\u0435\u0442\u0441\u044f \u043c\u0435\u0433\u0430\u0437\u0430\u043a\u043b\u0438\u043d\u0430\u043d\u0438\u0435...")}),[c,s]);var _=function(e){if(S(),a.emit("send_typing_off",{username:O,chat:s}),e){d("");var t="community";N&&(t=N),a.emit("send_message",{text:e,username:O,userId:j,avatar:w,chat:s,sendTo:t})}};return r.a.createElement("div",null,r.a.createElement("div",{className:"scrollContainer"},r.a.createElement(b.Animated,{animationIn:"bounceIn",animationOut:"zoomOutDown",animationOutDuration:400,animationInDuration:400,isVisible:t,animateOnMount:!1},r.a.createElement("button",{id:"scrollBottom",onClick:function(){var e=document.getElementById("msgs");e.scrollTo({top:e.scrollHeight})}},r.a.createElement(A.b.Provider,{value:{color:"white",size:"26px"}},r.a.createElement(C.b,null))))),r.a.createElement("div",{className:"typing-user animated infinite pulse"},r.a.createElement("span",null,p)),r.a.createElement("div",{className:"message-input"},r.a.createElement("form",{onSubmit:function(e){e.preventDefault()},className:"message-form"},r.a.createElement("textarea",{id:"message",autoFocus:!0,type:"text",className:"form-control",value:m,autoComplete:"off",placeholder:"\u041d\u0430\u043f\u0438\u0448\u0438 \u0447\u0442\u043e-\u0442\u043e \u0438\u043d\u0442\u0435\u0440\u0435\u0441\u043d\u043e\u0435",onChange:function(e){var t=e.target;d(t.value)},onKeyDown:function(e){if(("Enter"!==e.key||!e.shiftKey)&&"Enter"===e.key){if(e.preventDefault(),l)return;_(m)}},onKeyUp:function(e){if(!l&&"Enter"!==e.key){a.emit("send_typing_on",{username:O,chat:s});var t=new Date,n=t.setSeconds(t.getSeconds()+3);k(n)}}}),r.a.createElement("button",{disabled:l,type:"submit",className:"send",onClick:function(e){e.preventDefault(),document.getElementById("message").focus(),_(m)}}," \u27a4 "))))}var M=a(86),V=(a(210),a(31));function J(e){var t=e.username,a=e.userId,n=e.avatar;return r.a.createElement("div",{className:"friend-container"},r.a.createElement("div",null,r.a.createElement(l.b,{to:"/profile/".concat(a)},r.a.createElement("img",{className:"avatar",src:E(n,65),alt:"friend-avatar"}))),r.a.createElement("div",{className:"username"},t))}var U=a(30),K=a.n(U);function W(e){var t=e.username,a=e.userId,n=e.requestHandler;return r.a.createElement("div",{className:"request"},r.a.createElement("span",null,"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c ",t," \u0445\u043e\u0447\u0435\u0442 \u0434\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432\u0430\u0441 \u0432 \u0434\u0440\u0443\u0437\u044c\u044f"),r.a.createElement("div",{className:"buttons"},r.a.createElement("button",{onClick:function(){n(a,!0)},className:"accept"},"\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044c"),r.a.createElement("button",{onClick:function(){n(a,!1)},className:"cansel"},"\u041e\u0442\u043a\u043b\u043e\u043d\u0438\u0442\u044c")))}function G(e){var t=e.socket,a=e.setStatus,s=e.setAvatar,c=e.setEasterEgg,l=e.friends,i=e.requests,o=Object(n.useContext)(P),d=o.username,f=o.avatar,b=o.status,h=o.tag,p=o.userId,g=Object(n.useState)(""),j=Object(v.a)(g,2),w=j[0],x=j[1],I=Object(n.useState)(""),y=Object(v.a)(I,2),k=y[0],S=y[1],C=Object(n.useState)(E(null,180)),_=Object(v.a)(C,2),A=_[0],D=_[1],T=N().requestFormData;K()((function(){"dev"===h&&c(!0)}),{code:["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"]}),Object(n.useEffect)((function(){x(b),S(b),f&&D(E(f,180))}),[b,f]),Object(n.useEffect)((function(){t.emit("get_friend_requests"),t.emit("get_friends")}),[t,p]);var B=function(e,a){t.emit("request_handler",{userId:e,accept:a})},L=function(){var e=Object(m.a)(u.a.mark((function e(a){var n,r,c,l,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.target.files[0],(r=new FormData).append("file",n),r.append("upload_preset","da9k11cr"),D(E("v1581959183/levng698wjc23g8d5iua.gif",180)),e.prev=5,e.next=8,T("https://api.cloudinary.com/v1_1/sketchcorp/upload","POST",r);case 8:if(c=e.sent,l=c.data,i="v".concat(l.version,"/").concat(l.public_id,".").concat(l.format),D(E(i,180)),t.emit("update_avatar",{avatar:i}),s(i),"v1581973009/w1xcn5v6tl80hw72lpts.png"!==f){e.next=16;break}return e.abrupt("return");case 16:t.emit("delete_avatar",{avatar:f}),e.next=24;break;case 19:e.prev=19,e.t0=e.catch(5),console.log(e.t0),alert("\u041e\u0439\u0439\u0439\u0439... \u0427\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a \u043f\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0435 \u0430\u0432\u0430\u0442\u0430\u0440\u043a\u0438. \u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043d\u0430\u0436\u043c\u0438\u0442\u0435 Ctrl+Shift+I \u0438 \u0441\u0434\u0435\u043b\u0430\u0439\u0442\u0435 \u0441\u043a\u0440\u0438\u043d\u0448\u043e\u0442 \u043a\u043e\u043d\u0441\u043e\u043b\u0438. \u0421\u043f\u0430\u0441\u0438\u0431\u043e ^^ -\u0421\u043a\u0435\u0442\u0447"),D(E(f,180));case 24:case"end":return e.stop()}}),e,null,[[5,19]])})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"profile-container"},r.a.createElement("div",{className:"user-data"},r.a.createElement("div",null,r.a.createElement("div",{className:"image-upload"},r.a.createElement("label",{htmlFor:"avatar-input"},r.a.createElement("div",{className:"cover"},"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c"),r.a.createElement("img",{src:A,alt:"avatar"})),r.a.createElement("input",{onChange:L,id:"avatar-input",type:"file",accept:"image/*"}))),r.a.createElement("div",{className:"data-wrapper"},r.a.createElement("div",{className:"username"},d," ",O(h)),r.a.createElement(V.a,{maxLength:"190",className:"status",type:"text",value:w,onChange:function(e){var t=e.target;x(t.value)},onBlur:function(e){e.target.value=k},onKeyPress:function(e){"Enter"===e.key&&(S(e.target.value),a(e.target.value),t.emit("update_status",{status:e.target.value}),e.target.blur())}}))),r.a.createElement("div",{className:"requests-container"},i.map((function(e,t){var a=e.username,n=e.userId;return r.a.createElement(W,{key:t,username:a,userId:n,requestHandler:B})})))),r.a.createElement("div",{className:"friends-header"},"\u0414\u0440\u0443\u0437\u044c\u044f"),r.a.createElement("div",{className:"friends-container",id:"msgs"},r.a.createElement("div",{className:"friends",id:"msgsInner"},l.map((function(e,t){var a=e.username,n=e.userId,s=e.avatar;return r.a.createElement(J,{key:t,username:a,userId:n,avatar:s})})))),r.a.createElement("div",{className:"friends-footer"}))}function $(){var e=Object(n.useState)(!1),t=Object(v.a)(e,2),a=t[0],s=t[1],c=new Audio("/sounds/lightOff.mp3");return function(e){var t,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},s=r.persistRenders,c=void 0!==s&&s,l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:setTimeout,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:clearTimeout,o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:n.useEffect,u=function(){return t&&i(t)};o((function(){return t=l(e,a),u}),c?[l,i]:[e,a,l,i])}((function(){s(!0)}),3e3,{persistRenders:!1}),Object(n.useEffect)((function(){c.play()}),[c]),a?r.a.createElement("div",{className:"easter-egg"},r.a.createElement("video",{autoPlay:!0,src:"/videos/dark.mp4"})):r.a.createElement("div",{className:"easter-egg"},r.a.createElement("div",null))}a(212);function Q(e){var t=e.socket,a=e.setEasterEgg,s=e.usersProfile,c=Object(n.useContext)(P).userId,o=Object(n.useState)(!0),u=Object(v.a)(o,2),m=u[0],d=u[1],f=Object(n.useState)(""),b=Object(v.a)(f,2),h=b[0],p=b[1],g=Object(n.useState)(E(null,180)),j=Object(v.a)(g,2),w=j[0],N=j[1],x=Object(n.useState)(""),I=Object(v.a)(x,2),y=I[0],k=I[1],S=Object(n.useState)(""),C=Object(v.a)(S,2),_=C[0],A=C[1],D=Object(n.useState)([]),T=Object(v.a)(D,2),B=T[0],L=T[1],F=Object(n.useState)(!1),R=Object(v.a)(F,2),q=R[0],H=R[1],z=Object(i.g)(),M=Object(i.h)().id;K()((function(){"dev"===s[M].tag&&a(!0)}),{code:["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"]}),Object(n.useEffect)((function(){if(c===M)return z.push("/profile");if(s[M]){if(!s[M].exist)return z.push("/profile");for(var e=0;e<s[M].friends.length;e++)s[M].friends[e].userId===c&&H(!0);d(!1),k(s[M].username),p(s[M].status),N(E(s[M].avatar,180)),A(s[M].tag),L(s[M].friends)}}),[M,s,z,c]),Object(n.useEffect)((function(){t.emit("get_other_user",{userId:M})}),[t,M]);return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"other-profile-container"},r.a.createElement("div",{className:"user-data"},r.a.createElement("div",null,r.a.createElement("div",{className:"image-upload"},r.a.createElement("label",{htmlFor:"avatar-input"},r.a.createElement("img",{src:w,alt:"avatar"})))),r.a.createElement("div",{className:"data-wrapper"},r.a.createElement("div",{className:"username"},y," ",O(_)),r.a.createElement(V.a,{maxLength:"190",className:"status",type:"text",value:h,readOnly:!0}),r.a.createElement("div",{className:"buttons"},r.a.createElement(l.b,{to:"/direct/".concat(M)},r.a.createElement("button",{disabled:m},"\u041d\u0430\u043f\u0438\u0441\u0430\u0442\u044c")),q?r.a.createElement("button",{disabled:m,onClick:function(){H(!1),t.emit("delete_friend",{friendId:M}),t.emit("get_other_user",{userId:M})}},"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0438\u0437 \u0434\u0440\u0443\u0437\u0435\u0439"):r.a.createElement("button",{disabled:m,onClick:function(){t.emit("add_friend",{friendId:M}),alert("\u0417\u0430\u043f\u0440\u043e\u0441 \u0432 \u0434\u0440\u0443\u0437\u044c\u044f \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d!")}},"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432 \u0434\u0440\u0443\u0437\u044c\u044f"))))),r.a.createElement("div",{className:"friends-header"},"\u0414\u0440\u0443\u0437\u044c\u044f"),r.a.createElement("div",{className:"friends-container",id:"msgs"},r.a.createElement("div",{className:"friends",id:"msgsInner"},B.map((function(e,t){var a=e.username,n=e.userId,s=e.avatar;return r.a.createElement(J,{key:t,username:a,userId:n,avatar:s})})))),r.a.createElement("div",{className:"friends-footer"}))}function X(e){var t=e.chatRoute,a=e.otherProfile,s=e.direct,c=Object(n.useContext)(I),l=Object(i.h)().id,o=Object(n.useState)(!0),u=Object(v.a)(o,2),m=u[0],h=u[1],p=Object(n.useState)(!1),E=Object(v.a)(p,2),O=E[0],j=E[1],w=Object(n.useState)(!1),N=Object(v.a)(w,2),x=N[0],y=N[1],k=Object(i.g)(),C=Object(n.useState)({username:"",avatar:"",userId:"",status:"",load:!0}),_=Object(v.a)(C,2),A=_[0],B=_[1],L=Object(n.useState)(null),F=Object(v.a)(L,2),R=F[0],H=F[1],V=Object(n.useState)(!0),J=Object(v.a)(V,2),U=J[0],K=J[1],W=Object(n.useState)({}),X=Object(v.a)(W,2),Y=X[0],Z=X[1],ee=Object(n.useState)([]),te=Object(v.a)(ee,2),ae=te[0],ne=te[1],re=Object(n.useState)({}),se=Object(v.a)(re,2),ce=se[0],le=se[1],ie=function(){var e=Object(n.useState)([0,0]),t=Object(v.a)(e,2),a=t[0],r=t[1];return Object(n.useLayoutEffect)((function(){function e(){r([window.innerWidth,window.innerHeight])}return window.addEventListener("resize",e),e(),function(){return window.removeEventListener("resize",e)}}),[]),a}(),oe=Object(v.a)(ie,1)[0],ue=Object(n.useState)(!1),me=Object(v.a)(ue,2),de=me[0],fe=me[1],ve=Object(n.useState)({}),be=Object(v.a)(ve,2),he=be[0],pe=be[1],ge=Object(n.useState)([]),Ee=Object(v.a)(ge,2),Oe=Ee[0],je=Ee[1],we=Object(n.useState)([]),Ne=Object(v.a)(we,2),xe=Ne[0],Ie=Ne[1],ye=Object(n.useState)(!1),ke=Object(v.a)(ye,2),Se=ke[0],Ce=ke[1],_e=Object(n.useState)({}),Ae=Object(v.a)(_e,2),Pe=Ae[0],De=Ae[1],Te=Object(M.a)({query:{token:c.token},autoConnect:!1}),Be=Object(v.a)(Te,1)[0];function Le(){oe>510||(m?setTimeout((function(e){e(!0)}),400,j):j(!1),h(!m))}Object(n.useEffect)((function(){return Be.on("connect",(function(){})),Be.on("reload",(function(){c.reload()})),Be.on("logout",(function(){c.logout(),k.push("/")})),Be.on("load_user_info",(function(e){B(Object(f.a)({},e,{load:!1}))})),Be.on("load_info",(function(e){var t=e.messages,a=e.chatButtonsPush,n=e.lasts;s||K(!1);var r=null;if(t.length>0){var c=t[t.length-1].text,l=c.slice(0,15);l.length<c.length&&(l+="..."),r=Object(f.a)({},t[t.length-1],{text:l})}for(var i=Object(d.a)({},"community",{messages:Object(S.a)(t),last:r,typing:[],next:1}),o=0;o<n.length;o++)i=Object(f.a)({},i,Object(d.a)({},n[o].chatId,{messages:[],typing:[],next:1,last:n[o]}));Z(i),ne(Object(S.a)(a)),De({})})),Be.on("push_more_messages",(function(e){var t=e.messages,a=e.isFinish,n=e.chat;Ce(a),Z(Object(f.a)({},Y,Object(d.a)({},n,{messages:[].concat(Object(S.a)(t),Object(S.a)(Y[n].messages)),last:Y[n].last,typing:Y[n].typing,next:Y[n].next+1})))})),Be.on("push_message",(function(e){var t=e.id,a=e.chat,n=e.username,r=e.userId,s=e.text,c={id:t,username:n,userId:r,text:s,avatar:e.avatar},l=Y[a]?Y[a].messages:[],i=Y[a]?Y[a].typing:[],o=s.slice(0,15);o.length<s.length&&(o+="..."),Z(Object(f.a)({},Y,Object(d.a)({},a,{messages:[].concat(Object(S.a)(l),[c]),last:Object(f.a)({},c,{text:o}),typing:Object(S.a)(i)})))})),Be.on("push_typing_on",(function(e){var t=e.username,a=e.chat,n=ce[a]?ce[a]:[];n.indexOf(t)<0&&n.push(t),n.indexOf(A.username)>-1&&n.splice(n.indexOf(A.username),1),le(Object(f.a)({},ce,Object(d.a)({},a,n)))})),Be.on("push_typing_off",(function(e){var t=e.username,a=e.chat,n=ce[a]?ce[a]:[];n.indexOf(t)>-1&&n.splice(n.indexOf(t),1),le(Object(f.a)({},ce,Object(d.a)({},a,n)))})),Be.on("push_other_user",(function(e){var t=e.exist,a=e.userId,n=e.username,r=e.status,s=e.avatar,c=e.tag,l=e.friends;if(!t)return pe(Object(f.a)({},he,Object(d.a)({},a,{exist:!1})));pe(Object(f.a)({},he,Object(d.a)({},a,{exist:!0,username:n,status:r,avatar:s,tag:c,friends:l})))})),Be.on("push_friend_requests",(function(e){je(e)})),Be.on("push_friends",(function(e){Ie(e)})),Be.on("update_chat_buttons",(function(e){var t=e.userIds,a=e.usernameIds,n=e.avatars,r=e.chatId,s=0;t[s]===A.userId&&(s=1),ne([].concat(Object(S.a)(ae),[{userId:t[s],username:a[s],avatar:n[s],chatId:r}]))})),Be.on("push_chat_messages",(function(e){var t=e.chatId,a=e.status,n=e.messages,r=e.userId;if(!a)return k.push("/chat");K(!1),H(t),Pe[r]||De(Object(f.a)({},Pe,Object(d.a)({},r,t)));var s=null;if(n.length>0){var c=n[n.length-1].text,l=c.slice(0,15);l.length<c.length&&(l+="..."),s=Object(f.a)({},n[n.length-1],{text:l})}Z(Object(f.a)({},Y,Object(d.a)({},t,{messages:Object(S.a)(n),last:s,typing:[],next:1}))),g()})),function(){Be.removeAllListeners()}}),[Be,Y,k,c,A,ce,he,R,s,"community",ae,Pe,De]),Object(n.useEffect)((function(){if(s||H("community"),!a&&l){if(Pe[l])return H(Pe[l]);K(!0),Be.emit("get_chat_messages",{userId:l})}}),[Be,l,R,s,a,Pe]),Object(n.useEffect)((function(){Be.connect()}),[Be]);return de?r.a.createElement($,null):r.a.createElement(P.Provider,{value:{username:A.username,avatar:A.avatar,userId:A.userId,status:A.status,tag:A.tag,load:A.load}},r.a.createElement("link",{rel:"stylesheet",href:"/themes/Dark.css"}),r.a.createElement("div",{className:"container"},t?r.a.createElement(b.Animated,{style:oe<=510?{width:"100%",height:"100%"}:{width:"76.25%",height:"100%"},animationIn:"slideInLeft",animationOut:"slideOutLeft",animationInDuration:400,animationOutDuration:400,isVisible:m,animateOnMount:!1},r.a.createElement("div",{style:{width:"100%"},className:"chat-room-container"+(O?" chat-hide":" chat-active")},r.a.createElement("div",{className:"chat-room"},r.a.createElement(T,{title:function(e){if("community"===e)return"Community";for(var t=0;t<ae.length;t++)if(ae[t].chatId===e)return ae[t].username;return"\u0422\u044b \u0448\u043e \u0442\u0430\u043c, \u0434\u0440\u043e\u0447\u0438\u0448?"}(R),barSwitch:Le}),r.a.createElement(q,{RefreshChat:function(e){var t=Y[e]&&Y[e].messages||[];if(!(t.length<=25)){t=t.slice(t.length-25),Ce(!1);var a=null;if(t.length>0){var n=t[t.length-1].text,r=n.slice(0,15);r.length<n.length&&(r+="..."),a=Object(f.a)({},t[t.length-1],{text:r})}Z(Object(f.a)({},Y,Object(d.a)({},e,{messages:Object(S.a)(t),last:a,typing:[],next:1}))),g()}},finishMessages:Se,chat:R,next:Y[R]?Y[R].next:0,messages:Y[R]?Y[R].messages:[],setVisibleButton:y,visibleButton:x,loading:U,socket:Be}),r.a.createElement(z,{setChats:Z,load:U,typing:ce,chat:R,socket:Be,visibleButton:x})))):r.a.createElement(b.Animated,{style:oe<=510?{width:"100%",height:"100%"}:{width:"76.25%",height:"100%"},animationIn:"slideInLeft",animationOut:"slideOutLeft",animationInDuration:400,animationOutDuration:400,isVisible:m,animateOnMount:!1},r.a.createElement("div",{style:{width:"100%"},className:"chat-room-container"+(O?" chat-hide":" chat-active")},r.a.createElement("div",{className:"chat-room"},r.a.createElement(T,{title:"\u041f\u0440\u043e\u0444\u0438\u043b\u044c",barSwitch:Le}),a?r.a.createElement(Q,{usersProfile:he,setEasterEgg:fe,socket:Be}):r.a.createElement(G,{friends:xe,requests:Oe,setAvatar:function(e){B(Object(f.a)({},A,{avatar:e}))},setEasterEgg:fe,setStatus:function(e){B(Object(f.a)({},A,{status:e}))},socket:Be})))),r.a.createElement(D,{chatButtons:ae,chatRoute:t,chats:Y,chat:R,socket:Be,viewState:oe<=510&&!m,chatSwitch:Le,hide:oe<=510&&!O})))}var Y=function(){var e=function(){var e=Object(n.useState)(null),t=Object(v.a)(e,2),a=t[0],r=t[1],s=Object(n.useState)(!1),c=Object(v.a)(s,2),l=c[0],i=c[1],o=Object(n.useState)(null),u=Object(v.a)(o,2),m=u[0],d=u[1],f=Object(n.useState)(null),b=Object(v.a)(f,2),h=b[0],p=b[1],g=Object(n.useCallback)((function(e,t,a){r(e),d(t),p(a),localStorage.setItem("Pony",JSON.stringify({token:e,userId:t,username:a}))}),[]),E=Object(n.useCallback)((function(){r(null),d(null),p(null),localStorage.removeItem("Pony")}),[]),O=Object(n.useCallback)((function(){var e=JSON.parse(localStorage.getItem("Pony"));e&&e.token||E()}),[E]);return Object(n.useEffect)((function(){var e=JSON.parse(localStorage.getItem("Pony"));e&&e.token&&g(e.token,e.userId,e.username),i(!0)}),[g]),{login:g,logout:E,token:a,reload:O,userId:m,username:h,ready:l}}(),t=e.token,a=e.login,s=e.logout,c=e.reload,o=e.userId,u=e.ready,m=!!t,d=function(e){return e?r.a.createElement(i.d,null,r.a.createElement(i.b,{path:"/chat",exact:!0},r.a.createElement(X,{chatRoute:!0})),r.a.createElement(i.b,{path:"/profile",exact:!0},r.a.createElement(X,null)),r.a.createElement(i.b,{path:"/profile/:id",exact:!0},r.a.createElement(X,{otherProfile:!0})),r.a.createElement(i.b,{path:"/direct/:id",exact:!0},r.a.createElement(X,{chatRoute:!0,direct:!0})),r.a.createElement(i.a,{to:"/chat"})):r.a.createElement(i.d,null,r.a.createElement(i.b,{path:"/login",exact:!0},r.a.createElement(y,null)),r.a.createElement(i.b,{path:"/register",exact:!0},r.a.createElement(k,null)),r.a.createElement(i.a,{to:"/login"}))}(m);return u?r.a.createElement(I.Provider,{value:{token:t,login:a,logout:s,reload:c,userId:o,isAuthenticated:m}},r.a.createElement(l.a,null,d)):r.a.createElement(R,{loader:"main"})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(Y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},88:function(e,t,a){e.exports=a(213)},93:function(e,t,a){}},[[88,1,2]]]);
//# sourceMappingURL=main.ef97c306.chunk.js.map