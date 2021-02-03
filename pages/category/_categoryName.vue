<template>
    <div class="shop">
        <div class="container">
            <div class="row">
                <div class="col-12 col-cat">
                    <h1 class="text-primary">Category:<span class="text-capitalize">{{categoryCurent}}</span></h1>
                </div>
                <div class="col-12 mt-4">
                    <div class="row">
                        <div class="col-md-3 col-12 col-filter">
                            <div>
                                <h4><strong>Filter by</strong></h4>
                                <div class="value-filter"><strong>
                                    <span 
                                        v-for="(item,i) in selectedCategory"
                                        :key="i"
                                    > {{ item.text }}</span>
                                    <span 
                                        v-for="(item,i) in selectedProduct"
                                        :key="i"
                                    > {{ item.text }}</span>
                                    <span 
                                        v-for="(item,i) in selectedPrice"
                                        :key="i"
                                    > {{ item.text }}</span></strong>
                                </div>
                                <b-btn class="btn-primary mt-2" size="sm"
                                    v-if="selectedProduct.length > 0 || selectedPrice.length > 0"
                                    @click="clearFilter"
                                >Clear</b-btn>
                                <div class="mb-3 mt-2">
                                    <h5>Search</h5>
                                    <b-form>
                                        <b-input-group>
                                            <b-form-input type="text" v-model="searchProduct" trim></b-form-input>
                                        </b-input-group>
                                    </b-form>
                                </div>
                                <div class="mb-2 filter-div">
                                    <div class="row mx-0 mb-2 justify-content-between align-items-center pointer"
                                        @click="productToggle = !productToggle"
                                    >
                                        <h5 class="mb-0">Product</h5>
                                        <b-icon :icon="productToggle ? 'chevron-down' : 'chevron-up'"></b-icon>
                                    </div>
                                    <b-form-group class="mb-0 checkbox-div" :class="productToggle ? 'hide' : 'show'">
                                        <b-form-checkbox
                                            v-for="option in productOptions"
                                            v-model="selectedProduct"
                                            :key="option.value"
                                            :value="{ value: option.value, text: option.text}"
                                        >
                                            {{ option.text }}
                                        </b-form-checkbox>
                                    </b-form-group>
                                </div>
                                <div class="mb-2 filter-div">
                                    <div class="row mx-0 mb-2 justify-content-between align-items-center pointer"
                                        @click="priceToggle = !priceToggle"
                                    >
                                        <h5 class="mb-0">Price</h5>
                                        <b-icon :icon="priceToggle ? 'chevron-down' : 'chevron-up'"></b-icon>
                                    </div>
                                    <b-form-group class="mb-0 checkbox-div" :class="priceToggle ? 'hide' : 'show'">
                                        <b-form-checkbox
                                            v-for="option in priceOptions"
                                            v-model="selectedPrice"
                                            :key="option.value"
                                            :value="{ value: option.value, text: option.text}"
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
                                            <b-icon class="mr-3" icon="list-ul"
                                                @click="layout = 'list'"
                                                :class="{ active: layout == 'list' }"
                                            ></b-icon>
                                            <b-icon icon="grid"
                                                @click="layout = 'grid'"
                                                :class="{ active: layout == 'grid' }"
                                            ></b-icon>
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
                            <div class="row"
                                :class="[ layout == 'grid' ? 'grid' : 'list']"
                            >
                                <div class="col-md-4 col-sm-6 col-12 item-product"
                                    v-for="(product,i) in productPagination"
                                    :key="i"
                                >   
                                    <div class="container-item">
                                        <div class="col-img">
                                            <nuxt-link :to="/menu/+ product.name + '?id=' + product.id | fomartLink">
                                                <b-img
                                                    :src="product.image"
                                                >
                                                </b-img>
                                            </nuxt-link>
                                            <div class="img-baged" v-if="product.new == true">
                                                <img src="~/assets/images/label-new.png">
                                            </div>
                                        </div>
                                        <div class="content">
                                            <nuxt-link :to="'/category/' + product.categoryName | fomartLink">
                                                <h6 class="mt-1">{{ product.categoryName }}</h6>
                                            </nuxt-link>
                                            <nuxt-link :to="/menu/+ product.name + '?id=' + product.id | fomartLink">
                                                <h5 class="mt-1"><strong>{{ product.name }}</strong></h5>
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
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    name: 'Category',
    head: {
        title: "Category - Project Z"
    },
    transition: 'fade',
    async validate(context) {
        if(context.params.categoryName){
            const categories = await context.store.state.Category.categories
            
            for(let i in categories){
                if(categories[i].name.toLowerCase() == context.params.categoryName.split('-').join(' ')){
                    return true
                }
            }
        }else{
            context.redirect('/menu')
        }
    },
    asyncData({isMobile}) {
        const categoryToggle = isMobile
        const productToggle = isMobile
        const priceToggle = isMobile
        return { categoryToggle , productToggle, priceToggle}
    },
    data() {
        return {
            perPage: 1,
            productsPerPage: 9,
            currentPage: 1,
            layout: 'grid',
            searchProduct: "",
            selectSort: null,
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
                { text: '> 50,000VND', value: 6 },
                { text: '40,000 - 50,000VND', value: 5},
                { text: '30,000 - 40,000VND', value: 4 },
                { text: '20,000 - 30,000VND', value: 3 },
                { text: '10,000 - 20,000VND', value: 2 },
                { text: '< 10,000VND', value: 1 },
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
        categoryCurent(){
            return this.$route.params.categoryName.split('-').join(' ')
        },
        productsFilter(){
            return this.getProducts.filter( x => {
                return x.categoryName.toLowerCase() == this.categoryCurent
            })
        },
        filterProduct(){

            let product = this.productsFilter.slice(0)
            let priceSort = this.selectSort
            let price = this.selectedPrice.map(x => x.value)
            let type = this.selectedProduct.map(x => x.value)

            if(this.searchProduct != ""){
                product = product.filter((x) => {
                    return x.name.toLowerCase().includes(this.searchProduct.toLowerCase())
                })
            }

            if(type.length > 0){
                let saleProduct = [], newProduct = []

                if(type.includes('sale')){
                    saleProduct = product.filter((x) => {
                        return x.salePrice != 0   
                    })
                }

                if(type.includes('new')){
                    newProduct = product.filter((x) => {
                        return x.new == true   
                    })   
                }

                let mergeArr = [].concat(saleProduct,newProduct)
                let uniqueArr = mergeArr.filter((a,b,c) => b === c.indexOf(a))

                product = uniqueArr
            }

            if(price.length > 0){
                let filter1 = [], filter2 = [], filter3 = [], filter4 = [], filter5 = [], filter6 = []
                if(price.includes(1)){
                    filter1 = product.filter((x) => {
                        return x.price <= 10000   
                    })
                }
                if(price.includes(2)){
                    filter2 = product.filter((x) => {
                        return x.price >= 10000 && x.price <= 20000   
                    })
                }
                if(price.includes(3)){
                    filter3 = product.filter((x) => {
                        return x.price >= 20000 && x.price <= 30000   
                    })
                }
                if(price.includes(4)){
                    filter4 = product.filter((x) => {
                        return x.price >= 30000 && x.price <= 40000   
                    })
                }
                if(price.includes(5)){
                    filter5 = product.filter((x) => {
                        return x.price >= 40000 && x.price <= 50000   
                    })
                }
                if(price.includes(6)){
                    filter6 = product.filter((x) => {
                        return x.price >= 50000  
                    })
                }

                let mergeArr = [].concat(filter1,filter2,filter3,filter4,filter5,filter6)
                let uniqueArr = mergeArr.filter((a,b,c) => b === c.indexOf(a))

                product = uniqueArr
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
    methods: {
        clearFilter(){
            this.selectedProduct = []
            this.selectedPrice = []
        }
    }
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
            svg{
                cursor: pointer;
                &.active{
                    background-color: #3c5e2c;
                    color: #fff;
                    border-radius: 50%;
                    font-weight: 600;
                    border: 5px solid #3c5e2c;
                }
            }
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
            h1{
                word-break: break-word;
                span{
                    word-break: initial;
                }
            }
        }
        .col-filter{
            @media screen and ( max-width: 767px ){
                margin-bottom: 20px;
            }
            .value-filter{
                span{
                    color: #3c5e2c;
                    line-height: 20px;
                    &:last-child{
                        &:after{
                            content: ""
                        }    
                    }
                    &:after{
                        content: ","
                    }
                }
            }
            .filter-div{
                svg{
                    color: #3c5e2c;
                }
                .checkbox-div{
                    max-height: 1000px;
                    transition: all 0.5s ease-in;
                    overflow: hidden;
                    &.hide {
                        max-height: 0 !important;
                        transition: all 0.2s ease-out;
                        
                    }
                }
            }
        }
        .row{
            &.list{
                .item-product{
                    max-width: 100%;
                    flex: 100%;
                    .container-item{
                        display: flex;
                        .col-img{
                            max-width: 50%;
                            width: 100%;
                        }
                        .content{
                            max-width: 50%;
                            width: 100%;
                        }
                    }
                }
            }
            .item-product{
                margin-bottom: 30px;
                .container-item{
                    overflow: hidden;
                    border: 1px solid #dadada;
                    height: 100%;
                    .col-img{
                        position: relative;
                        img{
                            height: 200px;
                            width: 100%;
                            object-fit: cover;
                        }
                        .img-baged{
                            position: absolute;
                            top: 0;
                            right: 0;
                            img{
                                width: 70px;
                                height: 70px;
                            }
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