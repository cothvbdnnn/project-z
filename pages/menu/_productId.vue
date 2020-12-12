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
                    <h1 class="text-primary">{{ nameProduct }}</h1>        
                    <h5>Category: <nuxt-link :to="'/category/' + categoryName | fomartLink">{{ categoryName }}</nuxt-link></h5>   
                    <h5 v-if="quantity > 0">Quantity: {{ quantity }}</h5>
                    <h5 v-if="quantity == 0">Out of stock</h5> 
                    <h3>Price: 
                        <span :class="salePrice != 0 ? 'line-through' : null">{{ regularPrice | filterPrice }}</span>
                        <span v-if="salePrice != 0">{{ salePrice | filterPrice }}</span>
                    </h3>
                    
                    <div v-html="description"></div>
                    <b-button size="lg" class="btn-primary mb-3"
                        @click="addToCart"
                        :disabled="quantity == 0"
                    >Add to cart</b-button>
                    <CompShare />
                    <b-alert show variant="danger" class="mt-3 py-1 px-3"
                        v-if="fail == true"
                    >Excess quantity!</b-alert>
                    <b-alert show variant="primary" class="mt-3 py-1 px-3"
                        v-if="success == true"
                    >Success</b-alert>
                </div>
                <div class="col-12">
                    <CompReview
                        :idPost="id"
                        :namePost="nameProduct"
                        :imagePost="imageProduct"
                        :userId="userId"
                        :userName="userName"
                        :userImage="userImage"
                    />
                </div>
                <div class="col-12">
                    <CompComments
                        :idPost="id"
                        :namePost="nameProduct"
                        :imagePost="imageProduct"
                        :userId="userId"
                        :userName="userName"
                        :userImage="userImage"
                        :postType="'product'"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    name: 'Product',
    head() {
        return {
            title: this.productCurrent.name + ' - Project Z',
            meta: [
                {
                    hid: this.productCurrent.name + ' - Project Z',
                    name: this.productCurrent.name + ' - Project Z',
                }
            ]
        }
    },
    transition: 'fade',
    async validate(context) {
        const products = await context.store.state.Product.products
        for(let i in products){
           if(products[i].id == context.query.id){
                return true
           }
        }
    },
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
            userId: '',
            userName: '',
            userImage: '',
            success: false,
            fail: false,
        }
    },
    created() {
        if (this.getCart) {
            this.arrCart = this.getCart
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
        if(this.getUserCurrent){
            this.userId = this.getUserCurrent.userId
            this.userName = this.getUserCurrent.userHandle
            this.userImage = this.getUserCurrent.imageURL
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
    filters: {
        filterPrice(price) {
            return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + 'VND';
        },
        fomartLink(text) {
            return text.split(' ').join('-').toLowerCase()
        },
    },
    computed: {
        ...mapState({
            getProducts: state => state.Product.products,
            getCart: state => state.Cart.cart,
            getUserCurrent: state => state.userCurrent,
        }),
        productCurrent(){
            return this.getProducts.find( x => {
                return x.id == this.$route.fullPath.split('?id=')[1]
            })
        },
    },
    methods: {
        ...mapMutations({
            'addCart' : 'Cart/addCart',
            'addQuantityCart' : 'Cart/addQuantityCart'
        }),
        addToCart(){
            let mapIdCart = this.arrCart.map(x => {
                return x.id
            })
            
            if(!mapIdCart.includes(this.id)){
                this.addCart({
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
                            this.addQuantityCart(i)
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
