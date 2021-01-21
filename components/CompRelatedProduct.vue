<template>
    <div class="related-product mt-5">
        <div class="row">
            <div class="col-12 mb-3">
                <h2 class="text-primary">Related Products</h2>
            </div>
            <div class="col-12">
                <VueSlickCarousel v-bind="settings">
                    <div class="item-product"
                        v-for="(product,i) in relatedPosts"
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
                </VueSlickCarousel>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
    data() {
        return {
            settings: {
                arrows: false,
                dots: false,
                autoplay: true,
                autoplaySpeed: 5000,
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 1124,
                        settings: {	
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 800,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                ]
            },
        }
    },
    props: {
        idPost: {
            type: String,
            default: '',
        },
        categoryId: {
            type: String,
            default: '',
        },
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
        relatedPosts(){
            return this.getProducts.filter( (x) => {
                if(x.id != this.idPost){
                    return x.categoryId == this.categoryId
                }
            })
        }
    },
    components: { 
        VueSlickCarousel,
    },
}
</script>

<style lang="scss">

.related-product{
    .slick-list{
        margin: 0 -10px;
        .item-product{
            padding: 0 10px;
        }
    }
    
}

</style>