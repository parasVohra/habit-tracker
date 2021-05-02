(this["webpackJsonphabit-tracker"]=this["webpackJsonphabit-tracker"]||[]).push([[0],{159:function(e,t,a){},287:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(12),i=a.n(r),s=(a(159),a(47)),o=a(14),l=a(9),b=a(13),u=a.n(b),j=a(19),d=function(e,t){var a=t.type,n=t.payload;switch(a){case"SET_HABIT":return Object(j.a)(Object(j.a)({},e),{},{habits:n});case"SET_CATEGORY":return Object(j.a)(Object(j.a)({},e),{},{category:n});case"SET_HABIT_RESTRUCTURE":return Object(j.a)(Object(j.a)({},e),{},{habitRestructure:n});case"SET_ERROR":return Object(j.a)({},e);case"SET_HABIT_STATUS":return Object(j.a)(Object(j.a)({},e),{},{habitStatus:Object.assign({},e.habitStatus,n)});case"SET_CURRENT_DATE":return Object(j.a)(Object(j.a)({},e),{},{currentDate:n});default:return e}},h=a(321),O=a(322),x=a(22),p=a(66),f=a.n(p),m={get:f.a.get,post:f.a.post,put:f.a.put,delete:f.a.delete},g=a(67);function v(){return(v=Object(x.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.post(g.a+"saveHabit",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function y(){return(y=Object(x.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.get(g.a+"getHabits");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function S(){return(S=Object(x.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.post(g.a+"updateHabit",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function k(){return(k=Object(x.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.post(g.a+"updateIsTracked",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}console.log("*************************In Services");var T={saveHabit:function(e){return v.apply(this,arguments)},getHabits:function(){return y.apply(this,arguments)},updateHabitStatus:function(e){return S.apply(this,arguments)},updateIsTracked:function(e){return k.apply(this,arguments)}};function w(e){var t={};return e.reduce((function(e,a){return t.hasOwnProperty(a.category)||e.push(a.category),t[a.category]="",e}),[])}console.log("*************************In Utilities");var N=a(2),D=u.a.mark(I);console.log("*************************In store");var H=[],C=[],E=[],_=new Date,R=Object(h.a)(new Date),Y=Object(O.a)(new Date);function I(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,T.getHabits();case 2:case"end":return e.stop()}}),D)}var A=I().next().value;console.log(A),A.then((function(e){var t;console.log(e.data),H=e.data,t=H,console.log(t),C=t.map((function(e){return e.habitName}),[]),E=w(H),console.log(C)}));var z={habits:H||[],category:E||[],habitsNameList:C||[],habitRestructure:{},habitStatus:[],error:[],currentDate:_,weekStartDate:R,weekEndDate:Y},B=Object(n.createContext)(z),F=function(e){var t=e.children,a=Object(n.useReducer)(d,z),c=Object(l.a)(a,2),r=c[0],i=c[1];return Object(N.jsx)(B.Provider,{value:[r,i],children:t})},M=a(332),U=a(334),G=a(335),P=a(85),W=a(27),q=a.n(W),J=a(33),L=a(328),Q=a(289),V=a(329),$=a(330),K=a(323),X=a(327),Z=a(331),ee=a(339);console.log("*************************In Render Categories");var te=function(e){var t=e.category,a=Object(n.useContext)(B),c=Object(l.a)(a,2),r=c[0],i=c[1],s=Object(n.useState)(null),o=Object(l.a)(s,2),b=o[0],j=o[1],d=Object(n.useState)(t),h=Object(l.a)(d,1)[0],O=Object(n.useState)(null),p=Object(l.a)(O,2),f=(p[0],p[1]),m=Object(n.useState)(!1),g=Object(l.a)(m,2),v=(g[0],g[1],Object(n.useState)(null)),y=Object(l.a)(v,2),S=y[0],k=y[1];Object(n.useEffect)((function(){j(r.habitRestructure),f(r.currentDate),k(r.weekStartDate)}),[r.habitRestructure,r.category,r.currentDate,r.weekStartDate]),Object(n.useEffect)((function(){r.habitRestructure[h].map((function(e){var t={},a=e.habitName;t[a]=[];for(var n=!1,c=function(c){var r=q()(S).add(c,"days"),i=q()(r).format("DDMMYYYY"),s=e.habitTrack.filter((function(e){return e.date===i}));s.length>0&&s[0].isComplete?t[a][c]=!0:t[a][c]=!1,6===c&&(n=!0)},r=0;r<=6;r++)c(r);n&&i({type:"SET_HABIT_STATUS",payload:t})}))}),[h,i,S,r.habitRestructure]);var w=Object(n.useRef)(),D=function(){var e=Object(x.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,T.updateHabitStatus(t);case 2:200===e.sent.status&&(alert("Habit Status updated"),w.current.focus());case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),H=function(e,t,a){var n={id:t._id,date:q()(r.weekStartDate).add(a,"days").format("DDMMYYYY"),day:q()(r.weekStartDate).add(a,"days").format("ddd"),isComplete:e.target.checked,inputData:null},c=t.habitName,s=r.habitStatus;if(s[c][a]=e.target.checked,i({type:"SET_HABIT_STATUS",payload:s}),"checkbox"!==t.inputType&&!0===e.target.checked){var o=prompt("Enter the  value for ".concat(t.habitName),"");null===o?alert("Please enter the value "):(n.inputData=o,D(n))}else D(n)};return Object(N.jsx)(N.Fragment,{children:b?b[h].map((function(e){return Object(N.jsxs)(K.a,{children:[Object(N.jsx)(X.a,{align:"center",children:e.habitName},e._id),Object(N.jsx)(X.a,{align:"center",children:Object(N.jsx)(ee.a,{checked:r.habitStatus[e.habitName][0]||!1,index:0,id:e._id,onChange:function(t){return H(t,e,0)},ref:w,size:"small"})}),Object(N.jsx)(X.a,{align:"center",children:Object(N.jsx)(ee.a,{checked:!!r.habitStatus&&r.habitStatus[e.habitName][1],index:1,id:e._id,onChange:function(t){return H(t,e,1)},ref:w,size:"small"})}),Object(N.jsx)(X.a,{align:"center",children:Object(N.jsx)(ee.a,{checked:!!r.habitStatus&&r.habitStatus[e.habitName][2],index:2,id:e._id,onChange:function(t){return H(t,e,2)},ref:w,size:"small"})}),Object(N.jsx)(X.a,{align:"center",children:Object(N.jsx)(ee.a,{checked:!!r.habitStatus&&r.habitStatus[e.habitName][3],index:3,id:e._id,onChange:function(t){return H(t,e,3)},ref:w,size:"small"})}),Object(N.jsx)(X.a,{align:"center",children:Object(N.jsx)(ee.a,{checked:!!r.habitStatus&&r.habitStatus[e.habitName][4],index:4,id:e._id,onChange:function(t){return H(t,e,4)},ref:w,size:"small"})}),Object(N.jsx)(X.a,{align:"center",children:Object(N.jsx)(ee.a,{checked:!!r.habitStatus&&r.habitStatus[e.habitName][5],index:5,id:e._id,onChange:function(t){return H(t,e,5)},ref:w,size:"small"})}),Object(N.jsx)(X.a,{align:"center",children:Object(N.jsx)(ee.a,{checked:!!r.habitStatus&&r.habitStatus[e.habitName][6],index:6,id:e._id,onChange:function(t){return H(t,e,6)},ref:w,size:"small"})})]},e._id)})):Object(N.jsx)(N.Fragment,{})})},ae=Object(M.a)((function(e){return{root:{flexGrow:1},paper:{padding:"5px",textAlign:"center",color:"black"},table:{minWidth:350}}}));var ne=function(e){e.habit,e.date;var t=Object(n.useContext)(B),a=Object(l.a)(t,2),c=a[0],r=a[1],i=ae();return Object(n.useEffect)((function(){var e=function(e){var t={},a=[];if(e){var n,c=Object(J.a)(e);try{for(c.s();!(n=c.n()).done;){var r=n.value;t.hasOwnProperty(r.category)||(a.push(r.category),t[r.category]=[]),t[r.category].push(r)}}catch(i){c.e(i)}finally{c.f()}}return[t,a]}(c.habits),t=Object(l.a)(e,2),a=t[0],n=t[1];r({type:"SET_CATEGORY",payload:n}),r({type:"SET_HABIT_RESTRUCTURE",payload:a}),console.log(w(c.habits)),console.log("hi")}),[r,c.habits]),console.log(w(c.habits)),Object(N.jsx)("div",{className:i.root,children:Object(N.jsx)(L.a,{className:i.table,component:Q.a,children:Object(N.jsxs)(V.a,{"aria-label":"simple table",padding:"none",size:"small",stickyHeader:!0,children:[Object(N.jsx)($.a,{children:Object(N.jsxs)(K.a,{children:[Object(N.jsx)(X.a,{align:"center",children:"Habits "}),Object(N.jsx)(X.a,{align:"center",children:"S"}),Object(N.jsx)(X.a,{align:"center",children:"M"}),Object(N.jsx)(X.a,{align:"center",children:"T"}),Object(N.jsx)(X.a,{align:"center",children:"W"}),Object(N.jsx)(X.a,{align:"center",children:"T"}),Object(N.jsx)(X.a,{align:"center",children:"F"}),Object(N.jsx)(X.a,{align:"center",children:"S"})]})}),Object(N.jsx)(Z.a,{children:c.habitRestructure?Object(N.jsx)(N.Fragment,{children:c.category?c.category.map((function(e,t){return Object(N.jsxs)(N.Fragment,{children:[Object(N.jsxs)(K.a,{children:[Object(N.jsx)(X.a,{children:Object(N.jsx)("strong",{children:e})}),Object(N.jsx)(X.a,{}),Object(N.jsx)(X.a,{}),Object(N.jsx)(X.a,{}),Object(N.jsx)(X.a,{}),Object(N.jsx)(X.a,{}),Object(N.jsx)(X.a,{}),Object(N.jsx)(X.a,{})]},e),Object(N.jsx)(te,{category:e})]})})):Object(N.jsx)(X.a,{children:"ss"})}):Object(N.jsx)(X.a,{children:"ss"})})]})})})},ce=a(338),re=a(333),ie=a(141),se=a.n(ie);var oe=function(){var e=Object(n.useContext)(B),t=Object(l.a)(e,2),a=(t[0],t[1],Object(n.useState)(null)),c=Object(l.a)(a,2),r=c[0],i=c[1],s=Object(n.useState)(null),o=Object(l.a)(s,2),b=(o[0],o[1],Boolean(r)),u=b?"simple-popover":void 0;return Object(N.jsxs)("div",{children:[Object(N.jsx)(ce.a,{id:u,open:b,anchorEl:r,onClose:function(){i(null)},anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"},children:Object(N.jsx)("div",{children:Object(N.jsxs)(V.a,{children:[Object(N.jsx)($.a,{children:Object(N.jsxs)(K.a,{children:[Object(N.jsx)(X.a,{align:"center",children:"Habits "}),Object(N.jsx)(X.a,{align:"center",children:"Track Habit"})]})}),Object(N.jsx)(Z.a,{})]})})}),Object(N.jsx)(re.a,{"aria-describedby":u,size:"small",color:"primary",onClick:function(e){i(e.currentTarget)},children:Object(N.jsx)(se.a,{})})]})};function le(){var e=Object(n.useContext)(B),t=Object(l.a)(e,2),a=t[0],r=t[1],i=be(),s=Object(n.useState)(!1),o=Object(l.a)(s,2),b=o[0],j=o[1];console.log(a),Object(n.useEffect)((function(){function e(){return(e=Object(x.a)(u.a.mark((function e(){var t,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("getting habits"),e.next=3,T.getHabits();case 3:t=e.sent,a=t.data,r({type:"SET_HABIT",payload:a});case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}q()(a.currentDate).format("DDMMYYYY")===q()().format("DDMMYYYY")?j(!0):j(!1),function(){e.apply(this,arguments)}()}),[a.currentDate,r]),console.log(q()().weekday()),console.log(a.weekStartDate),console.log(a.weekEndDate);var d=function(e){var t=q()(a.currentDate).add(e,"days");r({type:"SET_CURRENT_DATE",payload:t._d})};return Object(N.jsxs)(c.a.Fragment,{children:[Object(N.jsx)("div",{style:{margin:"20px"},children:q()(a.currentDate).format("DDMMYYYY")}),Object(N.jsx)(U.a,{container:!0,className:i.root,spacing:2,children:Object(N.jsxs)(U.a,{item:!0,xs:12,children:[Object(N.jsxs)(U.a,{container:!0,justify:"center",children:[Object(N.jsx)(U.a,{item:!0,children:Object(N.jsx)(G.a,{style:{margin:"20px"},variant:"contained",color:"primary",onClick:function(){return d(-1)},children:"Prev"})}),Object(N.jsx)(U.a,{item:!0,children:Object(N.jsx)(G.a,{style:{margin:"20px"},disabled:b,variant:"contained",color:"primary",onClick:function(){return d(1)},children:"Next"})}),Object(N.jsx)(U.a,{xs:3,item:!0}),Object(N.jsx)(U.a,{item:!0,justify:"flex-end",children:Object(N.jsx)(oe,{})})]}),Object(N.jsx)(U.a,{container:!0,justify:"center",children:Object(N.jsx)(ne,{})})]})})]})}console.log("************ In Home page Component ");var be=Object(M.a)({table:{minWidth:200,maxWidth:600,paddingLeft:10},checkbox:{color:P.a[400],"&$checked":{color:P.a[600]}}});function ue(){return Object(N.jsx)("div",{children:Object(N.jsx)(ne,{})})}var je=a(104),de=a(336),he=a(337),Oe=a(340),xe=a(86),pe=a(59),fe=function(e){var t=e.label,a=Object(je.a)(e,["label"]),n=Object(xe.b)(a),c=Object(l.a)(n,2),r=c[0],i=c[1],s=i.error&&i.touched?i.error:"";return Object(N.jsx)(he.a,Object(j.a)(Object(j.a)({label:t},r),{},{helperText:s,error:!!s}))},me=function(e){var t=e.label,a=e.options,n=Object(je.a)(e,["label","options"]),c=Object(xe.b)(n),r=Object(l.a)(c,2),i=r[0],s=r[1],o=s.error&&s.touched?s.error:"";return Object(N.jsx)(he.a,Object(j.a)(Object(j.a)({select:!0,label:t},i),{},{helperText:o,error:!!o,children:a.map((function(e){return Object(N.jsx)(Oe.a,{value:e.value,children:e.label},e.value)}))}))},ge=pe.a({category:pe.b().required().max(30),habitName:pe.b().required().max(30),types:pe.b().required(),color:pe.b().required()}),ve=function(){var e=Object(x.a)(u.a.mark((function e(t){var a,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={category:t.category,habitName:t.habitName,inputType:t.types,color:t.color},console.log("in save habit"),e.next=4,T.saveHabit(a);case 4:n=e.sent,console.log(n);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ye=Object(M.a)({root:{minWidth:275,padding:20},bullet:{display:"inline-block",margin:"0 2px",transform:"scale(0.8)"},title:{fontSize:14},pos:{marginBottom:12}}),Se=[{value:"checkbox",label:"Check Box"},{value:"text",label:"Text"},{value:"number",label:"Number"}],ke=[{value:"General",label:"General"},{value:"Health/Nutrition",label:"Health/Nutrition"},{value:"Skills",label:"Skills"},{value:"Work/Study",label:"Work/Study"},{value:"House Hold",label:"House Hold"},{value:"Quit Habit",label:"Quit Habit"}],Te=[{value:"red",label:"Red"},{value:"blue",label:"Blue"},{value:"black",label:"Black"},{value:"green",label:"Green"}],we=function(){var e=Object(n.useState)(null),t=Object(l.a)(e,2),a=(t[0],t[1]),c=ye();return Object(n.useEffect)((function(){}),[]),Object(N.jsxs)(de.a,{className:c.root,children:[Object(N.jsx)("h2",{children:"Add New Habit"}),Object(N.jsx)(xe.a,{initialValues:{category:"General",habitName:"",types:"checkbox",color:"black"},onSubmit:function(e){console.log(e),a(e),ve(e)},validationSchema:ge,children:function(e){var t=e.values,a=e.handleSubmit;e.handleChange,e.handleBlur;return Object(N.jsxs)("form",{onSubmit:a,children:[Object(N.jsx)("div",{className:c.root,children:Object(N.jsx)(me,{value:t.category,select:!0,label:"Category",name:"category",options:ke})}),Object(N.jsx)("div",{className:c.root,children:Object(N.jsx)(fe,{label:"Habit Name",name:"habitName",type:"input"})}),Object(N.jsx)("div",{className:c.root,children:Object(N.jsx)(me,{value:t.types,select:!0,label:"Types",name:"types",options:Se})}),Object(N.jsx)("div",{className:c.root,children:Object(N.jsx)(me,{value:t.color,select:!0,label:"Color",name:"color",options:Te})}),Object(N.jsx)("div",{children:Object(N.jsx)(G.a,{variant:"contained",color:"primary",type:"submit",children:"Save Habit"})}),Object(N.jsx)("pre",{children:JSON.stringify(t,null,2)})]})}})]})},Ne=function(){return Object(N.jsx)(c.a.Fragment,{children:Object(N.jsx)("nav",{children:Object(N.jsxs)(c.a.Fragment,{children:[Object(N.jsx)(s.c,{style:{textDecoration:"none",padding:"20px",color:"grey",fontSize:"25px"},activeStyle:{color:"black",fontSize:"26px"},to:"/",exact:!0,children:"Home"}),Object(N.jsx)(s.c,{style:{textDecoration:"none",padding:"20px",color:"grey",fontSize:"25px"},activeStyle:{color:"black",fontSize:"26px"},to:"/form",children:"Form"})]})})})};console.log("*************** In App");var De=function(){return Object(N.jsx)(c.a.Fragment,{children:Object(N.jsx)(s.b,{basename:"/",children:Object(N.jsxs)(F,{children:[Object(N.jsx)(Ne,{}),Object(N.jsx)("main",{className:"container-sm",children:Object(N.jsxs)(o.c,{children:[Object(N.jsx)(o.a,{exact:!0,path:"/",component:le}),Object(N.jsx)(o.a,{path:"/addHabit",component:ue}),Object(N.jsx)(o.a,{path:"/form",component:we})]})})]})})})},He=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,341)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,r=t.getLCP,i=t.getTTFB;a(e),n(e),c(e),r(e),i(e)}))};console.log("************* In Index.js"),i.a.render(Object(N.jsx)(s.a,{children:Object(N.jsx)(De,{})}),document.getElementById("root")),He()},67:function(e){e.exports=JSON.parse('{"a":"https://www.pursharthvohra.com/api/"}')}},[[287,1,2]]]);
//# sourceMappingURL=main.bc76b8df.chunk.js.map