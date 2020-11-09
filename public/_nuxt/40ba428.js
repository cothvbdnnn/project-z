(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{486:function(t,e,r){"use strict";r.r(e);r(13),r(12),r(10),r(101),r(30),r(31),r(15),r(16),r(14),r(119),r(11),r(62);var n=r(3),o=r(61);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var m={name:"EditCategory",layout:"admin",head:{title:"Edit Category - Project Z"},transition:"fade",validate:function(t){return/^\d+$/.test(t.params.categoryId)||t.redirect("/admin/categories"),!0},data:function(){return{success:!1,fail:!1,nameCat:""}},watch:{success:function(){var t=this;setTimeout((function(){t.success=!1}),2e3)},fail:function(){var t=this;setTimeout((function(){t.fail=!1}),2e3)}},created:function(){this.categoryCurrent&&(this.nameCat=this.categoryCurrent.name)},computed:l(l({},Object(o.c)({getCategories:function(t){return t.Category.categories}})),{},{categoryCurrent:function(){return this.getCategories[this.$route.params.categoryId]}}),methods:l(l({},Object(o.b)({actEditCategory:"Category/actEditCategory"})),{},{editCategory:function(){var t=this.getCategories.map((function(t){return t.name.toLowerCase()}));""!=this.nameCat&&(t.includes(this.nameCat.toLowerCase())?this.fail=!0:(this.actEditCategory({catUpdate:this.nameCat,id:this.categoryCurrent.id,index:this.$route.params.categoryId}),this.success=!0))}})},d=r(49),component=Object(d.a)(m,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"content-admin"},[r("h3",[t._v("Edit category "+t._s(t.nameCat))]),t._v(" "),r("b-form",{ref:"form",attrs:{id:"edit-category-form"},on:{submit:function(e){return e.preventDefault(),t.editCategory(e)}}},[r("h6",[t._v("Name")]),t._v(" "),r("b-form-input",{staticClass:"mb-2",attrs:{placeholder:"Name"},model:{value:t.nameCat,callback:function(e){t.nameCat=e},expression:"nameCat"}}),t._v(" "),r("b-button",{staticClass:"btn-primary mr-1",attrs:{type:"submit",form:"edit-category-form"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.editCategory(e)}}},[t._v("Edit"),r("b-icon",{staticClass:"ml-2",attrs:{icon:"pencil"}})],1),t._v(" "),r("nuxt-link",{attrs:{to:"/admin/categories"}},[r("b-button",{staticClass:"btn-primary"},[t._v("Back")])],1),t._v(" "),1==t.fail?r("b-alert",{staticClass:"mt-3 py-1 px-3",attrs:{show:"",variant:"danger"}},[t._v("Category already exist!")]):t._e(),t._v(" "),1==t.success?r("b-alert",{staticClass:"mt-3 py-1 px-3",attrs:{show:"",variant:"primary"}},[t._v("Success")]):t._e()],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);