<template>
    <div class="content-admin">
        <h3>Subscribers</h3>
        
        <div class="mt-2">
            <b-row>
                <b-col>
                    <nuxt-link to="/admin/newsletters">
                        <b-button size="sm" class="btn-primary mt-2">
                            Back
                        </b-button>
                    </nuxt-link>
                    <b-button size="sm" class="btn-primary mt-2"
                        @click="readAllSubscribers"
                    >
                        Read all
                    </b-button>
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
                <template #cell(createAt)="data" >
                    {{ data.item.createAt | filterDate }}
                </template>
                <template #cell(email)="data" >
                    {{ data.item.email }}<b-badge v-if="data.item.read == false" class="ml-2" variant="primary">New</b-badge>
                </template>
                <template #cell(actions)="data" >
                    <div class="row-actions">
                        <b-button size="sm" class="mr-1 btn-remove"
                            @click="showConfirm(data)"
                        >
                            <b-icon icon="x-square-fill"></b-icon>
                        </b-button>
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
    name: 'Subscribers',
    layout: 'admin',
    head: {
        title: "Subscribers - Project Z"
    },
    transition: 'fade',
    data() {
        return {
            fields: [
                { key: 'id', label: 'ID', thClass: 'id-col' },
                { key: 'email', label: 'Email', thClass: 'email-col' },
                { key: 'createAt', label: 'Create At', thClass: 'create-at-col' },
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
            getSubscribers: state => state.Subscriber.subscribers,
        }),
        items(){
            return this.getSubscribers        
        }
    },
    methods: {
        ...mapActions({
            'actRemoveSubscriber' : 'Subscriber/actRemoveSubscriber',
            'actReadAllSubscribers' : 'Subscriber/actReadAllSubscribers'
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
                    this.actRemoveSubscriber({index: data.index,id: data.item.id})
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        onFiltered(filteredItems) {
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
        readAllSubscribers(){
            this.actReadAllSubscribers(this.getSubscribers.map(x => x.id))
        }, 
    }
}
</script>

<style>

</style>