<template>
    <div class="cart">
        <div class="container" v-if="arrCart.length > 0">
            <h1>Cart<span>({{ totalQuantity }})</span></h1>
            <div class="row mt-3">
                <div class="col-md-8 col-12 image-cart">
                    <div class="row mb-3"
                        v-for="(cart,i) in arrCart"
                        :key="i"
                    >
                        <div class="col-md-3 col-12">
                            <b-img
                                :src="cart.imageProduct"
                            >
                            </b-img>
                        </div>
                        <div class="col-md-9 col-12">  
                            <h5>{{ cart.nameProduct }}</h5>       
                            <b-input-group class="quantity my-2">
                                <b-input-group-prepend>
                                    <b-btn size="sm" class="btn-primary"
                                        @click="handleMinusQuantity(i)"
                                        :disabled="cart.quantity == 1"
                                    >-</b-btn>
                                </b-input-group-prepend>
                                <b-form-input size="sm" type="number" disabled 
                                    :value="cart.quantity"
                                >
                                </b-form-input>
                                <b-input-group-append>
                                    <b-btn size="sm" class="btn-primary" :id="'btn-plus-' + i"
                                        @click="handlePlusQuantity(i)"
                                        :disabled="cart.quantity == cart.quantityProduct"
                                    >+</b-btn>
                                </b-input-group-append>
                            </b-input-group>   
                            <h6>Price: 
                                <span :class="cart.salePrice != 0 ? 'line-through' : null">{{ cart.regularPrice | filterPrice}}</span>
                                <span v-if="cart.salePrice != 0">{{ cart.salePrice | filterPrice}}</span>
                            </h6>
                            <h6 v-if="cart.salePrice == 0">Total price: {{ cart.regularPrice * cart.quantity | filterPrice}}</h6>
                            <h6 v-if="cart.salePrice != 0">Total price: {{ cart.salePrice * cart.quantity | filterPrice}}</h6>
                            <b-button class="mr-1 btn-remove" size="sm"
                                @click="handleRemoveCart(i)"
                            >
                                <b-icon icon="x-square-fill"></b-icon>
                            </b-button>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-12">
                    <h6>Total: {{ totalPrice | filterPrice}}</h6>
                    <nuxt-link to="/check-out">
                        <b-button class="btn-primary"
                        >Check Out</b-button>
                    </nuxt-link>
                </div>
            </div>
        </div>
        <div class="container text-center my-5" v-if="arrCart.length == 0">
            <h1 class="">Cart</h1>
            <h5 class="mt-0">Your cart is empty</h5>
            <nuxt-link to="/menu">
                <b-btn class="btn-primary mt-2">
                    Return to menu
                </b-btn>
            </nuxt-link>
        </div>
    </div>
</template>

<script>

import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    name: 'Cart',
    head: {
        title: "Cart - Project Z"
    },
    transition: 'fade',
    data() {
        return {
            arrCart: [],
        }
    },
    created() {
        if (this.getCart) {
            this.arrCart = this.getCart
        }
    },
    filters: {
        filterPrice(price) {
            return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + 'VND';
        }
    },
    computed: {
        ...mapState({
            getProducts: state => state.Product.products,
            getCart: state => state.Cart.cart,
        }),
        totalPrice(){

            let arrPrice = []
            
            for(let i in this.arrCart){
                if(this.arrCart[i].salePrice != 0){
                    arrPrice.push(this.arrCart[i].salePrice * this.arrCart[i].quantity)
                }else{
                    arrPrice.push(this.arrCart[i].regularPrice * this.arrCart[i].quantity)
                }
            }

            return arrPrice.reduce((a,b) => {
                return a + b
            }, 0)
        },
        totalQuantity(){
            let mapCart = this.arrCart.map((a) => {
                return a.quantity
            })
            return mapCart.reduce((a,b) => {
                return a + b
            }, 0)
        }
    },
    methods: {
        ...mapMutations({
            'removeCart' : 'Cart/removeCart',
            'minusQuantity': 'Cart/minusQuantity',
            'plusQuantity': 'Cart/plusQuantity',
        }),
        handleRemoveCart(index){
            this.removeCart(index)
        },
        handleMinusQuantity(index){
            this.minusQuantity(index)
        },
        handlePlusQuantity(index){
            this.plusQuantity(index)
        }
    },
}
</script>

<style lang="scss">

.cart{
    h1{
        span{
            font-size: 26px;
        }
    }
    .image-cart{
        img{
            width: 150px;
            height: 150px;
            object-fit: cover;
        }
    }
}
    
</style>