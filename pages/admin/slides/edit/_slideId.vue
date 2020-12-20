<template>
    <div class="content-admin">
        <h3>Edit slide</h3>
         <b-form
            id="edit-slide-form"
            ref="form"
            @submit.prevent="editSlide"
        >
            <div class="row my-3">
                <div class="col-12">
                    <b-button class="btn-primary "
                        @click="handleChangeImage"
                    >Image<b-icon class="ml-2" icon="card-image"></b-icon>
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
            <div class="row">
                <div class="col-md-12 col-12">
                    <h6>Description</h6>
                    <client-only>
                        <vue-editor class="mb-3"
                            v-model="description"
                        ></vue-editor>
                    </client-only>
                </div>
            </div>
            <b-button class="btn-primary mr-1" type="submit" form="edit-slide-form"
                @keyup.enter="editSlide"
            >Edit<b-icon class="ml-2" icon="pencil"></b-icon></b-button>
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
    name: 'EditSlide',
    layout: 'admin',
    head: {
        title: "Edit Slide - Project Z"
    },
    transition: 'fade',
    validate(context){
        if(!/^\d+$/.test(context.params.slideId)){
            context.redirect('/admin/slides')
        }
        return true
    },
    data() {
        return {
            title: '',
            description: '',
            selectCat: null,
            success: false,
            fail: false,
            imageSlide: null,
            imagePreview: null,
            imageOld: null,
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
        if (this.slideCurrent) {
            this.title = this.slideCurrent.title
            this.description = this.slideCurrent.description
            this.imagePreview = this.slideCurrent.image
            this.imageOld = this.slideCurrent.image
        }
    },
    computed: {
        ...mapState({
            getSlides: state => state.Slide.slides,
        }),
        slideCurrent(){
            return this.getSlides[this.$route.params.slideId]
        },
    },
    methods: {
        ...mapActions({
            'actEditSlide' : 'Slide/actEditSlide'
        }),
        onFileChange(e){
            if(e != null){
                this.imagePreview = window.URL.createObjectURL(e.target.files[0]);
            }
        },
        handleChangeImage(){
            this.$refs.changeImage.$el.querySelector('input[type=file]').click()
        },
        editSlide(){

            this.actEditSlide({
                title: this.title, 
                description: this.description,
                image: this.imageSlide,
                imageOld: this.imageOld,
                id: this.slideCurrent.id,
                index: this.$route.params.slideId
            })
            this.success = true
        }
    }
}
</script>

<style>

</style>