<template>
    <div>
        <div>
            <div class="pb-6 pb-8 pt-md-8 bg-gradient-success">
                <b-row>
                    <div class="col-md-3 col-sm-6" v-for="(arr,i) in arrayCard" :key="i">
                        <div class="mb-4">
                            <b-card>
                                <div class="row">
                                    <div class="col">
                                        <h5 class="card-title text-uppercase text-muted mb-0">{{ arr.title }}</h5>
                                        <span class="h3 font-weight-bold mb-0">{{ arr.data }}</span>
                                    </div>
                                    <div class="col-auto">
                                        <div class="icon icon-shape text-white rounded-circle shadow bg-gradient-orange">
                                            <i class="ni ni-chart-pie-35"></i>
                                        </div>
                                    </div>
                                </div>
                            </b-card>
                        </div>
                    </div>
                </b-row>
            </div>
            <div>
                <div class="row">
                    <div class="col-md-8 col-12">
                        <b-card>
                            <ChartBar 
                                :datasets="dataChartBar"
                            />
                        </b-card>
                    </div>
                    <div class="col-md-4 col-12">
                        <b-card>
                            <ChartDoughnut 
                                :labels="['Processing','Confirmed','Shipped','Completed']"
                                :data="[orderProcessing.length,orderConfirmed.length,orderShipped.length,orderCompleted.length]"
                            />
                        </b-card>
                        <div class="mt-4">
                            <b-card>
                                <ChartLine 
                                    :datasets="dataChartLine"
                                />
                            </b-card>
                        </div>
                    </div>    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Admin',
    layout: 'admin',
    head: {
        title: "Admin - Project Z"
    },
    transition: 'fade',
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState({
            getProducts: state => state.Product.products,
            getOrders: state => state.Order.orders,
            getPosts: state => state.Post.posts,
            getComments: state => state.Comment.comments,
        }),
        newOrders(){
            return this.getOrders.filter((x) => {
                return x.status == 'Processing'
            })
        },
        newComments(){
            return this.getComments.filter((x) => {
                return x.read == false  
            })
        },
        orderProcessing(){
            return this.getOrders.filter((x) => {
                return x.status == 'Processing'
            })
        },
        orderConfirmed(){
            return this.getOrders.filter((x) => {
                return x.status == 'Confirmed'
            })
        },
        orderShipped(){
            return this.getOrders.filter((x) => {
                return x.status == 'Shipped'
            })
        },
        orderCompleted(){
            return this.getOrders.filter((x) => {
                return x.status == 'Completed'
            })
        },
        arrayCard(){
            return [
                { title: 'New Comments', data: this.newComments.length, icon: '' },
                { title: 'New Orders', data: this.newOrders.length, icon: '' },
                { title: 'Total Products', data: this.getProducts.length, icon: '' },
                { title: 'Total Posts', data: this.getPosts.length, icon: '' },
            ]
        },
        orderDateProcessing(){
            let mapOrder =  this.orderProcessing.map(x => {
                return new Date(x.createAt).getDay()
            })
            return [
                mapOrder.filter(x => x == 0 ).length,
                mapOrder.filter(x => x == 1 ).length,
                mapOrder.filter(x => x == 2 ).length,
                mapOrder.filter(x => x == 3 ).length,
                mapOrder.filter(x => x == 4 ).length,
                mapOrder.filter(x => x == 5 ).length,
                mapOrder.filter(x => x == 6 ).length,
            ]
        },
        orderDateConfirmed(){
            let mapOrder =  this.orderConfirmed.map(x => {
                return new Date(x.createAt).getDay()
            })
            return [
                mapOrder.filter(x => x == 0 ).length,
                mapOrder.filter(x => x == 1 ).length,
                mapOrder.filter(x => x == 2 ).length,
                mapOrder.filter(x => x == 3 ).length,
                mapOrder.filter(x => x == 4 ).length,
                mapOrder.filter(x => x == 5 ).length,
                mapOrder.filter(x => x == 6 ).length,
            ]
        },
        orderDateShipped(){
            let mapOrder =  this.orderShipped.map(x => {
                return new Date(x.createAt).getDay()
            })
            return [
                mapOrder.filter(x => x == 0 ).length,
                mapOrder.filter(x => x == 1 ).length,
                mapOrder.filter(x => x == 2 ).length,
                mapOrder.filter(x => x == 3 ).length,
                mapOrder.filter(x => x == 4 ).length,
                mapOrder.filter(x => x == 5 ).length,
                mapOrder.filter(x => x == 6 ).length,
            ]
        },
        orderDateCompleted(){
            let mapOrder =  this.orderCompleted.map(x => {
                return new Date(x.createAt).getDay()
            })
            return [
                mapOrder.filter(x => x == 0 ).length,
                mapOrder.filter(x => x == 1 ).length,
                mapOrder.filter(x => x == 2 ).length,
                mapOrder.filter(x => x == 3 ).length,
                mapOrder.filter(x => x == 4 ).length,
                mapOrder.filter(x => x == 5 ).length,
                mapOrder.filter(x => x == 6 ).length,
            ]
        },
        commentDate(){
            let mapComment =  this.getComments.map(x => {
                return new Date(x.createAt).getDay()
            })
            return [
                mapComment.filter(x => x == 0 ).length,
                mapComment.filter(x => x == 1 ).length,
                mapComment.filter(x => x == 2 ).length,
                mapComment.filter(x => x == 3 ).length,
                mapComment.filter(x => x == 4 ).length,
                mapComment.filter(x => x == 5 ).length,
                mapComment.filter(x => x == 6 ).length,
            ]
        },
        dataChartBar(){
            return [
                {
                    backgroundColor: "#b7ac9a",
                    borderColor: "#b7ac9a",
                    data: this.orderDateProcessing,
                    label: "Processing"
                },
                {
                    backgroundColor: "#d3b161",
                    borderColor: "#d3b161",
                    data: this.orderDateConfirmed,
                    label: "Comfirmed"
                },
                {
                    backgroundColor: "#6b5948",
                    borderColor: "#6b5948",
                    data: this.orderDateShipped,
                    label: "Shipped"
                },
                {
                    backgroundColor: "#3c5e2c",
                    borderColor: "#3c5e2c",
                    data: this.orderDateCompleted,
                    label: "Completed"
                },
            ]
        },
        dataChartLine(){
            return [
                {
                    borderColor: "#3c5e2c",
                    backgroundColor: "#3c5e2c",
                    data: this.commentDate,
                    label: "Comments"
                }
            ]
        }
    },
}
</script>

<style>

</style>