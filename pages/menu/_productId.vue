<template>
    <div class="product">
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-12">
                    <div class="col-img">
                        <b-img
                            :src="imageProduct"
                        >
                        </b-img>
                        <div class="img-baged" v-if="newProduct == true">
                            <img src="~/assets/images/label-new.png">
                        </div>
                    </div>
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
                    <div class="row mx-0 mb-3 align-items-center">
                        <b-button size="lg" class="btn-primary"
                            @click="addToCart"
                            :disabled="quantity == 0"
                        >Add to cart</b-button>
                        <div class="ml-4 mr-2 text-primary pointer"
                            @click="toggleWishList"
                        >
                            <b-icon v-if="!checkWishList" scale="2" icon="heart"></b-icon>
                            <b-icon v-if="checkWishList" scale="2" icon="heart-fill"></b-icon>
                        </div>
                        <div class="ml-4 text-primary pointer"
                            @click="handleToggleCompare"
                        >
                            <b-icon v-if="!checkCompare" scale="2" icon="plus-square"></b-icon>
                            <b-icon v-if="checkCompare" scale="2" icon="check-square-fill"></b-icon>
                        </div>
                    </div>
                    <CompShare />
                    <b-alert show variant="danger" class="mt-3 py-1 px-3"
                        v-if="fail"
                    >Excess quantity!</b-alert>
                    <b-alert show variant="primary" class="mt-3 py-1 px-3"
                        v-if="success"
                    >Success</b-alert>
                    <b-alert show variant="primary" class="mt-3 py-1 px-3"
                        v-if="wishList"
                    >Added to <nuxt-link class="text-white" to="/wishlist"><u>wishlists</u></nuxt-link><b-icon class="ml-2" icon="heart-fill"></b-icon></b-alert>
                    <b-alert show variant="danger" class="mt-3 py-1 px-3"
                        v-if="alertWishList"
                    >Login before adding to wishlist</b-alert>
                    <b-alert show variant="danger" class="mt-3 py-1 px-3"
                        v-if="alertCompare"
                    >You can only add up to 4 products to compare</b-alert>
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
                <div class="col-12">
                    <CompRelatedProduct
                        :categoryId="categoryId"
                        :idPost="id"
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
            newProduct: false,
            arrCart: [],
            userId: '',
            userName: '',
            userImage: '',
            success: false,
            fail: false,
            wishList: false,
            alertWishList: false,
            compare: false,
            alertCompare: false,
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
            this.newProduct = this.productCurrent.new
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
        },
        wishList(){
            setTimeout(() => {
                this.wishList = false
            }, 3000);
        },
        alertWishList(){
            setTimeout(() => {
                this.alertWishList = false
            }, 2000);
        },
        alertCompare(){
            setTimeout(() => {
                this.alertCompare = false
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
            getWishLists: state => state.WishList.wishlists,
            getCompare: state => state.Compare.compare,
            getCart: state => state.Cart.cart,
            getUserCurrent: state => state.userCurrent,
        }),
        productCurrent(){
            return this.getProducts.find( x => {
                return x.id == this.$route.fullPath.split('?id=')[1]
            })
        },
        checkWishList(){
            let check = false
            for(let i in this.getWishLists){
                if(this.id == this.getWishLists[i].postId && this.userId == this.getWishLists[i].userId){
                    check = true
                }
            }
            return check
        },
        checkCompare(){
            let check = false
            for(let i in this.getCompare){
                if(this.id == this.getCompare[i].id){
                    check = true
                }
            }
            return check
        }
    },
    methods: {
        ...mapMutations({
            'addCart' : 'Cart/addCart',
            'addQuantityCart' : 'Cart/addQuantityCart',
            'toggleCompare' : 'Compare/toggleCompare'
        }),
        ...mapActions({
            'actToggleWishList' : 'WishList/actToggleWishList',
        }),
        handleToggleCompare(){
            if(this.getCompare.length < 4){
                this.toggleCompare({
                    nameProduct: this.nameProduct,
                    regularPrice: this.regularPrice,
                    salePrice: this.salePrice,
                    imageProduct: this.imageProduct,
                    categoryName: this.categoryName,
                    categoryId: this.categoryId,
                    id: this.id,
                    quantityProduct: this.quantity,
                    description: this.description
                })
            }else{
                this.alertCompare = true
            }
        },
        toggleWishList(){
            if(this.userId != ""){
                this.actToggleWishList({
                    postId: this.id,
                    postName: this.nameProduct,
                    postImage: this.imageProduct,
                    regularPrice: this.regularPrice,
                    salePrice: this.salePrice,
                    userId: this.userId,
                    userName: this.userName,
                    userImage: this.userImage,
                })

                if(!this.checkWishList){
                    this.wishList = true
                }
            }else{
                this.alertWishList = true
            }
            
        },
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

<style lang="scss">
    .col-img{
        position: relative;
        .img-baged{
            position: absolute;
            top: 0;
            right: 0;
            img{
                width: 100px;
                height: 100px;
            }
        }
    }
</style>