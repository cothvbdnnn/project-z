(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{478:function(e,t,r){"use strict";r.r(t);r(13),r(12),r(10),r(15),r(16),r(14),r(11);var n=r(3),o=r(61);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function c(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var m={name:"SignUp",head:{title:"Sign Up - Project Z"},data:function(){return{email:"",password:"",userName:""}},computed:c(c({},Object(o.c)({getErrorSignUp:function(e){return e.SignUp.errorSignUp}})),{},{isNameStateValid:function(){return this.userName?this.isNameValid(this.userName):null},isPasswordStateValid:function(){return this.password?this.isPasswordValid(this.password):null},isEmailStateValid:function(){return this.email?this.isEmailValid(this.email):null}}),methods:c(c({},Object(o.b)({actRegisterUser:"SignUp/actRegisterUser"})),{},{registerUser:function(){this.actRegisterUser({email:this.email,password:this.password,userName:this.userName})},isNameValid:function(){return this.userName.length>0},isPasswordValid:function(){return this.password.length>5},isEmailValid:function(){return this.email.length>5}})},d=r(49),component=Object(d.a)(m,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("b-container",[r("b-row",[r("b-col",{staticClass:"mt-5 mx-auto",attrs:{cols:"lg-5"}},[r("b-form",{ref:"form",attrs:{id:"register-form"},on:{submit:function(t){return t.preventDefault(),e.registerUser(t)}}},[r("h6",[e._v("Email")]),e._v(" "),r("b-form-input",{staticClass:"mb-3",attrs:{placeholder:"Email",state:e.isEmailStateValid},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),e._v(" "),r("h6",[e._v("Password")]),e._v(" "),r("b-form-input",{staticClass:"mb-3",attrs:{type:"text",placeholder:"Password",state:e.isPasswordStateValid},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),e._v(" "),r("h6",[e._v("User name")]),e._v(" "),r("b-form-input",{staticClass:"mb-3",attrs:{type:"text",placeholder:"User name",state:e.isNameStateValid},model:{value:e.userName,callback:function(t){e.userName=t},expression:"userName"}}),e._v(" "),r("b-button",{staticClass:"btn-primary mr-2",attrs:{type:"submit",form:"register-form"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.registerUser(t)}}},[e._v("Sign up")]),e._v(" "),""!=e.getErrorSignUp?r("b-alert",{staticClass:"mt-3 py-1 px-3",attrs:{show:"",variant:"danger"}},[e._v(e._s(e.getErrorSignUp))]):e._e()],1)],1)],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);