<template>
    <div>
        <b-navbar class="py-1" toggleable="lg" >
            <b-container>
            <b-navbar-brand>
                <Logo/>
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <NuxtLink to="/login" v-if="isUserLogin == null">
                        <b-button class="btn-primary mx-2">Login</b-button>
                    </NuxtLink>
                    <NuxtLink to="/cart">
                        <b-button class="btn-primary mx-2">Cart</b-button>
                    </NuxtLink>
                    <NuxtLink to="/shop">
                        <b-button class="btn-primary mx-2">Shop</b-button>
                    </NuxtLink>
                    <NuxtLink to="/admin" v-if="isUserLogin != null">
                        <b-button class="btn-primary mx-2">Admin</b-button>
                    </NuxtLink>
                    <b-button class="btn-primary mx-2"
                        @click="handleLogOut"
                        v-if="isUserLogin != null"
                    >Logout</b-button>
                </b-navbar-nav>
            </b-collapse>
            </b-container>
            
        </b-navbar>
        </div>
</template>

<script>
import firebase from "firebase";
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            isUserLogin: state => state.userCurrent,
        })
    },
    methods: {
        ...mapActions({
            'actLogOutUser' : 'LogOut/actLogOutUser',
        }),
        handleLogOut(){
            this.actLogOutUser();
        }
    }
}
</script>

<style lang="scss">
.navbar{
    border-bottom: 1px solid #dadada;
    .navbar-brand{
        svg{
            height: 45px;
        }
    }
}
    
</style>