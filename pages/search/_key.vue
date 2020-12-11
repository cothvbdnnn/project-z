<template>
    <div class="shop">
        <div class="container">
            <div class="row">
                <div class="col-12 col-cat">
                    <h2 class="text-primary"><strong>{{ filterProducts.length + filterPosts.length }}<span> result<span v-if="filterProducts.length + filterPosts.length > 1">s</span></span></strong></h2>
                </div>
                <div>
                    <b-tabs pills card>
                        <b-tab title="Products" active>
                            <div class="row" v-if="filterProducts.length > 0">
                                <div class="col-md-4 col-sm-6 col-12 item-product"
                                    v-for="(product,i) in filterProducts"
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
                            <div v-if="filterProducts.length == 0">
                                <h3 class="text-primary">No result</h3>
                            </div>
                        </b-tab>
                        <b-tab title="Posts">
                            <div class="row" v-if="filterPosts.length > 0">
                                <div class="col-md-12 col-sm-12 col-12 item-blog mb-5"
                                    v-for="(post,i) in filterPosts"
                                    :key="i"
                                >   
                                    <div class="container-item">
                                        <div class="row">
                                            <div class="col-md-6 col-12">
                                                <nuxt-link :to="/blog/+ post.title + '?id=' + post.id | fomartLink">
                                                    <b-img
                                                        :src="post.image"
                                                    >
                                                    </b-img>
                                                </nuxt-link>
                                            </div>
                                            <div class="col-md-6 col-12">
                                                <div class="content">
                                                    <nuxt-link :to="/blog/+ post.title + '?id=' + post.id | fomartLink">
                                                        <h5 class="mb-2 text-primary"><strong>{{ post.title }}</strong></h5>
                                                    </nuxt-link>
                                                    <p>{{ post.excerpt }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="filterPosts.length == 0">
                                <h3 class="text-primary">No result</h3>
                            </div>
                        </b-tab>
                    </b-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    name: 'Search',
    head: {
        title: "Search - Project Z"
    },
    transition: 'fade',
    validate(context) {
        if(context.query.key){
            return true
        }
    },
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
            getPosts: state => state.Post.posts,
        }),
        filterProducts(){
            return this.getProducts.filter( x => {
                return x.name.toLowerCase().includes(this.$route.fullPath.split('?key=')[1]) 
            })
        },
        filterPosts(){
            return this.getPosts.filter( x => {
                return x.title.toLowerCase().includes(this.$route.fullPath.split('?key=')[1]) 
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