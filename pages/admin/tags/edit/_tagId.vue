<template>
    <div class="content-admin">
        <h3>Edit Tag {{ nameTag }}</h3>
         <b-form
            id="edit-tag-form"
            ref="form"
            @submit.prevent="editTag"
        >
            <h6>Name</h6>
            <b-form-input class="mb-2" placeholder="Name"
                v-model="nameTag"
            ></b-form-input>
            <b-button class="btn-primary mr-1" type="submit" form="edit-tag-form"
                @keyup.enter="editTag"
            >Edit<b-icon class="ml-2" icon="pencil"></b-icon></b-button>
            <nuxt-link to="/admin/tags">
                <b-button class="btn-primary"
                >Back</b-button>
            </nuxt-link>
            <b-alert show variant="danger" class="mt-3 py-1 px-3"
                v-if="fail == true"
            >Tag already exist!</b-alert>
            <b-alert show variant="primary" class="mt-3 py-1 px-3"
                v-if="success == true"
            >Success</b-alert>
        </b-form>
    </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
    name: 'EditTag',
    layout: 'admin',
    head: {
        title: "Edit Tag - Project Z"
    },
    transition: 'fade',
    validate(context){
        if(!/^\d+$/.test(context.params.tagId)){
            context.redirect('/admin/tags')
        }
        return true
    },
    data() {
        return {
            success: false,
            fail: false,
            nameTag: '',
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
        if(this.tagCurrent){
            this.nameTag =  this.tagCurrent.name
        }
    },
    computed: {
        ...mapState({
            getTags: state => state.Tag.tags,
        }),
        tagCurrent(){
            return this.getTags[this.$route.params.tagId]
        },
    },
    methods: {
        ...mapActions({
            'actEditTag' : 'Tag/actEditTag'
        }),
        editTag(){

            // Map array

            let findTag = this.getTags.map(x => {
                return x.name.toLowerCase()
            })
            // Check tag esixt

            if(this.nameTag != ""){
                if (!findTag.includes(this.nameTag.toLowerCase())) {
                    this.actEditTag({
                        tagUpdate: this.nameTag, 
                        id: this.tagCurrent.id, 
                        index: this.$route.params.tagId,
                        tagOld: this.tagCurrent.name
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