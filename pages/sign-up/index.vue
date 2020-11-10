<template>
    <div>
        <b-container>
            <b-row>
                <b-col cols="lg-5" class="my-5 mx-auto">
                    <b-form
                        id="register-form"
                        ref="form"
                        @submit.prevent="registerUser"
                    >
                        <h6>Email</h6>
                        <b-form-input class="mb-3" placeholder="Email"
                            v-model="email"
                            :state="isEmailStateValid"
                        ></b-form-input>
                        <h6>Password</h6>
                        <b-form-input type="text" class="mb-3" placeholder="Password"
                            v-model="password"
                            :state="isPasswordStateValid"
                        ></b-form-input>
                        <h6>User name</h6>
                        <b-form-input type="text" class="mb-3" placeholder="User name"
                            v-model="userName"
                            :state="isNameStateValid"
                        ></b-form-input>
                        <b-button class="btn-primary mr-2" type="submit" form="register-form"
                            @keyup.enter="registerUser"
                        >Sign up</b-button>
                        <NuxtLink to="/login">
                            <b-button class="btn-primary">Login</b-button>
                        </NuxtLink>
                        <b-alert show variant="danger" class="mt-3 py-1 px-3"
                            v-if="getErrorSignUp != ''"
                        >{{ getErrorSignUp }}</b-alert>
                    </b-form>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
    name: 'SignUp',
    head: {
        title: "Sign Up - Project Z"
    },
    data() {
        return {
            email: '',
            password: '',
            userName: '',
        }
    },
    computed: {
        ...mapState({
            getErrorSignUp: state => state.SignUp.errorSignUp,
        }),
        isNameStateValid() {
            if (this.userName) {
                return this.isNameValid(this.userName);
            }
            return null;
        },
        isPasswordStateValid() {
            if (this.password) {
                return this.isPasswordValid(this.password);
            }
            return null;
        },
        isEmailStateValid() {
            if (this.email) {
                return this.isEmailValid(this.email);
            }
            return null;
        },
    },
    methods: {
        ...mapActions({
            'actRegisterUser' : 'SignUp/actRegisterUser'
        }),
        registerUser(){
            this.actRegisterUser({
                email: this.email, 
                password: this.password, 
                userName: this.userName
            });
        },
        isNameValid() {
            return this.userName.length > 0 ? true : false;
        },
        isPasswordValid(){
            return this.password.length > 5 ? true : false;
        },
        isEmailValid(){
            return this.email.length > 5 ? true : false;
        }
    }
}
</script>

<style>

</style>