<template>
    <div class="content-admin">
        <h3>Edit product {{ nameProduct }}</h3>
         <b-form
            id="edit-product-form"
            ref="form"
            @submit.prevent="editProduct"
        >
            <div class="row my-3">
                <div class="col-12">
                    <b-button class="btn-primary "
                        @click="handleChangeImage"
                    >Image<b-icon class="ml-2" icon="card-image"></b-icon>
                    </b-button>
                </div>
            </div>
            <div class="row mb-3" >
                <div class="col-12">
                    <img class="image-preview" alt="image" v-if="imagePreview"
                        :src="imagePreview"
                    >
                </div>
            </div>
            <b-form-file
                v-model="imageProduct"
                @change="onFileChange"
                class="d-none"
                type="file"
                accept="image/*"
                ref="changeImage"
            ></b-form-file>
            <div class="row">
                <div class="col-md-6 col-12 mb-2">
                    <h6>Name</h6>
                    <b-form-input class="" placeholder="Name"
                        v-model="nameProduct"
                        :state="nameState"
                    ></b-form-input>
                    <b-form-invalid-feedback id="input-live-feedback">
                        Required
                    </b-form-invalid-feedback>
                </div>
                <div class="col-md-6 col-12 mb-2">
                    <h6>Quantity</h6>
                    <b-form-input class="" placeholder="Quantity"
                        v-model="quantity"
                        type="number"
                        onkeydown="return event.keyCode !== 69"
                    ></b-form-input>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-12 mb-2">
                    <h6>Regular Price</h6>
                    <b-form-input class="" placeholder="Regular price"
                        v-model="regularPrice"
                        :state="priceState"
                        type="number"
                        onkeydown="return event.keyCode !== 69"
                    ></b-form-input>
                    <b-form-invalid-feedback id="input-live-feedback">
                        Required
                    </b-form-invalid-feedback>
                </div>
                <div class="col-md-6 col-12">
                    <h6>Sale Price</h6>
                    <b-form-input class="" placeholder="Sale price"
                        v-model="salePrice"
                        type="number"
                        onkeydown="return event.keyCode !== 69"
                    ></b-form-input>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-12">
                    <h6>Category</h6>
                    <b-form-select class="mb-2"
                        v-model="selectCat" 
                    >
                        <b-form-select-option :value="null">Please select a category</b-form-select-option>
                        <b-form-select-option v-for="(cat, i) in getCategories" :key="i" 
                            :value="{id: cat.id, name: cat.name}"
                        >
                            {{ cat.name }}
                        </b-form-select-option>
                    </b-form-select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-12">
                    <h6>Description</h6>
                    <client-only>
                        <vue-editor class="mb-3"
                            v-model="description"
                        ></vue-editor>
                    </client-only>
                </div>
            </div>
            <b-button class="btn-primary mr-1" type="submit" form="edit-product-form"
                @keyup.enter="editProduct"
            >Edit<b-icon class="ml-2" icon="pencil"></b-icon></b-button>
            <nuxt-link class="mr-1" target="_blank" :to="/menu/+ nameProduct + '?id=' + idProduct | fomartLink">
                <b-button class="btn-primary">
                    View <b-icon icon="eye"></b-icon>
                </b-button>
            </nuxt-link>
            <nuxt-link to="/admin/products">
                <b-button class="btn-primary"
                >Back</b-button>
            </nuxt-link>
            <b-alert show variant="danger" class="mt-3 py-1 px-3"
                v-if="fail == true"
            >Product already exist!</b-alert>
            <b-alert show variant="primary" class="mt-3 py-1 px-3"
                v-if="success == true"
            >Success</b-alert>
        </b-form>
    </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
    name: 'EditProduct',
    layout: 'admin',
    head: {
        title: "Edit Product - Project Z"
    },
    transition: 'fade',
    validate(context){
        if(!/^\d+$/.test(context.params.productId)){
            context.redirect('/admin/products')
        }
        return true
    },
    data() {
        return {
            idProduct: '',
            nameProduct: '',
            regularPrice: 0,
            salePrice: 0,
            quantity: 0,
            description: '',
            selectCat: null,
            success: false,
            fail: false,
            imageProduct: null,
            imagePreview: null,
            imageOld: null,
        }
    },
    filters: {
        fomartLink(text) {
            return text.split(' ').join('-').toLowerCase()
        },
    },
    watch: {
        success(){
            setTimeout(() => {
                this.success = false
            }, 2000);
        },
        fail(){
            setTimeout(() => {
                this.fail = false
            }, 2000);
        }
    },
    created() {
        if (this.productCurrent) {
            this.idProduct = this.productCurrent.id
            this.nameProduct = this.productCurrent.name
            this.regularPrice = this.productCurrent.regularPrice
            this.salePrice = this.productCurrent.salePrice
            this.quantity = this.productCurrent.quantity
            this.description = this.productCurrent.description
            this.selectCat = {
                id: this.productCurrent.categoryId,
                name: this.productCurrent.categoryName,
            }
            this.imagePreview = this.productCurrent.image
            this.imageOld = this.productCurrent.image
        }
    },
    computed: {
        ...mapState({
            getProducts: state => state.Product.products,
            getCategories: state => state.Category.categories,
        }),
        productCurrent(){
            return this.getProducts[this.$route.params.productId]
        },
        nameState() {
            return this.nameProduct.length > 0 ? true : false
        },
        priceState() {
            return this.regularPrice > 0 ? true : false
        },
    },
    methods: {
        ...mapActions({
            'actEditProduct' : 'Product/actEditProduct'
        }),
        onFileChange(e){
            if(e != null){
                this.imagePreview = window.URL.createObjectURL(e.target.files[0]);
            }
        },
        handleChangeImage(){
            this.$refs.changeImage.$el.querySelector('input[type=file]').click()
        },
        editProduct(){

            // Map array

            let findProduct = this.getProducts.map(x => {
                return x.name.toLowerCase()
            })

            // Check product esixt

            if(this.nameState && this.priceState ){
                if(this.nameProduct != this.productCurrent.name){
                    if (!findProduct.includes(this.nameProduct.toLowerCase())) {
                        this.actEditProduct({
                            name: this.nameProduct.replace(/[^a-zA-Z ]/g,'').replace(/  +/g, ' '), 
                            regularPrice: this.regularPrice,
                            salePrice: this.salePrice,
                            quantity: this.quantity,
                            description: this.description,
                            image: this.imageProduct,
                            imageOld: this.imageOld,
                            category: this.selectCat,
                            id: this.productCurrent.id,
                            index: this.$route.params.productId
                        })
                        this.success = true
                    }else{
                        this.fail = true
                    }
                }else{
                    this.actEditProduct({
                        name: this.nameProduct.replace(/[^a-zA-Z ]/g,'').replace(/  +/g, ' '), 
                        regularPrice: this.regularPrice,
                        salePrice: this.salePrice,
                        quantity: this.quantity,
                        description: this.description,
                        image: this.imageProduct,
                        imageOld: this.imageOld,
                        category: this.selectCat,
                        id: this.productCurrent.id,
                        index: this.$route.params.productId,
                    })
                    this.success = true
                }
            }
            
        }
    }
}
</script>

<style>

</style>