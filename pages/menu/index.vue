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
                            v-for="(product,i) in getProducts"
                            :key="i"
                        >   
                            <div class="container-item">
                                <nuxt-link :to="/menu/+ product.name + '?id=' + product.id | fomartLink">
                                    <b-img
                                        :src="product.image"
                                    >
                                    </b-img>
                                </nuxt-link>
                                <div class="content">
                                    <nuxt-link :to="/menu/+ product.name + '?id=' + product.id | fomartLink">
                                        <h5 class="mt-2"><strong>{{ product.name }}</strong></h5>
                                    </nuxt-link>
                                    <h5>
                                        <span :class="product.salePrice != 0 ? 'line-through' : null"><strong>{{ product.regularPrice | filterPrice }}</strong></span>
                                        <span v-if="product.salePrice != 0"><strong>{{ product.salePrice | filterPrice}}</strong></span>
                                    </h5>
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
    name: 'Menu',
    head: {
        title: "Menu - Project Z"
    },
    transition: 'fade',
    data() {
        return {
            
        }
    },
    filters: {
        fomartLink(text) {
            return text.split(' ').join('-').toLowerCase()
        },
        filterPrice(price) {
            return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + 'VND';
        }
    },
    computed: {
        ...mapState({
            getProducts: state => state.Product.products,
        }),
    },
}
</script>

<style lang="scss">
    .shop{
        .item-product{
            margin-bottom: 30px;
            .container-item{
                overflow: hidden;
                border: 1px solid #dadada;
                height: 100%;
                img{
                    height: 200px;
                    width: 100%;
                    object-fit: cover;
                }
                .content{
                    padding: 5px 15px 15px;
                    h5{
                        margin-bottom: 0;
                        font-size: 16px;
                    }
                }
            }   
        }
    }
</style>