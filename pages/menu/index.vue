<template>
    <div class="shop">
        <div class="container">
            <div class="row">
                <div class="col-md-3 col-12 col-cat">
                    <div v-for="(cat,i) in getCaregories" :key="i">
                        <h6><a class="catItem">{{ cat.name }}</a></h6>
                    </div>
                </div>
                <div class="col-md-9 col-12">
                    <div class="row">
                        <div class="col-md-4 col-sm-6 col-12 item-product"
                            v-for="(product,i) in productPagination"
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
                                    <!-- <client-only>
                                        <StarsRatings inactive-color="#ccc" active-color="#3c5e2c"
                                            :rounded-corners="true"
                                            :rating="product.rating"
                                            :star-size="10"
                                            :increment="0.1"
                                            :read-only="true"
                                            :show-rating="false"
                                            :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
                                        ></StarsRatings>
                                    </client-only> -->
                                    <h5>
                                        <span :class="product.salePrice != 0 ? 'line-through' : null"><strong>{{ product.regularPrice | filterPrice }}</strong></span>
                                        <span v-if="product.salePrice != 0"><strong>{{ product.salePrice | filterPrice}}</strong></span>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <b-pagination
                            v-model="currentPage"
                            :total-rows="rowsPagination"
                            :per-page="perPage"
                        ></b-pagination>
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
            perPage: 1,
            productsPerPage: 9,
            currentPage: 1
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
            getCaregories: state => state.Category.categories,
        }),
        productPagination(){
            return this.getProducts.slice(this.productsPerPage * (this.currentPage - 1), this.productsPerPage *(this.currentPage))
        },
        rowsPagination(){
            return Math.ceil(this.getProducts.length/this.productsPerPage)
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