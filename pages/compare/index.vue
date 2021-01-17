<template>
    <div class="compare-div">
        <div class="container">
            <div class="row">
                <div class="col-12 col-cat mb-3">
                    <h1 class="text-primary">Compare</h1>
                </div>
            </div>
            <div class="container-compare">
                <div class="row">
                    <div class="col-2 col-left">
                    </div>
                    <div class="col-10">
                        <div class="row">
                            <div class="col-3 item-product"
                                v-for="(product,i) in getCompare"
                                :key="i"
                            >   
                                <div class="container-item">
                                    <div class="col-img">
                                        <nuxt-link :to="/menu/+ product.nameProduct + '?id=' + product.id | fomartLink">
                                            <b-img
                                                :src="product.imageProduct"
                                            >
                                            </b-img>
                                        </nuxt-link>
                                        <b-button class="remove-btn" size="sm" squared
                                            @click="handleRemoveCompare(i)"
                                        >
                                            <b-icon icon="x"></b-icon>
                                        </b-button>
                                    </div>
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
                <div class="row">
                    <div class="col-2 col-left">
                        <h5>Category</h5>
                    </div>
                    <div class="col-10">
                        <div class="row">
                            <div class="col-3 item-product"
                                v-for="(product,i) in getCompare"
                                :key="i"
                            >   
                                {{ product.categoryName }}
                            </div>
                        </div> 
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 col-left">
                        <h5>Quantity</h5>
                    </div>
                    <div class="col-10"> 
                        <div class="row">
                            <div class="col-3 item-product"
                                v-for="(product,i) in getCompare"
                                :key="i"
                            >   
                                {{ product.quantityProduct }}
                            </div>
                        </div> 
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 col-left">
                        <h5>Description</h5>
                    </div>
                    <div class="col-10"> 
                        <div class="row">
                            <div class="col-3 item-product"
                                v-for="(product,i) in getCompare"
                                :key="i"
                            >   
                                <span v-html="product.description"></span>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex'

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
    methods: {
        ...mapMutations({
            'removeCompare' : 'Compare/removeCompare'
        }),
        handleRemoveCompare(i){
            this.removeCompare(i)
        },
    }
}
</script>

<style lang="scss">
    .compare-div{
        .container-compare{
            @media screen and ( max-width: 1023px ){
                overflow-x: scroll;   
            }
            .row{
                flex-wrap: nowrap;
                .col-left{
                    min-width: 140px;
                }
            }
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
                min-width: 150px;
                .container-item{
                    overflow: hidden;
                    border: 1px solid #dadada;
                    height: 100%;
                    .col-img{
                        position: relative;
                        .remove-btn{
                            background-color: #3c5e2c;
                            font-size: 18px;
                            position: absolute;
                            top: 0;
                            right: 0;
                            padding: 0 3px;
                            margin-right: 0;
                        }
                        img{
                            height: 150px;
                            width: 100%;
                            object-fit: cover;
                        }
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
        
    }
</style>