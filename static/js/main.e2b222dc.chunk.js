(this["webpackJsonphabit-tracker"]=this["webpackJsonphabit-tracker"]||[]).push([[0],{156:function(e,t,a){},284:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),c=a(12),i=a.n(c),s=(a(156),a(52)),l=a(13),o=a(10),u=a(27),b=a.n(u),j=a(19),d=function(e,t){var a=t.type,r=t.payload;switch(a){case"SET_HABIT":return Object(j.a)(Object(j.a)({},e),{},{habits:r});case"SET_CATEGORY":return Object(j.a)(Object(j.a)({},e),{},{category:r});case"SET_HABIT_RESTRUCTURE":return Object(j.a)(Object(j.a)({},e),{},{habitRestructure:r});case"SET_ERROR":return Object(j.a)({},e);case"SET_HABIT_STATUS":return Object(j.a)(Object(j.a)({},e),{},{habitStatus:Object.assign({},e.habitStatus,r)});case"SET_CURRENT_DATE":return Object(j.a)(Object(j.a)({},e),{},{currentDate:r});default:return e}},h=a(2),p={habits:null,category:[],habitRestructure:[],habitStatus:{},error:null,currentDate:b()()._d},O=Object(r.createContext)(p),x=function(e){var t=e.children,a=Object(r.useReducer)(d,p),n=Object(o.a)(a,2),c=n[0],i=n[1];return Object(h.jsx)(O.Provider,{value:[c,i],children:t})},f=a(14),m=a.n(f),v=a(22),y=a(326),g=a(328),S=a(329),T=a(82),k=a(64),H=a.n(k),E={get:H.a.get,post:H.a.post,put:H.a.put,delete:H.a.delete},N=a(65);function _(){return(_=Object(v.a)(m.a.mark((function e(t){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.post(N.a+"saveHabit",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function C(){return(C=Object(v.a)(m.a.mark((function e(){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.get(N.a+"getHabits");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function D(){return(D=Object(v.a)(m.a.mark((function e(t){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.post(N.a+"updateHabit",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function R(){return(R=Object(v.a)(m.a.mark((function e(t){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.post(N.a+"updateIsTracked",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var w={saveHabit:function(e){return _.apply(this,arguments)},getHabits:function(){return C.apply(this,arguments)},updateHabitStatus:function(e){return D.apply(this,arguments)},updateIsTracked:function(e){return R.apply(this,arguments)}},Y=a(33),A=a(322),B=a(286),F=a(323),I=a(324),M=a(317),U=a(321),z=a(325),G=a(333),P=function(e){var t=e.category,a=Object(r.useContext)(O),n=Object(o.a)(a,2),c=n[0],i=n[1],s=Object(r.useState)(null),l=Object(o.a)(s,2),u=l[0],j=l[1],d=Object(r.useState)(t),p=Object(o.a)(d,1)[0],x=Object(r.useState)(null),f=Object(o.a)(x,2),y=f[0],g=f[1],S=Object(r.useState)(null),T=Object(o.a)(S,2),k=T[0],H=T[1];Object(r.useEffect)((function(){j(c.habitRestructure),g(c.currentDate),H(c.habitStatus)}),[c.habitRestructure,c.category,c.currentDate,c.habitStatus]),Object(r.useEffect)((function(){!function(e,t){t?t[p].forEach((function(t){var a=b()(e).format("DDMMYYYY"),r=t.habitTrack.filter((function(e){return e.date===a}));if(0===r.length){var n={};n[t.habitName]=!1,i({type:"SET_HABIT_STATUS",payload:n})}else if(r.length>0){var c=t.habitName,s=r[0].isComplete,l={};l[c]=s,i({type:"SET_HABIT_STATUS",payload:l})}})):console.log(t)}(y,u)}),[y,u,p,i]);var E=Object(r.useRef)(),N=function(){var e=Object(v.a)(m.a.mark((function e(t){var a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.updateHabitStatus(t);case 2:a=e.sent,console.log(a),200===a.status&&(alert("Habit Status updated"),E.current.focus());case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(h.jsx)(h.Fragment,{children:u?u[p].map((function(e){return Object(h.jsxs)(M.a,{children:[Object(h.jsx)(U.a,{align:"center",children:e.habitName},e._id),Object(h.jsx)(U.a,{align:"center",children:Object(h.jsx)(G.a,{checked:k[e.habitName]||!1,id:e._id,onChange:function(t){return function(e,t){var a={id:t._id,date:b()(y).format("DDMMYYYY"),day:b()(y).format("ddd"),isComplete:e.target.checked,inputData:null},r={};if(r[t.habitName]=e.target.checked,i({type:"SET_HABIT_STATUS",payload:r}),"checkbox"!==t.inputType&&!0===e.target.checked){var n=prompt("Enter the  value for ".concat(t.habitName),"");null===n?alert("Please enter the value "):(a.inputData=n,N(a))}else N(a)}(t,e)},ref:E})})]},e._id)})):Object(h.jsx)(h.Fragment,{})})},W=Object(y.a)((function(e){return{root:{flexGrow:1},paper:{padding:"20px",textAlign:"center",color:"black"}}}));var q=function(e){e.habit,e.date;var t=Object(r.useContext)(O),a=Object(o.a)(t,2),n=a[0],c=a[1],i=W();return Object(r.useEffect)((function(){var e=function(e){var t={},a=[];if(e){var r,n=Object(Y.a)(e);try{for(n.s();!(r=n.n()).done;){var c=r.value;t.hasOwnProperty(c.category)||(a.push(c.category),t[c.category]=[]),t[c.category].push(c)}}catch(i){n.e(i)}finally{n.f()}}return[t,a]}(n.habits),t=Object(o.a)(e,2),a=t[0],r=t[1];c({type:"SET_CATEGORY",payload:r}),c({type:"SET_HABIT_RESTRUCTURE",payload:a}),console.log("hi")}),[c,n.habits]),Object(h.jsx)("div",{className:i.root,children:Object(h.jsx)(A.a,{className:i.table,component:B.a,children:Object(h.jsxs)(F.a,{"aria-label":"simple table",children:[Object(h.jsx)(I.a,{children:Object(h.jsxs)(M.a,{children:[Object(h.jsx)(U.a,{align:"center",children:"Habits "}),Object(h.jsx)(U.a,{align:"center",children:"Status"})]})}),Object(h.jsx)(z.a,{children:n.habitRestructure?Object(h.jsx)(h.Fragment,{children:n.category?n.category.map((function(e,t){return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)(M.a,{children:[Object(h.jsx)(U.a,{children:e}),Object(h.jsx)(U.a,{})]},e),Object(h.jsx)(P,{category:e})]})})):Object(h.jsx)(U.a,{children:"ss"})}):Object(h.jsx)(U.a,{children:"ss"})})]})})})},J=a(332),L=a(327),Q=a(138),V=a.n(Q);var $=function(){var e=Object(r.useContext)(O),t=Object(o.a)(e,2),a=t[0],n=(t[1],Object(r.useState)(null)),c=Object(o.a)(n,2),i=c[0],s=c[1],l=Object(r.useState)(null),u=Object(o.a)(l,2),b=(u[0],u[1],Boolean(i)),j=b?"simple-popover":void 0;return Object(h.jsxs)("div",{children:[Object(h.jsx)(J.a,{id:j,open:b,anchorEl:i,onClose:function(){s(null)},anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"},children:Object(h.jsx)("div",{children:Object(h.jsxs)(F.a,{children:[Object(h.jsx)(I.a,{children:Object(h.jsxs)(M.a,{children:[Object(h.jsx)(U.a,{align:"center",children:"Habits "}),Object(h.jsx)(U.a,{align:"center",children:"Track Habit"})]})}),Object(h.jsx)(z.a,{children:a.habits?a.habits.map((function(e,t){return Object(h.jsxs)(M.a,{children:[Object(h.jsx)(U.a,{align:"center",children:e.habitName}),Object(h.jsx)(U.a,{align:"center",children:Object(h.jsx)(G.a,{id:e._id,onChange:function(e){return function(e){var t={id:e.target.id,isTracked:e.target.checked};function a(){return(a=Object(v.a)(m.a.mark((function e(){var a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.updateIsTracked(t);case 2:200===(a=e.sent).status&&a.data.nModified;case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){a.apply(this,arguments)}()}(e)},checked:e.isTracked})})]},t)})):null})]})})}),Object(h.jsx)(L.a,{"aria-describedby":j,size:"small",color:"primary",onClick:function(e){s(e.currentTarget)},children:Object(h.jsx)(V.a,{})})]})};function K(){var e=Object(r.useContext)(O),t=Object(o.a)(e,2),a=t[0],c=t[1],i=X(),s=Object(r.useState)(!1),l=Object(o.a)(s,2),u=l[0],j=l[1];console.log(a),Object(r.useEffect)((function(){function e(){return(e=Object(v.a)(m.a.mark((function e(){var t,a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.getHabits();case 2:t=e.sent,a=t.data,c({type:"SET_HABIT",payload:a});case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}b()(a.currentDate).format("DDMMYYYY")===b()().format("DDMMYYYY")?j(!0):j(!1),function(){e.apply(this,arguments)}()}),[a.currentDate,c]);var d=function(e){var t=b()(a.currentDate).add(e,"days");c({type:"SET_CURRENT_DATE",payload:t._d})};return Object(h.jsxs)(n.a.Fragment,{children:[Object(h.jsx)("div",{style:{margin:"20px"},children:b()(a.currentDate).format("DDMMYYYY")}),Object(h.jsx)(g.a,{container:!0,className:i.root,spacing:2,children:Object(h.jsxs)(g.a,{item:!0,xs:12,children:[Object(h.jsxs)(g.a,{container:!0,justify:"center",children:[Object(h.jsx)(g.a,{item:!0,children:Object(h.jsx)(S.a,{style:{margin:"20px"},variant:"contained",color:"primary",onClick:function(){return d(-1)},children:"Prev"})}),Object(h.jsx)(g.a,{item:!0,children:Object(h.jsx)(S.a,{style:{margin:"20px"},disabled:u,variant:"contained",color:"primary",onClick:function(){return d(1)},children:"Next"})}),Object(h.jsx)(g.a,{xs:3,item:!0}),Object(h.jsx)(g.a,{item:!0,justify:"flex-end",children:Object(h.jsx)($,{})})]}),Object(h.jsx)(g.a,{container:!0,justify:"center",children:Object(h.jsx)(q,{})})]})})]})}var X=Object(y.a)({table:{minWidth:200,maxWidth:600,paddingLeft:10},checkbox:{color:T.a[400],"&$checked":{color:T.a[600]}}});function Z(){return Object(h.jsx)("div",{children:Object(h.jsx)(q,{})})}var ee=a(101),te=a(331),ae=a(334),re=a(330),ne=a(83),ce=a(57),ie=function(e){var t=e.label,a=Object(ee.a)(e,["label"]),r=Object(ne.b)(a),n=Object(o.a)(r,2),c=n[0],i=n[1],s=i.error&&i.touched?i.error:"";return Object(h.jsx)(te.a,Object(j.a)(Object(j.a)({label:t},c),{},{helperText:s,error:!!s}))},se=function(e){var t=e.label,a=e.options,r=Object(ee.a)(e,["label","options"]),n=Object(ne.b)(r),c=Object(o.a)(n,2),i=c[0],s=c[1],l=s.error&&s.touched?s.error:"";return Object(h.jsx)(te.a,Object(j.a)(Object(j.a)({select:!0,label:t},i),{},{helperText:l,error:!!l,children:a.map((function(e){return Object(h.jsx)(ae.a,{value:e.value,children:e.label},e.value)}))}))},le=ce.a({category:ce.b().required().max(30),habitName:ce.b().required().max(30),types:ce.b().required(),color:ce.b().required()}),oe=function(){var e=Object(v.a)(m.a.mark((function e(t){var a,r;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={category:t.category,habitName:t.habitName,inputType:t.types,color:t.color},console.log("in save habit"),e.next=4,w.saveHabit(a);case 4:r=e.sent,console.log(r);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ue=Object(y.a)({root:{minWidth:275,padding:20},bullet:{display:"inline-block",margin:"0 2px",transform:"scale(0.8)"},title:{fontSize:14},pos:{marginBottom:12}}),be=[{value:"checkbox",label:"Check Box"},{value:"text",label:"Text"},{value:"number",label:"Number"}],je=[{value:"General",label:"General"},{value:"Health/Nutrition",label:"Health/Nutrition"},{value:"Skills",label:"Skills"},{value:"Work/Study",label:"Work/Study"},{value:"House Hold",label:"House Hold"},{value:"Quit Habit",label:"Quit Habit"}],de=[{value:"red",label:"Red"},{value:"blue",label:"Blue"},{value:"black",label:"Black"},{value:"green",label:"Green"}],he=function(){var e=Object(r.useState)(null),t=Object(o.a)(e,2),a=(t[0],t[1]),n=ue();return Object(r.useEffect)((function(){}),[]),Object(h.jsxs)(re.a,{className:n.root,children:[Object(h.jsx)("h2",{children:"Add New Habit"}),Object(h.jsx)(ne.a,{initialValues:{category:"General",habitName:"",types:"checkbox",color:"black"},onSubmit:function(e){console.log(e),a(e),oe(e)},validationSchema:le,children:function(e){var t=e.values,a=e.handleSubmit;e.handleChange,e.handleBlur;return Object(h.jsxs)("form",{onSubmit:a,children:[Object(h.jsx)("div",{className:n.root,children:Object(h.jsx)(se,{value:t.category,select:!0,label:"Category",name:"category",options:je})}),Object(h.jsx)("div",{className:n.root,children:Object(h.jsx)(ie,{label:"Habit Name",name:"habitName",type:"input"})}),Object(h.jsx)("div",{className:n.root,children:Object(h.jsx)(se,{value:t.types,select:!0,label:"Types",name:"types",options:be})}),Object(h.jsx)("div",{className:n.root,children:Object(h.jsx)(se,{value:t.color,select:!0,label:"Color",name:"color",options:de})}),Object(h.jsx)("div",{children:Object(h.jsx)(S.a,{variant:"contained",color:"primary",type:"submit",children:"Save Habit"})}),Object(h.jsx)("pre",{children:JSON.stringify(t,null,2)})]})}})]})},pe=function(){return Object(h.jsx)(n.a.Fragment,{children:Object(h.jsx)("nav",{children:Object(h.jsxs)(n.a.Fragment,{children:[Object(h.jsx)(s.b,{style:{textDecoration:"none",padding:"20px",color:"grey",fontSize:"25px"},activeStyle:{color:"black",fontSize:"26px"},to:"/",exact:!0,children:"Home"}),Object(h.jsx)(s.b,{style:{textDecoration:"none",padding:"20px",color:"grey",fontSize:"25px"},activeStyle:{color:"black",fontSize:"26px"},to:"/form",children:"Form"})]})})})};var Oe=function(){return Object(h.jsx)(n.a.Fragment,{children:Object(h.jsxs)(x,{children:[Object(h.jsx)(pe,{}),Object(h.jsx)("main",{className:"container-sm",children:Object(h.jsxs)(l.c,{children:[Object(h.jsx)(l.a,{path:"/",exact:!0,component:K}),Object(h.jsx)(l.a,{path:"/addHabit",component:Z}),Object(h.jsx)(l.a,{path:"/form",component:he})]})})]})})},xe=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,335)).then((function(t){var a=t.getCLS,r=t.getFID,n=t.getFCP,c=t.getLCP,i=t.getTTFB;a(e),r(e),n(e),c(e),i(e)}))};i.a.render(Object(h.jsx)(s.a,{children:Object(h.jsx)(Oe,{})}),document.getElementById("root")),xe()},65:function(e){e.exports=JSON.parse('{"a":"http://localhost:6001/api/"}')}},[[284,1,2]]]);
//# sourceMappingURL=main.e2b222dc.chunk.js.map