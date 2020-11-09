(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{483:function(e,t,r){"use strict";r.r(t);r(13),r(12),r(10),r(31),r(15),r(16),r(14),r(35),r(80),r(11),r(87),r(62),r(458);var n=r(3),c=r(61);function o(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var m={name:"Profile",layout:"admin",head:{title:"Profile - Project Z"},transition:"fade",data:function(){return{name:"",avatar:null,imagePreview:"",email:"",phone:"",address:"",success:!1,fail:!1}},watch:{success:function(){var e=this;setTimeout((function(){e.success=!1}),2e3)},fail:function(){var e=this;setTimeout((function(){e.fail=!1}),2e3)}},created:function(){this.getUser&&(this.name=this.getUser.userHandle,this.imagePreview=this.getUser.imageURL,this.email=this.getUser.email,this.phone=this.getUser.phone,this.address=this.getUser.address)},computed:l(l({},Object(c.c)({getUser:function(e){return e.userCurrent}})),{},{nameState:function(){return this.name.length>0}}),methods:l(l({},Object(c.b)({actEditProfile:"actEditProfile"})),{},{onFileChange:function(e){null!=e&&(this.imagePreview=window.URL.createObjectURL(e.target.files[0]))},handleChangeImage:function(){this.$refs.changeImage.$el.querySelector("input[type=file]").click()},editProfile:function(){this.nameState&&(this.actEditProfile({userHandle:this.name,avatar:this.avatar,avatarOld:this.imagePreview,email:this.email,phone:this.phone,address:this.address,id:this.getUser.userId,role:this.getUser.role,createAt:this.getUser.createAt}),this.success=!0)}})},d=r(49),component=Object(d.a)(m,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"content-admin"},[r("h3",[e._v("Profile")]),e._v(" "),r("b-form",{ref:"form",attrs:{id:"edit-profile-form"},on:{submit:function(t){return t.preventDefault(),e.editProfile(t)}}},[r("div",{staticClass:"row my-3"},[r("div",{staticClass:"col-12"},[r("b-button",{staticClass:"btn-primary ",on:{click:e.handleChangeImage}},[e._v("Avatar"),r("b-icon",{staticClass:"ml-2",attrs:{icon:"card-image"}})],1)],1)]),e._v(" "),e.imagePreview?r("div",{staticClass:"row mb-3"},[r("div",{staticClass:"col-12"},[r("img",{staticClass:"image-preview",attrs:{alt:"image",src:e.imagePreview}})])]):e._e(),e._v(" "),r("b-form-file",{ref:"changeImage",staticClass:"d-none",attrs:{type:"file",accept:"image/*"},on:{change:e.onFileChange},model:{value:e.avatar,callback:function(t){e.avatar=t},expression:"avatar"}}),e._v(" "),r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-6 col-12 mb-2"},[r("h6",[e._v("Name")]),e._v(" "),r("b-form-input",{attrs:{placeholder:"Name",state:e.nameState},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),e._v(" "),r("b-form-invalid-feedback",{attrs:{id:"input-live-feedback"}},[e._v("\n                    Required\n                ")])],1),e._v(" "),r("div",{staticClass:"col-md-6 col-12 mb-2"},[r("h6",[e._v("Email")]),e._v(" "),r("b-form-input",{attrs:{placeholder:"Email",type:"email"},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}})],1)]),e._v(" "),r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-6 col-12 mb-2"},[r("h6",[e._v("Phone")]),e._v(" "),r("b-form-input",{attrs:{placeholder:"Phone",type:"number",onkeydown:"return event.keyCode !== 69"},model:{value:e.phone,callback:function(t){e.phone=t},expression:"phone"}})],1)]),e._v(" "),r("h6",[e._v("Address")]),e._v(" "),r("b-form-textarea",{staticClass:"mb-3",attrs:{placeholder:"Address"},model:{value:e.address,callback:function(t){e.address=t},expression:"address"}}),e._v(" "),r("b-button",{staticClass:"btn-primary mr-1",attrs:{type:"submit",form:"edit-profile-form"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.editProfile(t)}}},[e._v("Save"),r("b-icon",{staticClass:"ml-2",attrs:{icon:"check"}})],1),e._v(" "),1==e.fail?r("b-alert",{staticClass:"mt-3 py-1 px-3",attrs:{show:"",variant:"danger"}},[e._v("Error!")]):e._e(),e._v(" "),1==e.success?r("b-alert",{staticClass:"mt-3 py-1 px-3",attrs:{show:"",variant:"primary"}},[e._v("Success")]):e._e()],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);