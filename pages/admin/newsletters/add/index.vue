<template>
    <div class="content-admin">
        <h3>Add new Newsletter</h3>
         <b-form
            id="add-newsletter-form"
            ref="form"
            @submit.prevent="addNewsletter"
        >   
            <div class="row">
                <div class="col-md-12 col-12 mb-2">
                    <h6>Titlte</h6>
                    <b-form-input class="" placeholder="Title"
                        v-model="title"
                        :state="titleState"
                        trim
                    ></b-form-input>
                    <b-form-invalid-feedback id="input-live-feedback">
                        Required
                    </b-form-invalid-feedback>
                </div>
            </div>
            <h6>Content</h6>
            <client-only>
                <vue-editor class="mb-3"
                    v-model="content"
                ></vue-editor>
            </client-only>
            <b-button class="btn-primary mr-1" type="submit" form="add-newsletter-form"
                @keyup.enter="addNewsletter"
            >Add<b-icon class="ml-2" icon="brush"></b-icon></b-button>
            <nuxt-link to="/admin/newsletters">
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

import { mapActions, mapState } from 'vuex'

export default {
    name: 'AddNewsletter',
    layout: 'admin',
    head: {
        title: "Add Newsletter - Project Z"
    },
    transition: 'fade',
    data() {
        return {
            title: '',
            content: '',
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
            getUserCurrent: state => state.userCurrent,
        }),
        titleState() {
            return this.title.length > 0 ? true : false
        },
    },
    methods: {
        ...mapActions({
            'actAddNewsletter' : 'Newsletter/actAddNewsletter'
        }),
        addNewsletter(){
            
            if(this.title){
                this.actAddNewsletter({
                    title: this.title.replace(/  +/g, ' '), 
                    content: this.content,
                    authorId: this.getUserCurrent.userId,
                    authorName: this.getUserCurrent.userHandle, 
                })
                this.$refs.form.reset()
                this.success = true
            }
            
        }
    }
}
</script>

<style>

</style>