<template>
    <div class="content-admin">
        <h3>Edit Newsletter</h3>
         <b-form
            id="edit-newsletter-form"
            ref="form"
            @submit.prevent="editNewsletter"
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
            <b-button class="btn-primary mr-1" type="submit" form="edit-newsletter-form"
                @keyup.enter="editNewsletter"
            >Edit<b-icon class="ml-2" icon="brush"></b-icon></b-button>
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
    name: 'EditNewsletter',
    layout: 'admin',
    head: {
        title: "Edit Newsletter - Project Z"
    },
    transition: 'fade',
    data() {
        return {
            id: '',
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
    created() {
        if (this.newsletterCurrent) {
            this.id = this.newsletterCurrent.id
            this.title = this.newsletterCurrent.title
            this.content = this.newsletterCurrent.content
        }
    },
    computed: {
        ...mapState({
            getNewsletters: state => state.Newsletter.newsletters,
        }),
        newsletterCurrent(){
            return this.getNewsletters[this.$route.params.newsletterId]
        },
        titleState() {
            return this.title.length > 0 ? true : false
        },
    },
    methods: {
        ...mapActions({
            'actEditNewsletter' : 'Newsletter/actEditNewsletter'
        }),
        editNewsletter(){
            
            if(this.title != null){
                this.actEditNewsletter({
                    id: this.id,
                    title: this.title.replace(/  +/g, ' '), 
                    content: this.content, 
                })
                this.success = true
            }
            
        }
    }
}
</script>

<style>

</style>