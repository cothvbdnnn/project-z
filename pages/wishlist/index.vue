<template>
    <div class="shop">
        <div class="container">
            <div class="row">
                <div class="col-12 col-cat mb-3">
                    <h1 class="text-primary">WishList</h1>
                </div>
                <div class="col-12">
                    <div v-if="filterWishList.length > 0" class="row">
                        <div class="col-md-3 col-sm-6 col-12 item-product"
                            v-for="(product,i) in filterWishList"
                            :key="i"
                        >   
                            <div class="container-item">
                                <nuxt-link :to="/menu/+ product.postName + '?id=' + product.postId | fomartLink">
                                    <b-img
                                        :src="product.postImage"
                                    >
                                    </b-img>
                                </nuxt-link>
                                <div class="content">
                                    <nuxt-link :to="/menu/+ product.postName + '?id=' + product.postId | fomartLink">
                                        <h5 class="mt-2"><strong>{{ product.postName }}</strong></h5>
                                    </nuxt-link>    
                                    <h5>
                                        <span :class="product.salePrice != 0 ? 'line-through' : null"><strong>{{ product.regularPrice | filterPrice }}</strong></span>
                                        <span v-if="product.salePrice != 0"><strong>{{ product.salePrice | filterPrice}}</strong></span>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="filterWishList.length == 0">
                        <h5>You don't have any wish lists yet</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    name: 'WishList',
    head: {
        title: "WishList - Project Z"
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
            getWishLists: state => state.WishList.wishlists,
            getUserCurrent: state => state.userCurrent,
        }),
        filterWishList(){
            return this.getWishLists.filter( x => {
                return x.userId == this.getUserCurrent.userId
            })
        }
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