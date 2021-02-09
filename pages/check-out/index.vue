<template>
    <div class="checkout">
        <div class="container">
            <h1>Check Out</h1>
            <div class="container-checkout row mt-3">
                <div class="col-md-8 col-12">
                    <b-form
                        id="order-form"
                        ref="form"
                        @submit.prevent="order"
                    > 
                    <div class="form-checkout">
                        <div class="row">
                            <div class="col-md-6 col-12 mb-2">
                                <h6>Name</h6>
                                <b-form-input class="" placeholder="Name"
                                    v-model="name"
                                    :state="nameState"
                                    trim
                                ></b-form-input>
                                <b-form-invalid-feedback id="input-live-feedback">
                                    Required
                                </b-form-invalid-feedback>
                            </div>
                            <div class="col-md-6 col-12 mb-2">
                                <h6>Phone</h6>
                                <b-form-input class="" placeholder="Phone"
                                    v-model="phone"
                                    :state="phoneState"
                                    type="number"
                                    trim
                                    onkeydown="return event.keyCode !== 69"
                                ></b-form-input>
                                <b-form-invalid-feedback id="input-live-feedback">
                                    Required
                                </b-form-invalid-feedback>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-12 mb-2">
                                <h6>Email</h6>
                                <b-form-input class="" placeholder="Email"
                                    v-model="email"
                                    type="email"
                                    trim
                                ></b-form-input>
                            </div>
                        </div>
                        <h6>Address</h6>
                        <b-form-textarea class="mb-2" v-model="address"
                            placeholder="Address"
                            :state="addressState"
                            trim
                        ></b-form-textarea>
                        <b-form-invalid-feedback id="input-live-feedback">
                            Required
                        </b-form-invalid-feedback>
                        <h6>Order notes</h6>
                        <b-form-textarea class="mb-3"
                            placeholder="Order notes"
                            v-model="notes"
                        >
                        </b-form-textarea>
                    </div>
                    <b-button class="btn-primary mr-1" type="submit" form="order-form"
                        @keyup.enter="order"
                    >Order</b-button>
                    <b-alert show variant="danger" class="mt-3 py-1 px-3"
                        v-if="fail == true"
                    >Error!</b-alert>
                    <b-alert show variant="primary" class="mt-3 py-1 px-3"
                        v-if="success == true"
                    >Success</b-alert>
                    </b-form>
                </div>
                <div class="cart-checkout col-md-4 col-12">
                    <div class="row mb-3">
                        <div class="col-md-6 col-12">
                            <h6>Cart ({{ arrCart.length }})</h6>
                        </div>
                        <div class="col-md-6 col-12 text-right">
                            <nuxt-link to="/cart"><strong>Edit</strong></nuxt-link>
                        </div> 
                    </div>
                    <div class="row mb-3"
                        v-for="(cart,i) in arrCart"
                        :key="i"
                    >
                        <div class="col-md-8 col-12">
                            <h6><span>{{cart.quantity}} x </span>{{ cart.nameProduct }}</h6>
                        </div>
                        <div class="col-md-4 col-12 text-right">  
                            <h6 v-if="cart.salePrice == 0">{{ cart.regularPrice * cart.quantity | filterPrice}}</h6>
                            <h6 v-if="cart.salePrice != 0">{{ cart.salePrice * cart.quantity | filterPrice}}</h6>
                        </div>
                    </div>
                    <h6>Total: {{ totalPrice | filterPrice}}</h6>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapActions, mapState, mapMutations } from 'vuex'

export default {
    name: 'Checkout',
    head: {
        title: "Checkout - Project Z"
    },
    transition: 'fade',
    data() {
        return {
            arrCart: [],
            name: '',
            email: '',
            phone: '',
            address: '',
            notes: '',
            success: false,
            fail: false,
        }
    },
    created() {
        if (this.getCart) {
            this.arrCart = this.getCart
        }
        if(this.getUser){
            this.name = this.getUser.userHandle
            this.imagePreview = this.getUser.imageURL
            this.email = this.getUser.email
            this.phone = this.getUser.phone
            this.address = this.getUser.address
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
    },
    filters: {
        filterPrice(price) {
            return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + 'VND';
        }
    },
    computed: {
        ...mapState({
            getUser: state => state.userCurrent,
            getCart: state => state.Cart.cart,
        }),
        nameState() {
            return this.name.length > 0 ? true : false
        },
        phoneState() {
            return this.phone.length > 9 ? true : false
        },
        addressState() {
            return this.address.length > 30 ? true : false
        },
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
    },
    methods: {
        ...mapActions({
            'actAddOrder': 'Order/actAddOrder',
            'actMomoPayment': 'Order/actMomoPayment'
        }),
        ...mapMutations({
            'clearCart' : 'Cart/clearCart',
        }),
        order(){
            this.actMomoPayment()
            // if(this.nameState && this.phoneState && this.addressState){
            //     this.actAddOrder({
            //         name: this.name,
            //         userId: this.getUser.userId,
            //         email: this.email,
            //         phone: this.phone,
            //         address: this.address,
            //         notes: this.notes,
            //         order: this.arrCart,
            //         total: this.totalPrice,
            //     })
            //     this.clearCart()
            //     this.success = true
            // }
        }
    },
}
</script>

<style lang="scss">

.checkout{
    .container-checkout{
        .form-checkout{
            padding-top: 20px;
        }
        .cart-checkout{
            padding-top: 20px;
        }
    }
}

</style>