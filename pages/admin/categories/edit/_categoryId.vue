<template>
    <div class="content-admin">
        <h3>Edit category {{ nameCat }}</h3>
         <b-form
            id="edit-category-form"
            ref="form"
            @submit.prevent="editCategory"
        >
            <h6>Name</h6>
            <b-form-input class="mb-2" placeholder="Name"
                v-model="nameCat"
            ></b-form-input>
            <b-button class="btn-primary mr-1" type="submit" form="edit-category-form"
                @keyup.enter="editCategory"
            >Edit<b-icon class="ml-2" icon="pencil"></b-icon></b-button>
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
    name: 'EditCategory',
    layout: 'admin',
    head: {
        title: "Edit Category - Project Z"
    },
    transition: 'fade',
    validate(context){
        if(!/^\d+$/.test(context.params.categoryId)){
            context.redirect('/admin/categories')
        }
        return true
    },
    data() {
        return {
            success: false,
            fail: false,
            nameCat: '',
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
        if(this.categoryCurrent){
            this.nameCat =  this.categoryCurrent.name
        }
    },
    computed: {
        ...mapState({
            getCategories: state => state.Category.categories,
        }),
        categoryCurrent(){
            return this.getCategories[this.$route.params.categoryId]
        },
    },
    methods: {
        ...mapActions({
            'actEditCategory' : 'Category/actEditCategory'
        }),
        editCategory(){

            // Map array

            let findCat = this.getCategories.map(x => {
                return x.name.toLowerCase()
            })
            // Check category esixt
            if(this.nameCat != ""){
                if (!findCat.includes(this.nameCat.toLowerCase())) {
                    this.actEditCategory({
                        catUpdate: this.nameCat.replace(/[^a-zA-Z ]/g,'').replace(/  +/g, ' '), 
                        id: this.categoryCurrent.id, 
                        index: this.$route.params.categoryId
                    })
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