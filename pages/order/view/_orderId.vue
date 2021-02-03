<template>
    <div class="container">
        <h3>Order {{ id }}</h3>
        <b-form
            id="edit-order-form"
            ref="form"  
            @submit.prevent="editOrder"
        >   
            <div class="row my-3" align-v="center">
                <div class="col-md-3 col-sm-12">
                    <h6 class="mb-0">Status: <span>{{selectStatus}}</span></h6>
                </div>
                <div v-if="total" class="col-md-8 col-12">
                    <h6 class="mb-0">Total: <span>{{total | filterPrice}}</span></h6>
                </div>
            </div>
            <div class="row">
                <div v-if="name" class="col-md-3 col-12 mb-2">
                    <h6>Name</h6>
                    <p>{{ name }}</p>
                </div>
                <div v-if="email" class="col-md-3 col-12 mb-2">
                    <h6>Email</h6>
                    <p>{{ email }}</p>
                </div>
                <div v-if="phone" class="col-md-3 col-12 mb-2">
                    <h6>Phone</h6>
                    <p>{{ phone }}</p>
                </div>
                <div v-if="createAt" class="col-md-3 col-12 mb-2">
                    <h6>Create At</h6>
                    <p>{{ createAt | filterDate }}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-12">
                    <div v-if="address">
                        <h6>Address</h6>
                        <p>{{ address }}</p>
                    </div>
                </div>
                <div class="col-md-6 col-12">
                    <div v-if="notes">
                        <h6>Notes</h6>
                        <p>{{ notes }}</p>
                    </div>
                </div>
            </div>
            <h6>Products</h6>
            <b-table responsive
                class="mt-3 main-table"
                :items="items"
                :fields="fields"
            >   
                <template #cell(imageProduct)="data" >
                    <b-img
                        :src="data.item.imageProduct"
                    ></b-img>
                </template>
                <template #cell(regularPrice)="data" >
                    {{ data.item.regularPrice.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + 'VND'}}
                </template>
                <template #cell(salePrice)="data" >
                    {{ data.item.salePrice.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + 'VND'}}
                </template>
                <template #cell(createAt)="data" >
                    {{ data.item.createAt | filterDate }}
                </template>
                <template #cell(total)="data" >
                    <span v-if="data.item.salePrice == 0">{{ (data.item.quantity * data.item.regularPrice).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + 'VND' }}</span>
                    <span v-if="data.item.salePrice != 0">{{ (data.item.quantity * data.item.salePrice).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + 'VND' }}</span>
                </template>
            </b-table>
            <nuxt-link to="/order">
                <b-button class="btn-primary"
                >Back</b-button>
            </nuxt-link>
        </b-form>
    </div>
</template>

<script>
import moment from 'moment';
import { mapActions, mapState } from 'vuex'

export default {
    name: 'ViewOrder',
    head: {
        title: "View Order - Project Z"
    },
    transition: 'fade',
    data() {
        return {
            name: '',
            email: '',
            phone: '',
            address: '',
            id: '',
            createAt: '',
            notes: '',
            selectStatus: '',
            total: '',
            fields: [   
                { key: 'id', label: 'Id', thClass: 'id-col' },
                { key: 'imageProduct', label: 'Image', thClass: 'image-col' },
                { key: 'nameProduct', label: 'Name', thClass: 'name-col' },
                { key: 'regularPrice', label: 'Regular Price', thClass: 'price-col' },
                { key: 'salePrice', label: 'Sale Price', thClass: 'price-col' },
                { key: 'quantity', label: 'Quantity', thClass: 'quantity-col' },
                { key: 'categoryName', label: 'Category', thClass: 'category-col' },
                { key: 'createAt', label: 'Create At', thClass: 'create-at-col' },
                { key: 'total', label: 'Total', thClass: 'total-col' },
            ],
            items: [],
        }
    },
    validate(context){
        if(!/^\d+$/.test(context.params.orderId)){
            context.redirect('/order')
        }
        return true
    },
    filters: {
        filterDate: function (date) {
            return moment(date).format('l');
        },
        filterPrice(price) {
            return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + 'VND';
        }
    },
    watch: {
        success(){
            setTimeout(() => {
                this.success = false
            }, 2000);
        },
        fail(){
            setTimeout(() => {
                this.fail = false
            }, 2000);
        }
    },
    created() {
        if(this.orderCurrent){
            this.id =  this.orderCurrent.id
            this.name =  this.orderCurrent.name
            this.email = this.orderCurrent.email
            this.phone = this.orderCurrent.phone
            this.address = this.orderCurrent.address
            this.createAt = this.orderCurrent.createAt
            this.notes = this.orderCurrent.notes
            this.items = this.orderCurrent.order
            this.selectStatus = this.orderCurrent.status
            this.total = this.orderCurrent.total
        }
    },
    computed: {
        ...mapState({
            getOrders: state => state.Order.orders,
        }),
        orderCurrent(){
            return this.getOrders[this.$route.params.orderId]
        },
    },
    methods: {
    }
}
</script>

<style>

</style>