<template>
    <div class="content-admin">
        <h3>Add new category</h3>
         <b-form
            id="add-category-form"
            ref="form"
            @submit.prevent="addCategory"
        >
            <h6>Name</h6>
            <b-form-input class="mb-2" placeholder="Name"
                v-model="nameCat"
            ></b-form-input>
            <b-button class="btn-primary mr-1" type="submit" form="add-category-form"
                @keyup.enter="addCategory"
            >Add<b-icon class="ml-2" icon="folder-plus"></b-icon></b-button>
            <nuxt-link to="/admin/categories">
                <b-button class="btn-primary"
                >Back</b-button>
            </nuxt-link>
            <b-alert show variant="danger" class="mt-3 py-1 px-3"
                v-if="fail == true"
            >Category already exist!</b-alert>
            <b-alert show variant="primary" class="mt-3 py-1 px-3"
                v-if="success == true"
            >Success</b-alert>
        </b-form>
    </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
    name: 'AddCategory',
    layout: 'admin',
    head: {
        title: "Add Category - Project Z"
    },
    transition: 'fade',
    data() {
        return {
            nameCat: '',
            success: false,
            fail: false,
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
    computed: {
        ...mapState({
            getCategories: state => state.Category.categories,
        })
    },
    methods: {
        ...mapActions({
            'actAddCategory' : 'Category/actAddCategory',
            'actRealTimeCategory' : 'Category/actRealTimeCategory'
        }),
        addCategory(){

            // Map array

            let findCat = this.getCategories.map(x => {
                return x.name.toLowerCase()
            })

            // Check category has esixt
            if(this.nameCat != ""){
                if (!findCat.includes(this.nameCat.toLowerCase())) {
                    this.actAddCategory(this.nameCat)
                    // this.actRealTimeCategory()
                    this.$refs.form.reset()
                    this.success = true
                }else{
                    this.fail = true
                }
            }
            
        }
    }
}
</script>

<style>

</style>