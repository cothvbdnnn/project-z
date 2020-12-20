<template>
    <div class="content-admin">
        <h3>Profile</h3>
         <b-form
            id="edit-profile-form"
            ref="form"
            @submit.prevent="editProfile"
        >   
            <div class="row my-3">
                <div class="col-12">
                    <b-button class="btn-primary "
                        @click="handleChangeImage"
                    >Avatar<b-icon class="ml-2" icon="card-image"></b-icon>
                    </b-button>
                </div>
            </div>
            <div class="row mb-3" v-if="imagePreview">
                <div class="col-12">
                    <img class="image-preview" alt="image"
                        :src="imagePreview"
                    >
                </div>
            </div>
            <b-form-file
                v-model="avatar"
                @change="onFileChange"
                class="d-none"
                type="file"
                accept="image/*"
                ref="changeImage"
            ></b-form-file>
            <div class="row">
                <div class="col-md-6 col-12 mb-2">
                    <h6>Name</h6>
                    <b-form-input class="" placeholder="Name"
                        v-model="name"
                        :state="nameState"
                        trim
                    ></b-form-input>
                    <b-form-invalid-feedback id="input-live-feedback">
                        Required
                    </b-form-invalid-feedback>
                </div>
                <div class="col-md-6 col-12 mb-2">
                    <h6>Email</h6>
                    <b-form-input class="" placeholder="Email"
                        v-model="email"
                        type="email"
                        trim
                    ></b-form-input>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-12 mb-2">
                    <h6>Phone</h6>
                    <b-form-input class="" placeholder="Phone"
                        v-model="phone"
                        type="number"
                        trim
                        onkeydown="return event.keyCode !== 69"
                    ></b-form-input>
                </div>
            </div>
            <h6>Address</h6>
            <b-form-textarea class="mb-3" v-model="address"
                placeholder="Address"
                trim
            ></b-form-textarea>
            <b-button class="btn-primary mr-1" type="submit" form="edit-profile-form"
                @keyup.enter="editProfile"
            >Save<b-icon class="ml-2" icon="check"></b-icon></b-button>
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
    name: 'Profile',
    layout: 'admin',
    head: {
        title: "Profile - Project Z"
    },
    transition: 'fade',
    data() {
        return {
            name: '',
            avatar: null,
            imagePreview: '',
            email: '',
            phone: '',
            address: '',
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
        },
    },
    created(){
        if(this.getUser){
            this.name = this.getUser.userHandle
            this.imagePreview = this.getUser.imageURL
            this.email = this.getUser.email
            this.phone = this.getUser.phone
            this.address = this.getUser.address
        }
    },
    computed: {
        ...mapState({
            getUser: state => state.userCurrent
        }),
        nameState() {
            return this.name.length > 0 ? true : false
        },
    },
    methods: {
        ...mapActions({
            'actEditProfile' : 'actEditProfile'
        }),
        onFileChange(e){
            if(e != null){
                this.imagePreview = window.URL.createObjectURL(e.target.files[0]);
            }
        },
        handleChangeImage(){
            this.$refs.changeImage.$el.querySelector('input[type=file]').click()
        },
        editProfile(){
            if(this.nameState){
                this.actEditProfile({
                    userHandle: this.name,
                    avatar: this.avatar,
                    avatarOld: this.imagePreview,
                    email: this.email,
                    phone: this.phone,
                    address: this.address,
                    id: this.getUser.userId,
                    role: this.getUser.role,
                    createAt: this.getUser.createAt,
                })
                this.success = true
            }
        }
    },
}
</script>

<style>

</style>