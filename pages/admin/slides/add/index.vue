<template>
    <div class="content-admin">
        <h3>Add new slide</h3>
         <b-form
            id="add-slide-form"
            ref="form"
            @submit.prevent="addSlide"
        >   
            <div class="row my-3">
                <div class="col-12">
                    <b-button class="btn-primary "
                        @click="handleChangeImage"
                    >Image<b-icon class="ml-2" icon="card-image"></b-icon>
                    </b-button>
                    <div class="required-feedback" v-if="!imageSlide">
                        Required
                    </div>
                </div>
            </div>
            <div class="row mb-3" v-if="imageSlide">
                <div class="col-12">
                    <img class="image-preview" alt="image"
                        :src="imagePreview"
                    >
                </div>
            </div>
            <b-form-file
                v-model="imageSlide"
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
                        trim
                    ></b-form-input>
                </div>
            </div>
            <h6>Description</h6>
            <client-only>
                <vue-editor class="mb-3"
                    v-model="description"
                ></vue-editor>
            </client-only>
            <b-button class="btn-primary mr-1" type="submit" form="add-slide-form"
                @keyup.enter="addSlide"
            >Add<b-icon class="ml-2" icon="image"></b-icon></b-button>
            <nuxt-link to="/admin/slides">
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
    name: 'AddSlide',
    layout: 'admin',
    head: {
        title: "Add Slide - Project Z"
    },
    transition: 'fade',
    data() {
        return {
            content: '<h1>Some initial content</h1>',
            title: '',
            description: '',
            success: false,
            fail: false,
            imageSlide: null,
            imagePreview: null,
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
    methods: {
        ...mapActions({
            'actAddSlide' : 'Slide/actAddSlide'
        }),
        onFileChange(e){
            if(e != null){
                this.imagePreview = window.URL.createObjectURL(e.target.files[0]);
            }
        },
        handleChangeImage(){
            this.$refs.changeImage.$el.querySelector('input[type=file]').click()
        },
        addSlide(){

            if(this.imageSlide != null){
                this.actAddSlide({
                    title: this.title, 
                    description: this.description,
                    image: this.imageSlide,
                })
                this.$refs.form.reset()
                this.success = true
            }
            
        }
    },
}
</script>

<style>

</style>