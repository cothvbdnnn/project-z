<template>
    <div class="shop">
        <div class="container">
            <div class="row">
                <div class="col-12 col-cat mb-3">
                    <h1 class="text-primary">Compare</h1>
                </div>
                <div class="col-md-12 col-12">
                    <div class="row">
                        <div class="col-md-4 col-sm-6 col-12 item-product"
                            v-for="(product,i) in getCompare"
                            :key="i"
                        >   
                            <div class="container-item">
                                <nuxt-link :to="/menu/+ product.nameProduct + '?id=' + product.id | fomartLink">
                                    <b-img
                                        :src="product.imageProduct"
                                    >
                                    </b-img>
                                </nuxt-link>
                                <div class="content">
                                    <nuxt-link :to="/menu/+ product.nameProduct + '?id=' + product.id | fomartLink">
                                        <h5 class="mt-2"><strong>{{ product.nameProduct }}</strong></h5>
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
    name: 'Compare',
    head: {
        title: "Compare - Project Z"
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
            getCompare: state => state.Compare.compare,
        }),
    },
}
</script>

<style lang="scss">
    .shop{
        .col-cat{
            .catItem{
                font-size: 20px;
                font-weight: 600;
                position: relative;
                &:hover:before{
                    content: '';
                    height: 2px;
                    width: 15px;
                    background: #3c5e2c;
                    position: absolute;
                    top: 50%;
                    left: -25px;
                    transform: translateY(-50%);
                    opacity: 1;
                }
            }
        }
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