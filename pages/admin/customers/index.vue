<template>
    <div class="content-admin">
        <h3>Customers</h3>
        <div class="mt-2">
            <b-row>
                <b-col>
                   
                </b-col>
                <b-col lg="6" class="my-2">
                    <b-input-group size="sm">
                        <b-form-input
                            v-model="filter"
                            type="search"
                            id="filterInput"
                            placeholder="Type to Search"
                        ></b-form-input>
                        <b-input-group-append>
                            <b-button class="btn-primary" :disabled="!filter" @click="filter = ''">Clear</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
            </b-row>
            <b-table responsive
                class="mt-3 main-table"
                id="table-customers"
                ref="selectableTable"
                :items="items"
                :fields="fields"
                :filter="filter"
                :current-page="currentPage"
                :per-page="perPage"
            >   
                <template #cell(image)="data" >
                    <img :src="data.item.image" v-if="data.item.image" alt="image" class="image-product-table">
                </template>
                <template #cell(address)="data" >
                    <p class="text-overflow">{{ data.item.address }}</p>
                </template>
                <template #cell(createAt)="data" >
                    {{ data.item.createAt | filterDate }}
                </template>
                <template #cell(actions)="data" >
                    <div class="row-actions">
                        <nuxt-link :to="'/admin/customers/view/' + data.index">
                            <b-button size="sm" class="btn-primary">
                                <b-icon icon="eye"></b-icon>
                            </b-button>
                        </nuxt-link>
                    </div>
                    
                </template>
            </b-table>
            <b-row class="justify-content-between pagination-table">
                <b-col md="1" class="my-1">
                    <b-form-select
                        v-model="perPage"
                        id="perPageSelect"
                        size="sm"
                        :options="pageOptions"
                    ></b-form-select>
                </b-col>

                <b-col md="5" class="my-1">
                    <b-pagination
                        v-model="currentPage"
                        :total-rows="totalRows"
                        :per-page="perPage"
                        align="fill"
                        size="sm"
                        class="my-0"
                    ></b-pagination>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>

import moment from 'moment';
import { mapState, mapActions } from 'vuex';

export default {
    name: 'Customers',
    layout: 'admin',
    head: {
        title: "Customers - Project Z"
    },
    transition: 'fade',
    data() {
        return {
            fields: [   
                { key: 'image', label: 'Image', thClass: 'image-col' },
                { key: 'name', label: 'Name', thClass: 'name-col' },
                { key: 'email', label: 'Email', thClass: 'email-col' },
                { key: 'phone', label: 'Phone', thClass: 'phone-col' },
                { key: 'address', label: 'Address', thClass: 'address-col' },
                { key: 'role', label: 'Role', thClass: 'role-col' },
                { key: 'createAt', label: 'Create At', thClass: 'create-at-col' },
                { key: 'actions', label: 'Actions', thClass: 'actions-col' },
            ],
            filter: null,
            currentPage: 1,
            perPage: 10,
            pageOptions: [5, 10, 15],
            totalRows: 1,
        }
    },
    mounted() {
        this.totalRows = this.items.length
    },
    filters: {
        filterDate: function (date) {
            return moment(date).format('l');
        }
    },
    computed: {
        ...mapState({
            getCustomers: state => state.Customer.customers,
        }),
        items(){
            return this.getCustomers        
        }
    },
    methods: {
        onFiltered(filteredItems) {
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
    }
}
</script>

<style>

</style>