<template>
    <div class="product">
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-12">
                    <b-img
                        :src="imageProduct"
                    >
                    </b-img>
                </div>
                <div class="col-md-6 col-12">  
                    <h1>{{ nameProduct }}</h1>     
                    <h5>SKU: {{ this.$route.fullPath.split('?id=')[1] }}</h5>    
                    <h5>Category: {{ categoryName }}</h5>   
                    <h5 v-if="quantity > 0">Quantity: {{ quantity }}</h5>
                    <h5 v-if="quantity == 0">Out of stock</h5> 
                    <h3>Price: {{ regularPrice }}</h3>
                    <p>{{ description }}</p>
                    <b-button size="lg" class="btn-primary"
                        @click="addToCart"
                        :disabled="quantity == 0"
                    >Add to cart</b-button>
                    <b-alert show variant="danger" class="mt-3 py-1 px-3"
                        v-if="fail == true"
                    >Your cart is full!</b-alert>
                    <b-alert show variant="primary" class="mt-3 py-1 px-3"
                        v-if="success == true"
                    >Success</b-alert>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    name: 'Product',
    head: {
        title: "Product - Project Z"
    },
    transition: 'fade',
    data() {
        return {
            id: '',
            nameProduct: '',
            regularPrice: '',
            salePrice: '',
            quantity: '',
            description: '',
            imageProduct: null,
            categoryName: '',
            categoryId: '',
            arrCart: [],
            success: false,
            fail: false,
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            this.arrCart = JSON.parse(localStorage.getItem('cart') || '[]');
        }
        if (this.productCurrent) {
            this.nameProduct = this.productCurrent.name
            this.regularPrice = this.productCurrent.regularPrice
            this.salePrice = this.productCurrent.salePrice
            this.quantity = this.productCurrent.quantity
            this.description = this.productCurrent.description
            this.categoryId = this.productCurrent.categoryId
            this.categoryName = this.productCurrent.categoryName
            this.imageProduct = this.productCurrent.image
            this.id = this.productCurrent.id
        }
    },
    watch: {
        arrCart(){
            localStorage.setItem('cart', JSON.stringify(this.arrCart));
        },
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
        }),
        productCurrent(){
            return this.getProducts.find( x => {
                return x.id == this.$route.fullPath.split('?id=')[1]
            })
        },
    },
    methods: {
        addToCart(){
            
            let mapIdCart = this.arrCart.map(x => {
                return x.id
            })
            
            if(!mapIdCart.includes(this.id)){
                this.arrCart.push({
                    nameProduct: this.nameProduct,
                    regularPrice: this.regularPrice,
                    salePrice: this.salePrice,
                    quantity: 1,
                    imageProduct: this.imageProduct,
                    categoryName: this.categoryName,
                    categoryId: this.categoryId,
                    id: this.id,
                    quantityProduct: this.quantity
                })
                this.success = true
            }else{
                for(let i in this.arrCart){
                    if(this.arrCart[i].id == this.id){
                        if(this.arrCart[i].quantity < this.quantity){
                            this.arrCart[i].quantity += 1
                            localStorage.setItem('cart', JSON.stringify(this.arrCart));
                            this.success = true
                        }else{
                            this.fail = true
                        }
                    }
                }
            }
        }
    },
}
</script>