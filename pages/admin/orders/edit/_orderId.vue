<template>
    <div class="content-admin">
        <h3>Edit Order {{ id }}</h3>
        <b-form
            id="edit-order-form"
            ref="form"  
            @submit.prevent="editOrder"
        >   
            <div class="row my-3" align-v="center">
                <div class="col-md-2 col-sm-12">
                    <b-form-select size="sm"
                        v-model="selectStatus" 
                    >
                        <b-form-select-option v-for="(item, i) in statusOptions" :key="i" 
                            :value="item.value"
                        >
                            {{ item.text }}
                        </b-form-select-option>
                    </b-form-select>
                </div>
                <div v-if="total" class="col-md-8 col-12">
                    <h6 class="mb-0">Total: <span>{{total}}</span></h6>
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
                <template #cell(createAt)="data" >
                    {{ data.item.createAt | filterDate }}
                </template>
                <template #cell(total)="data" >
                    {{ data.item.quantity * data.item.regularPrice }}
                </template>
                <template #cell(actions)="data" >
                    <div class="row-actions">
                        <b-button size="sm" class="mr-1 btn-remove"
                            @click="showConfirm(data)"
                        >
                            <b-icon icon="trash"></b-icon>
                        </b-button>
                        <nuxt-link :to="'/admin/orders/edit/' + data.index">
                            <b-button size="sm" class="btn-primary">
                                <b-icon icon="pencil"></b-icon>
                            </b-button>
                        </nuxt-link>
                    </div>
                    
                </template>
            </b-table>
            <b-button class="btn-primary mr-1" type="submit" form="edit-order-form"
                @keyup.enter="editOrder"
            >Edit<b-icon class="ml-2" icon="pencil"></b-icon></b-button>
            <nuxt-link to="/admin/orders">
                <b-button class="btn-primary"
                >Back</b-button>
            </nuxt-link>
            <b-alert show variant="danger" class="mt-3 py-1 px-3"
                v-if="fail == true"
            >Error!</b-alert>
            <b-alert show variant="primary" class="mt-3 py-1 px-3"
                v-if="success == true"
            >Success</b-alert>
        </b-form>
    </div>
</template>

<script>
import moment from 'moment';
import { mapActions, mapState } from 'vuex'

export default {
    name: 'EditOrder',
    layout: 'admin',
    head: {
        title: "Edit Order - Project Z"
    },
    transition: 'fade',
    data() {
        return {
            success: false,
            fail: false,
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
                { key: 'quantity', label: 'Quantity', thClass: 'quantity-col' },
                { key: 'categoryName', label: 'Category', thClass: 'category-col' },
                { key: 'createAt', label: 'Create At', thClass: 'create-at-col' },
                { key: 'total', label: 'Total', thClass: 'total-col' },
            ],
            items: [],
            statusOptions: [
                { value: 'Processing', text: 'Processing' },
                { value: 'Confirmed', text: 'Confirmed' },
                { value: 'Shipped', text: 'Shipped' },
                { value: 'Completed', text: 'Completed' },
            ]
        }
    },
    validate(context){
        if(!/^\d+$/.test(context.params.orderId)){
            context.redirect('/admin/orders')
        }
        return true
    },
    filters: {
        filterDate: function (date) {
            return moment(date).format('l');
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
        ...mapActions({
            'actEditOrder' : 'Order/actEditOrder'
        }),
        editOrder(){
            this.actEditOrder({
                status: this.selectStatus,
                id: this.id,
            })  
            this.success = true
        }
    }
}
</script>

<style>

</style>