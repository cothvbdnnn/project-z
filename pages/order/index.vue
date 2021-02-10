<template>
    <div class="shop">
        <div class="container">
            <div class="row">
                <div class="col-12 col-cat mb-3">
                    <h1 class="text-primary">Order</h1>
                </div>
                <div class="col-12" v-if="items.length > 0">
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
                        ref="selectableTable"
                        :items="items"
                        :fields="fields"
                        :filter="filter"
                        :current-page="currentPage"
                        :per-page="perPage"
                    >   
                        <template #cell(order)="data" >
                            <p v-for="(order,i) in data.item.order" :key="i" class="text-overflow">
                                <span>{{order.quantity}} x </span>{{ order.nameProduct }}
                            </p>
                        </template>
                        <template #cell(total)="data" >
                            <p class="mb-0">{{ data.item.total.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + 'VND'}}</p>
                        </template>
                        <template #cell(createAt)="data" >
                            {{ data.item.createAt | filterDate }}
                        </template>
                        <template #cell(status)="data" >
                            <h5 class="mb-0">
                                <b-badge 
                                    :class="`badge-${data.item.status}`"
                                >
                                    {{ data.item.status }}
                                </b-badge>
                            </h5>
                        </template>
                        <template #cell(actions)="data" >
                            <div class="row-actions">
                                <nuxt-link :to="'/order/view/' + (data.index + calPagination)">
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
                <div class="col-12" v-if="items.length == 0">
                    <h5>You don't have any orders yet</h5>
                    <nuxt-link to="/menu">
                        <b-btn class="btn-primary mt-2">
                            Return to menu
                        </b-btn>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import moment from 'moment';
import { mapState, mapActions } from 'vuex'

export default {
    name: 'Order',
    head: {
        title: "Order - Project Z"
    },
    transition: 'fade',
    data() {
        return {
            fields: [   
                { key: 'id', label: 'ID', thClass: 'id-col' },
                { key: 'name', label: 'Name', thClass: 'name-col' },
                { key: 'phone', label: 'Phone', thClass: 'phone-col' },
                { key: 'order', label: 'Product', thClass: 'product-col' },
                { key: 'total', label: 'Total', thClass: 'total-col' },
                { key: 'createAt', label: 'Create At', thClass: 'create-at-col' },
                { key: 'status', label: 'Status', thClass: 'status-col' },
                { key: 'actions', label: 'Actions', thClass: 'actions-col' },
            ],
            filter: null,
            currentPage: 1,
            perPage: 10,
            pageOptions: [5, 10, 15],
            totalRows: 1,
            confirm: '',
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
            getOrders: state => state.Order.orders,
            getUserCurrent: state => state.userCurrent,
        }),
        filterOrder(){
            return this.getOrders.filter( x => {
                return x.userId == this.getUserCurrent.userId
            })
        },
        items(){
            return this.filterOrder        
        },
        calPagination(){
            let number 
            
            if(this.currentPage == 1){
                number = 0
            }else{
                number = (this.currentPage - 1) * this.perPage
            }

            return number
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
                .col-img{
                        position: relative;
                        .remove-btn{
                            background-color: #3c5e2c;
                            font-size: 18px;
                            position: absolute;
                            top: 0;
                            right: 0;
                            padding: 0 3px;
                            margin-right: 0;
                        }
                        img{
                            height: 200px;
                            width: 100%;
                            object-fit: cover;
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
</style>