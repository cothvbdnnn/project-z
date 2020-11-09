(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{485:function(e,t,r){"use strict";r.r(t);r(13),r(81),r(12),r(10),r(101),r(30),r(31),r(15),r(16),r(14),r(35),r(119),r(80),r(11),r(87),r(62),r(458);var c=r(3),n=r(61);function o(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(t){Object(c.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var d={name:"AddProduct",layout:"admin",head:{title:"Add Product - Project Z"},transition:"fade",data:function(){return{nameProduct:"",regularPrice:0,salePrice:0,quantity:0,description:"",selectCat:null,success:!1,fail:!1,imageProduct:null,imagePreview:null}},watch:{success:function(){var e=this;setTimeout((function(){e.success=!1}),2e3)},fail:function(){var e=this;setTimeout((function(){e.fail=!1}),2e3)}},computed:l(l({},Object(n.c)({getProducts:function(e){return e.Product.products},getCategories:function(e){return e.Category.categories}})),{},{nameState:function(){return this.nameProduct.length>0},priceState:function(){return this.regularPrice>0}}),methods:l(l({},Object(n.b)({actAddProduct:"Product/actAddProduct"})),{},{onFileChange:function(e){null!=e&&(this.imagePreview=window.URL.createObjectURL(e.target.files[0]))},handleChangeImage:function(){this.$refs.changeImage.$el.querySelector("input[type=file]").click()},addProduct:function(){var e=this.getProducts.map((function(e){return e.name.toLowerCase()}));this.nameState&&this.priceState&&null!=this.imageProduct&&(e.includes(this.nameProduct.toLowerCase())?this.fail=!0:(this.actAddProduct({name:this.nameProduct,regularPrice:this.regularPrice,salePrice:this.salePrice,quantity:this.quantity,description:this.description,image:this.imageProduct,category:this.selectCat}),this.$refs.form.reset(),this.success=!0))}})},m=r(49),component=Object(m.a)(d,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"content-admin"},[r("h3",[e._v("Add new product")]),e._v(" "),r("b-form",{ref:"form",attrs:{id:"add-product-form"},on:{submit:function(t){return t.preventDefault(),e.addProduct(t)}}},[r("div",{staticClass:"row my-3"},[r("div",{staticClass:"col-12"},[r("b-button",{staticClass:"btn-primary ",on:{click:e.handleChangeImage}},[e._v("Image"),r("b-icon",{staticClass:"ml-2",attrs:{icon:"card-image"}})],1),e._v(" "),e.imageProduct?e._e():r("div",{staticClass:"required-feedback"},[e._v("\n                    Required\n                ")])],1)]),e._v(" "),e.imageProduct?r("div",{staticClass:"row mb-3"},[r("div",{staticClass:"col-12"},[r("img",{staticClass:"image-preview",attrs:{alt:"image",src:e.imagePreview}})])]):e._e(),e._v(" "),r("b-form-file",{ref:"changeImage",staticClass:"d-none",attrs:{type:"file",accept:"image/*"},on:{change:e.onFileChange},model:{value:e.imageProduct,callback:function(t){e.imageProduct=t},expression:"imageProduct"}}),e._v(" "),r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-6 col-12 mb-2"},[r("h6",[e._v("Name")]),e._v(" "),r("b-form-input",{attrs:{placeholder:"Name",state:e.nameState},model:{value:e.nameProduct,callback:function(t){e.nameProduct=t},expression:"nameProduct"}}),e._v(" "),r("b-form-invalid-feedback",{attrs:{id:"input-live-feedback"}},[e._v("\n                    Required\n                ")])],1),e._v(" "),r("div",{staticClass:"col-md-6 col-12 mb-2"},[r("h6",[e._v("Quantity")]),e._v(" "),r("b-form-input",{attrs:{placeholder:"Quantity",type:"number",onkeydown:"return event.keyCode !== 69"},model:{value:e.quantity,callback:function(t){e.quantity=t},expression:"quantity"}})],1)]),e._v(" "),r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-6 col-12 mb-2"},[r("h6",[e._v("Regular Price")]),e._v(" "),r("b-form-input",{attrs:{placeholder:"Regular price",type:"number",state:e.priceState,onkeydown:"return event.keyCode !== 69"},model:{value:e.regularPrice,callback:function(t){e.regularPrice=t},expression:"regularPrice"}}),e._v(" "),r("b-form-invalid-feedback",{attrs:{id:"input-live-feedback"}},[e._v("\n                    Required\n                ")])],1),e._v(" "),r("div",{staticClass:"col-md-6 col-12 mb-2"},[r("h6",[e._v("Sale Price")]),e._v(" "),r("b-form-input",{attrs:{placeholder:"Sale price",type:"number",onkeydown:"return event.keyCode !== 69"},model:{value:e.salePrice,callback:function(t){e.salePrice=t},expression:"salePrice"}})],1)]),e._v(" "),r("h6",[e._v("Category")]),e._v(" "),r("b-form-select",{staticClass:"mb-2",model:{value:e.selectCat,callback:function(t){e.selectCat=t},expression:"selectCat"}},[r("b-form-select-option",{attrs:{value:null}},[e._v("Please select a category")]),e._v(" "),e._l(e.getCategories,(function(t,i){return r("b-form-select-option",{key:i,attrs:{value:{id:t.id,name:t.name}}},[e._v("\n                "+e._s(t.name)+"\n            ")])}))],2),e._v(" "),r("h6",[e._v("Description")]),e._v(" "),r("b-form-textarea",{staticClass:"mb-3",attrs:{placeholder:"Description"},model:{value:e.description,callback:function(t){e.description=t},expression:"description"}}),e._v(" "),r("b-button",{staticClass:"btn-primary mr-1",attrs:{type:"submit",form:"add-product-form"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.addProduct(t)}}},[e._v("Add"),r("b-icon",{staticClass:"ml-2",attrs:{icon:"box-seam"}})],1),e._v(" "),r("nuxt-link",{attrs:{to:"/admin/products"}},[r("b-button",{staticClass:"btn-primary"},[e._v("Back")])],1),e._v(" "),1==e.fail?r("b-alert",{staticClass:"mt-3 py-1 px-3",attrs:{show:"",variant:"danger"}},[e._v("Product already exist!")]):e._e(),e._v(" "),1==e.success?r("b-alert",{staticClass:"mt-3 py-1 px-3",attrs:{show:"",variant:"primary"}},[e._v("Success")]):e._e()],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);