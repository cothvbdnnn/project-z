<template>
    <div class="cart">
        <div class="container" v-if="arrCart.length > 0">
            <h1>Cart <span>({{ arrCart.length }})</span></h1>
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
                                        @click="minusQuantity(i)"
                                        :disabled="cart.quantity == 1"
                                    >-</b-btn>
                                </b-input-group-prepend>
                                <b-form-input size="sm" type="number" disabled 
                                    :value="cart.quantity"
                                >
                                </b-form-input>
                                <b-input-group-append>
                                    <b-btn size="sm" class="btn-primary" :id="'btn-plus-' + i"
                                        @click="plusQuantity(i)"
                                        :disabled="cart.quantity == cart.quantityProduct"
                                    >+</b-btn>
                                </b-input-group-append>
                            </b-input-group>   
                            <h6>Price: {{ cart.regularPrice * cart.quantity }}</h6>
                            <b-button class="mr-1 btn-remove" size="sm"
                                @click="removeCart(i)"
                            >
                                <b-icon icon="trash"></b-icon>
                            </b-button>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-12">
                    <h6>Total: {{ totalPrice }}</h6>
                    <nuxt-link to="/check-out">
                        <b-button class="btn-primary"
                        >Check Out</b-button>
                    </nuxt-link>
                </div>
            </div>
        </div>
        <div class="container text-center" v-if="arrCart.length == 0">
            <h1 class="mb-4">Cart</h1>
            <b-icon icon="cart3" scale="5"></b-icon>
            <h5 class="mt-5">Your cart is empty</h5>
            <nuxt-link to="/shop">
                <b-btn class="btn-primary mt-2">
                    Return to shop<b-icon class="ml-2" icon="shop-window"></b-icon>
                </b-btn>
            </nuxt-link>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'

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
        if (typeof window !== 'undefined') {
            this.arrCart = JSON.parse(localStorage.getItem('cart') || '[]');
        }
    },
    watch: {
        arrCart(){
            localStorage.setItem('cart', JSON.stringify(this.arrCart));
        }
    },
    computed: {
        ...mapState({
            getProducts: state => state.Product.products,
        }),
        totalPrice(){
            let mapCart = this.arrCart.map((a) => {
                return a.regularPrice * a.quantity
            })
            return mapCart.reduce((a,b) => {
                return a + b
            }, 0)
        }
    },
    methods: {
        removeCart(index){
            this.arrCart.splice(index, 1)
        },
        minusQuantity(index){
            this.arrCart[index].quantity -= 1
            localStorage.setItem('cart', JSON.stringify(this.arrCart));
        },
        plusQuantity(index){
            this.arrCart[index].quantity += 1
            localStorage.setItem('cart', JSON.stringify(this.arrCart))
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