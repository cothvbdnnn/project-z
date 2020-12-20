<template>
    <div class="content-admin">
        <h3>Add new tag</h3>
         <b-form
            id="add-tag-form"
            ref="form"
            @submit.prevent="addTag"
        >
            <h6>Name</h6>
            <b-form-input class="mb-2" placeholder="Name"
                v-model="nameTag"
                trim
            ></b-form-input>
            <b-button class="btn-primary mr-1" type="submit" form="add-tag-form"
                @keyup.enter="addTag"
            >Add<b-icon class="ml-2" icon="folder-plus"></b-icon></b-button>
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
    name: 'AddTag',
    layout: 'admin',
    head: {
        title: "Add Tag - Project Z"
    },
    transition: 'fade',
    data() {
        return {
            nameTag: '',
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
        })
    },
    methods: {
        ...mapActions({
            'actAddTag' : 'Tag/actAddTag',
        }),
        addTag(){

            // Map array

            let findTag = this.getTags.map(x => {
                return x.name.toLowerCase()
            })

            // Check tag has esixt

            if(this.nameTag != ""){
                if (!findTag.includes(this.nameTag.toLowerCase())) {
                    this.actAddTag(this.nameTag.replace(/[^a-zA-Z ]/g,'').replace(/  +/g, ' '))
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