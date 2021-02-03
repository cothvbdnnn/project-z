<template>
    <div class="compare" :class="show ? 'show' : 'hide'" v-if="getCompare.length > 0 && $route.name != 'compare'">
        <div class="container">
            <div class="container-compare">
                <div class="toggle-compare"
                    @click="show = !show"
                >
                    <b-icon :icon="show ? 'caret-down-fill' : 'caret-up-fill'"></b-icon>
                </div>
                <div class="row">
                    <div class="items-compare col-md-10">
                        <div class="row px-2">
                            <div class="item-product mx-2"
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
                                            <h6 class="mt-2 mb-0 text-overflow"><strong>{{ product.nameProduct }}</strong></h6>
                                        </nuxt-link>
                                        <h6 class="mb-0">
                                            <span :class="product.salePrice != 0 ? 'line-through' : null"><strong>{{ product.regularPrice | filterPrice }}</strong></span>
                                            <span v-if="product.salePrice != 0"><strong>{{ product.salePrice | filterPrice}}</strong></span>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="actions-compare col-md-2 text-center">
                        <nuxt-link to="/compare">
                            <b-btn class="btn-primary mt-3" block>
                                Compare
                            </b-btn>
                        </nuxt-link>
                        <b-btn class="mt-3" block squared 
                            @click="handleClearCompare"
                        >
                            CLEAR
                        </b-btn>
                    </div>
                </div>
            </div>
        </div>  
    </div>
</template>

<script>

import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    data() {
        return {
            show: true,
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
            getCompare: state => state.Compare.compare,
        }),
    },
    methods: {
        ...mapMutations({
            'removeCompare' : 'Compare/removeCompare',
            'clearCompare' : 'Compare/clearCompare'
        }),
        handleRemoveCompare(i){
            this.removeCompare(i)
        },
        handleClearCompare(){
            this.clearCompare()
        }
    }
}
</script>

<style lang="scss">

.compare{
    transition: all 0.25s linear;
    position: fixed;
    width: 100%;
    transform: translateY(0px);
    bottom: 0;
    top: auto;
    z-index: 10;
    &.hide{
        transform: translateY(100%);
        .toggle-compare{
            svg{
                margin-bottom: 3px;
            }
        }
    }
    .container-compare{
        border: 1px solid #3c5e2c;
        border-bottom: none;
        padding: 20px;
        background-color: #fff;
        position: relative;
        .toggle-compare{
            cursor: pointer;
            position: absolute;
            bottom: 100%;
            height: 20px;
            left: 0;
            right: 0;
            margin: auto;
            width: 30px;
            text-align: center;
            border: 1px solid #3c5e2c;
            border-bottom: none;
            background-color: #fff;
            svg{
                color: #3c5e2c;
            }
        }
        .items-compare{
            .row{
                justify-content: flex-start;
                @media screen and ( max-width: 485px ) {
                    justify-content: center;
                }
                .item-product{
                    max-width: 100px;
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
                            max-width: 100px;
                        }
                    }
                }
            }
        }
    }
}

</style>