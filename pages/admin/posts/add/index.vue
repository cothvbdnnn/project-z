<template>
    <div class="content-admin">
        <h3>Add new post</h3>
         <b-form
            id="add-post-form"
            ref="form"
            @submit.prevent="addPost"
        >   
            <div class="row my-3">
                <div class="col-12">
                    <b-button class="btn-primary "
                        @click="handleChangeImage"
                    >Featured Image<b-icon class="ml-2" icon="card-image"></b-icon>
                    </b-button>
                    <div class="required-feedback" v-if="!imagePost">
                        Required
                    </div>
                </div>
            </div>
            <div class="row mb-3" v-if="imagePost">
                <div class="col-12">
                    <img class="image-preview" alt="image"
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
                    <h6>Titlte</h6>
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
                <b-form-textarea class="mb-3" v-model="excerpt">

                </b-form-textarea>
            <h6>Content</h6>
            <client-only>
                <vue-editor class="mb-3"
                    v-model="content"
                ></vue-editor>
            </client-only>
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
            <b-button class="btn-primary mr-1" type="submit" form="add-post-form"
                @keyup.enter="addPost"
            >Add<b-icon class="ml-2" icon="brush"></b-icon></b-button>
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
    name: 'AddPost',
    layout: 'admin',
    head: {
        title: "Add Post - Project Z"
    },
    transition: 'fade',
    data() {
        return {
            title: '',
            content: '',
            excerpt: '',
            imagePost: null,
            imagePreview: null,
            selectTags: [],
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
            getTags: state => state.Tag.tags,
            getUserCurrent: state => state.userCurrent,
        }),
        titleState() {
            return this.title.length > 0 ? true : false
        },
    },
    methods: {
        ...mapActions({
            'actAddPost' : 'Post/actAddPost'
        }),
        onFileChange(e){
            if(e != null){
                this.imagePreview = window.URL.createObjectURL(e.target.files[0]);
            }
        },
        handleChangeImage(){
            this.$refs.changeImage.$el.querySelector('input[type=file]').click()
        },
        addPost(){
            
            if(this.title && this.imagePost != null){
                this.actAddPost({
                    title: this.title.replace(/[^a-zA-Z ]/g,'').replace(/  +/g, ' '), 
                    content: this.content,
                    image: this.imagePost,
                    tags: this.selectTags,
                    excerpt: this.excerpt,
                    authorId: this.getUserCurrent.userId,
                    authorName: this.getUserCurrent.userHandle,
                    authorImage: this.getUserCurrent.imageURL, 
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