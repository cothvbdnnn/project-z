<template>
    <div>
        <b-container>
            <b-row>
                <b-col cols="lg-5" class="my-5 mx-auto">
                    <b-form
                        id="login-form"
                        ref="form"
                        @submit.prevent="logInUser"
                    >
                        <h6>Email</h6>
                        <b-form-input class="mb-3" placeholder="Email"
                            v-model="email"
                        ></b-form-input>
                        <h6>Password</h6>
                        <b-form-input type="password" class="mb-3" placeholder="Password"
                            v-model="password"
                        ></b-form-input>
                        <b-button class="btn-primary mr-2" type="submit" form="login-form"
                            @keyup.enter="logInUser"
                        >Login</b-button>
                        <NuxtLink to="/sign-up">
                            <b-button class="btn-primary">Sign up</b-button>
                        </NuxtLink>
                        <div class="row mx-0 social-login">
                            <b-button class="btn-primary mr-2 mt-2"
                                @click="logInGoogle"
                            >Login with Google</b-button>
                            <b-button class="btn-primary mt-2"
                                @click="logInFacebook"
                            >Login with Facebook</b-button>
                        </div>
                        <b-alert show variant="danger" class="mt-3 py-1 px-3"
                            v-if="getErrorLogIn != ''"
                        >{{ getErrorLogIn }}</b-alert>
                    </b-form>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
    name: 'LogIn',
    head: {
        title: "Login - Project Z"
    },
    data() {
        return {
            email: '',
            password: '',
        }
    },
    computed: {
        ...mapState({
            getErrorLogIn: state => state.LogIn.errorLogIn,
        }),
    },
    methods: {
        ...mapActions({
            'actLoginUser' : 'LogIn/actLogInUser',
            'actLoginGoogle' : 'LogIn/actLogInGoogle',
            'actLoginFacebook' : 'LogIn/actLogInFacebook'
        }),
        logInUser(){
            this.actLoginUser({
                email: this.email, 
                password: this.password, 
            });
        },
        logInGoogle(){
            this.actLoginGoogle()
        },
        logInFacebook(){
            this.actLoginFacebook()
        }
    }
}
</script>

<style lang="scss">

.social-login{
    button{
        font-size: 12px;
    }
}

</style>