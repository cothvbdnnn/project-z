<template>
    <div class="content-admin">
        <h3>Add new product</h3>
         <b-form
            id="add-product-form"
            ref="form"
            @submit.prevent="addProduct"
        >   
            <div class="row my-3">
                <div class="col-12">
                    <b-button class="btn-primary "
                        @click="handleChangeImage"
                    >Image<b-icon class="ml-2" icon="card-image"></b-icon>
                    </b-button>
                    <div class="required-feedback" v-if="!imageProduct">
                        Required
                    </div>
                </div>
            </div>
            <div class="row mb-3" v-if="imageProduct">
                <div class="col-12">
                    <img class="image-preview" alt="image"
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
                        type="number"
                        :state="priceState"
                        onkeydown="return event.keyCode !== 69"
                    ></b-form-input>
                    <b-form-invalid-feedback id="input-live-feedback">
                        Required
                    </b-form-invalid-feedback>
                </div>
                <div class="col-md-6 col-12 mb-2">
                    <h6>Sale Price</h6>
                    <b-form-input class="" placeholder="Sale price"
                        v-model="salePrice"
                        type="number"
                        onkeydown="return event.keyCode !== 69"
                    ></b-form-input>
                </div>
            </div>
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
            <h6>Description</h6>
            <client-only>
                <vue-editor class="mb-3"
                    v-model="description"
                ></vue-editor>
            </client-only>
            <b-button class="btn-primary mr-1" type="submit" form="add-product-form"
                @keyup.enter="addProduct"
            >Add<b-icon class="ml-2" icon="box-seam"></b-icon></b-button>
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
    name: 'AddProduct',
    layout: 'admin',
    head: {
        title: "Add Product - Project Z"
    },
    transition: 'fade',
    data() {
        return {
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
        }
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
    computed: {
        ...mapState({
            getProducts: state => state.Product.products,
            getCategories: state => state.Category.categories,
        }),
        nameState() {
            return this.nameProduct.length > 0 ? true : false
        },
        priceState() {
            return this.regularPrice > 0 ? true : false
        },
    },
    methods: {
        ...mapActions({
            'actAddProduct' : 'Product/actAddProduct'
        }),
        onFileChange(e){
            if(e != null){
                this.imagePreview = window.URL.createObjectURL(e.target.files[0]);
            }
        },
        handleChangeImage(){
            this.$refs.changeImage.$el.querySelector('input[type=file]').click()
        },
        addProduct(){

            // Map array

            let findProduct = this.getProducts.map(x => {
                return x.name.toLowerCase()
            })

            // Check product has esixt

            if(this.nameState && this.priceState && this.imageProduct != null){
                if (!findProduct.includes(this.nameProduct.toLowerCase())) {
                    this.actAddProduct({
                        name: this.nameProduct, 
                        regularPrice: this.regularPrice,
                        salePrice: this.salePrice,
                        quantity: this.quantity,
                        description: this.description,
                        image: this.imageProduct,
                        category: this.selectCat, 
                    })
                    this.$refs.form.reset()
                    this.success = true
                }else{
                    this.fail = true
                }
            }
            
        }
    }
}
</script>

<style>

</style>