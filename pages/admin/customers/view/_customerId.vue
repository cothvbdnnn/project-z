<template>
    <div class="content-admin">
        <h3>{{ name }}</h3>
        <div class="row my-4" v-if="imagePreview">
            <div class="col-md-3 col-12">
                <img class="image-preview" alt="image"
                    :src="imagePreview"
                >
            </div>
            <div class="col-md-9 col-12">
                <div class="row">
                    <div class="col-md-4 col-12 mb-2">
                        <h6>Name</h6>
                        <p>{{ name }}</p>
                    </div>
                    <div v-if="email" class="col-md-4 col-12 mb-2">
                        <h6>Email</h6>
                        <p>{{ email }}</p>
                    </div>
                    <div v-if="phone" class="col-md-4 col-12 mb-2">
                        <h6>Phone</h6>
                        <p>{{ phone }}</p>
                    </div>
                </div>
                <div v-if="createAt">
                    <h6>Create At</h6>
                    <p>{{ createAt | filterDate }}</p>
                </div>
                <div v-if="address">
                    <h6>Address</h6>
                    <p>{{ address }}</p>
                </div>
            </div>
        </div>
        <nuxt-link to="/admin/customers">
            <b-button class="btn-primary"
            >Back</b-button>
        </nuxt-link>
    </div>
</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex'

export default {
    name: 'ViewCustomer',
    layout: 'admin',
    head: {
        title: "Customer - Project Z"
    },
    transition: 'fade',
    data() {
        return {
            name: '',
            imagePreview: '',
            email: '',
            phone: '',
            address: '',
            createAt: '',
        }
    },
    validate(context){
        if(!/^\d+$/.test(context.params.customerId)){
            context.redirect('/admin/customers')
        }
        return true
    },
    filters: {
        filterDate: function (date) {
            return moment(date).format('l');
        }
    },
    created(){
        if(this.customerCurrent){
            this.name = this.customerCurrent.name
            this.imagePreview = this.customerCurrent.image
            this.email = this.customerCurrent.email
            this.phone = this.customerCurrent.phone
            this.address = this.customerCurrent.address
            this.createAt = this.customerCurrent.createAt
        }
    },
    computed: {
        ...mapState({
            getCustomers: state => state.Customer.customers,
        }),
        customerCurrent(){
            return this.getCustomers[this.$route.params.customerId]
        },
    },
}
</script>

<style>

</style>