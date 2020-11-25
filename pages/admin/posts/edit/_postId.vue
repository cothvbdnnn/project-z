<template>
    <div class="content-admin">
        <h3>Edit post</h3>
         <b-form
            id="edit-post-form"
            ref="form"
            @submit.prevent="editPost"
        >
            <div class="row my-3">
                <div class="col-12">
                    <b-button class="btn-primary "
                        @click="handleChangeImage"
                    >Featured Image<b-icon class="ml-2" icon="card-image"></b-icon>
                    </b-button>
                </div>
            </div>
            <div class="row mb-3" >
                <div class="col-12">
                    <img class="image-preview" alt="image" v-if="imagePreview"
                        :src="imagePreview"
                    >
                </div>
            </div>
            <b-form-file
                v-model="imagePost"
                @change="onFileChange"
                class="d-none"
                type="file"
                accept="image/*"
                ref="changeImage"
            ></b-form-file>
            <div class="row">
                <div class="col-md-12 col-12 mb-2">
                    <h6>Title</h6>
                    <b-form-input class="" placeholder="Title"
                        v-model="title"
                        :state="titleState"
                    ></b-form-input>
                    <b-form-invalid-feedback id="input-live-feedback">
                        Required
                    </b-form-invalid-feedback>
                </div>
            </div>
            <h6>Excerpt</h6>
            <b-form-textarea class="mb-3" v-model="excerpt"></b-form-textarea>
            <div class="row">
                <div class="col-md-12 col-12">
                    <h6>Content</h6>
                    <client-only>
                        <vue-editor class="mb-3"
                            v-model="content"
                        ></vue-editor>
                    </client-only>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-12">
                    <b-form-checkbox-group
                        class="btn-checkbox"
                        v-model="selectTags"
                        name="buttons-1"
                        buttons
                    >
                        <b-form-checkbox v-for="(tag,i) in getTags" :key="i" 
                            :value="tag.name"
                        >{{tag.name}}</b-form-checkbox>
                    </b-form-checkbox-group>
                </div>
            </div>
            <b-button class="btn-primary mr-1" type="submit" form="edit-post-form"
                @keyup.enter="editPost"
            >Edit<b-icon class="ml-2" icon="pencil"></b-icon></b-button>
            <nuxt-link class="mr-1" target="_blank" :to="/blog/+ title + '?id=' + id | fomartLink">
                <b-button class="btn-primary">
                    View <b-icon icon="eye"></b-icon>
                </b-button>
            </nuxt-link>
            <nuxt-link to="/admin/posts">
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
    name: 'EditPost',
    layout: 'admin',
    head: {
        title: "Edit Post - Project Z"
    },
    transition: 'fade',
    validate(context){
        if(!/^\d+$/.test(context.params.postId)){
            context.redirect('/admin/posts')
        }
        return true
    },
    data() {
        return {
            id: '',
            title: '',
            content: '',
            excerpt: '',
            selectTags: null,
            imagePost: null,
            imagePreview: null,
            imageOld: null,
            success: false,
            fail: false,
        }
    },
    filters: {
        fomartLink(text) {
            return text.split(' ').join('-').toLowerCase()
        },
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
        if (this.postCurrent) {
            this.id = this.postCurrent.id
            this.title = this.postCurrent.title
            this.excerpt = this.postCurrent.excerpt
            this.content = this.postCurrent.content
            this.selectTags = this.postCurrent.tags
            this.imagePreview = this.postCurrent.image
            this.imageOld = this.postCurrent.image
        }
    },
    computed: {
        ...mapState({
            getPosts: state => state.Post.posts,
            getTags: state => state.Tag.tags,
        }),
        postCurrent(){
            return this.getPosts[this.$route.params.postId]
        },
        titleState() {
            return this.title.length > 0 ? true : false
        },
    },
    methods: {
        ...mapActions({
            'actEditPost' : 'Post/actEditPost'
        }),
        onFileChange(e){
            if(e != null){
                this.imagePreview = window.URL.createObjectURL(e.target.files[0]);
            }
        },
        handleChangeImage(){
            this.$refs.changeImage.$el.querySelector('input[type=file]').click()
        },
        editPost(){

            if(this.title ){

                this.actEditPost({
                    title: this.title.replace(/[^a-zA-Z ]/g,'').replace(/  +/g, ' '), 
                    excerpt: this.excerpt,
                    content: this.content,
                    image: this.imagePost,
                    imageOld: this.imageOld,
                    tags: this.selectTags,
                    id: this.postCurrent.id,
                    index: this.$route.params.postId
                })
                this.success = true
                    
            }
            
        }
    }
}
</script>

<style>

</style>