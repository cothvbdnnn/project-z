<template>
    <div class="shop">
        <div class="container">
            <div class="row">
                <div class="col-md-3 col-12 col-cat">
                    <div>
                        <h4><strong>Filter by</strong></h4>
                        <div class="mb-3">
                            <h5>Search</h5>
                            <b-form>
                                <b-input-group>
                                    <b-form-input type="text" v-model="searchProduct" trim></b-form-input>
                                </b-input-group>
                            </b-form>
                        </div>
                        <div>
                            <h5>Category</h5>
                            <b-form-group>
                                <b-form-checkbox
                                    v-for="option in getCaregories"
                                    v-model="selectedCategory"
                                    :key="option.id"
                                    :value="option.id"
                                >
                                    {{ option.name }}
                                </b-form-checkbox>
                            </b-form-group>
                        </div>
                        <div>
                            <h5>Product</h5>
                            <b-form-group>
                                <b-form-checkbox
                                    v-for="option in productOptions"
                                    v-model="selectedProduct"
                                    :key="option.value"
                                    :value="option.value"
                                >
                                    {{ option.text }}
                                </b-form-checkbox>
                            </b-form-group>
                        </div>
                        <div>
                            <h5>Price</h5>
                            <b-form-group>
                                <b-form-checkbox
                                    v-for="option in priceOptions"
                                    v-model="selectedPrice"
                                    :key="option.value"
                                    :value="option.value"
                                >
                                    {{ option.text }}
                                </b-form-checkbox>
                            </b-form-group>
                        </div>
                    </div>
                </div>
                <div class="col-md-9 col-12">
                    <div class="row justify-content-end align-items-center">
                        <div class="col-md-4 col-12 mb-3 pr-0">
                            <h6 class="mb-0"><strong>
                                <span v-if="currentPage == 1 && filterProduct.length == 0">0</span>
                                <span v-if="currentPage == 1 && filterProduct.length > 0">1</span>
                                <span> - {{ productPagination.length }}</span>
                                <span v-if="currentPage > 1">{{ ((currentPage - 1) * productsPerPage) + 1 }} - {{ ((currentPage - 1) * productsPerPage) + productPagination.length }}</span>
                                of {{ filterProduct.length}} product<span v-if="filterProduct.length > 1">s</span></strong>
                            </h6>
                        </div>
                        <div class="col-md-8 col-12 mb-3">
                            <div class="row justify-content-end">
                                <div class="col row-list-grid pr-0">
                                    <b-icon class="mr-3" icon="list-ul"></b-icon>
                                    <b-icon icon="grid"></b-icon>
                                </div>
                                <div class="col row-select">
                                    <p class="mb-0">Sort by</p>
                                    <b-form-select class="ml-2" 
                                        v-model="selectSort" 
                                    >
                                        <b-form-select-option :value="null">Please select</b-form-select-option>
                                        <b-form-select-option v-for="option in sortPriceOptions"
                                            :key="option.value" 
                                            :value="option.value"
                                        >
                                            {{ option.text }}
                                        </b-form-select-option>
                                    </b-form-select>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                    <h5>
                                        <span v-if="product.salePrice != 0"><strong>{{ product.salePrice | filterPrice}}</strong></span>
                                        <span :class="product.salePrice != 0 ? 'line-through' : null"><strong>{{ product.regularPrice | filterPrice }}</strong></span>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="filterProduct.length > 0">
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
            currentPage: 1,
            searchProduct: "",
            selectSort: null,
            selectedCategory: [],
            selectedProduct: [],
            selectedPrice: [],
            sortPriceOptions: [
                { text: 'Price - Low to high', value: 'lowToHigh' },
                { text: 'Price - High to low', value: 'highToLow' },
            ],
            productOptions: [
                { text: 'New', value: 'new' },
                { text: 'Sale', value: 'sale' },
            ],
            priceOptions: [
                { text: '> 50,000VND', value: '>50000' },
                { text: '40,000VND - 50,000VND', value: '40000-50000' },
                { text: '30,000VND - 40,000VND', value: '30000-40000' },
                { text: '20,000VND - 30,000VND', value: '20000-30000' },
                { text: '10,000VND - 20,000VND', value: '10000-20000' },
                { text: '< 10,000VND', value: '<10000' },
            ]
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
        filterProduct(){

            let product = this.getProducts.slice(0)
            let category = this.selectedCategory
            let priceSort = this.selectSort
            let price = this.selectedPrice

            if(category.length > 0){
                product = product.filter((x) => {
                    return category.includes(x.categoryId)
                })
            }

            for(let i in product){
                if(product[i].salePrice == 0){
                    product[i].price = product[i].regularPrice    
                }else{
                    product[i].price = product[i].salePrice
                }
            }

            if(priceSort == 'lowToHigh'){
                product = product.sort((a,b) => {
                    return a.price - b.price
                })
            }else if(priceSort == 'highToLow'){
                product = product.sort((a,b) => {
                    return b.price - a.price
                })
            }

            return product
        },
        productPagination(){
            return this.filterProduct.slice(this.productsPerPage * (this.currentPage - 1), this.productsPerPage *(this.currentPage))
        },
        rowsPagination(){
            return Math.ceil(this.filterProduct.length/this.productsPerPage)
        }
    },
}
</script>

<style lang="scss">
    .shop{
        .row-list-grid{
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-end;
            align-items: center;
            font-size: 23px;
            max-width: 80px;
        }
        .row-select{
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-end;
            max-width: 280px;
            align-items: center;
            .custom-select{
                padding: 0 10px;
                height: 30px;
                max-width: 170px;
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