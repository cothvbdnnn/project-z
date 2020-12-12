<template>
    <div class="content-admin">
        <h3>Reviews</h3>
        
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
                ref="selectableTable"
                selectable
                select-mode="multi"
                @row-selected="onRowSelected"
                :items="items"
                :fields="fields"
                :filter="filter"
                :current-page="currentPage"
                :per-page="perPage"
            >
                <template #cell(createAt)="data" >
                    {{ data.item.createAt | filterDate }}
                </template>
                <template #cell(actions)="data" >
                    <div class="row-actions">
                        <b-button size="sm" class="mr-1 btn-remove"
                            @click="showConfirm(data)"
                        >
                            <b-icon icon="x-square-fill"></b-icon>
                        </b-button>
                        <nuxt-link target="_blank" :to="/menu/+ data.item.postName + '?id=' + data.item.postId | fomartLink">
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
    name: 'Reviews',
    layout: 'admin',
    head: {
        title: "Reviews - Project Z"
    },
    transition: 'fade',
    data() {
        return {
            fields: [
                { key: 'userName', label: 'User', thClass: 'user-col' },
                { key: 'content', label: 'Review', thClass: 'content-col' },
                { key: 'rating', label: 'Rating', thClass: 'rating-col', tdClass: 'rating-col' },
                { key: 'postName', label: 'Product', thClass: 'post-col' },
                { key: 'createAt', label: 'Create At', thClass: 'create-at-col' },
                { key: 'actions', label: 'Actions', thClass: 'actions-col' },
            ],
            selected: [],
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
        },
        fomartLink(text) {
            return text.split(' ').join('-').toLowerCase()
        },
    },
    computed: {
        ...mapState({
            getReviews: state => state.Review.reviews,
        }),
        items(){
            return this.getReviews        
        }
    },
    methods: {
        ...mapActions({
            'actRemoveReview' : 'Review/actRemoveReview'
        }),
        showConfirm(data) {
            this.confirm = ''
            this.$bvModal.msgBoxConfirm('Please confirm that you want to delete.',{
                title: 'Please Confirm',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'primary',
                okTitle: 'YES',
                cancelTitle: 'NO',
                footerClass: 'p-2',
                hideHeaderClose: false,
                centered: true
            })
            .then(value => {
                this.confirm = value
                if(this.confirm){
                    this.actRemoveReview({index: data.index,id: data.item.id})
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        onRowSelected(items) {
            this.selected = items
        },
        onFiltered(filteredItems) {
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
    }
}
</script>

<style>

</style>