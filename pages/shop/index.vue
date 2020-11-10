<template>
    <div class="shop">
        <div class="container">
            <h1>Menu</h1>
            <div class="row">
                <div class="col-md-3 col-12">

                </div>
                <div class="col-md-9 col-12">
                    <div class="row">
                        <div class="col-md-4 col-sm-6 col-12 item-product"
                            v-for="(product,i) in getProduct"
                            :key="i"
                        >   
                            <div class="container-item">
                                <nuxt-link :to="/shop/+ product.name + '?id=' + product.id | fomartLink">
                                    <b-img
                                        :src="product.image"
                                    >
                                    </b-img>
                                </nuxt-link>
                                <div class="content">
                                    <nuxt-link :to="/shop/+ product.name + '?id=' + product.id | fomartLink">
                                        <h5 class="mt-2"><strong>{{ product.name }}</strong></h5>
                                    </nuxt-link>
                                    <h5 v-if="product.salePrice == 0"><strong>{{ product.regularPrice }}</strong></h5>
                                    <h5 v-if="product.salePrice != 0"><strong>{{ product.salePrice }}</strong></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    name: 'Shop',
    head: {
        title: "Shop - Project Z"
    },
    transition: 'fade',
    data() {
        return {
            
        }
    },
    filters: {
        fomartLink: function (text) {
            return text.split(' ').join('-').toLowerCase()
        }
    },
    computed: {
        ...mapState({
            getProduct: state => state.Product.products,
        }),
    },
}
</script>

<style lang="scss">
    .shop{
        .item-product{
            margin-bottom: 30px;
            .container-item{
                border-radius: 10px;
                overflow: hidden;
                border: 1px solid #dadada;
                height: 100%;
                img{
                    height: 250px;
                    width: 100%;
                    object-fit: cover;
                }
                .content{
                    padding: 5px 15px 15px;
                }
            }   
        }
    }
</style>