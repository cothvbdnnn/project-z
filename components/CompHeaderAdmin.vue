<template>
    <div>
        <b-row class="header-admin py-2">
            <b-col cols="2">
                <Logo/>
            </b-col>
            <b-col class="d-flex justify-content-end" cols="10">
                <b-button class="btn-primary mx-2"
                    @click="handleLogOut"
                >Logout</b-button>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import firebase from "firebase";
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
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
.header-admin{
    border-bottom: 1px solid #ccc;
    svg{
        height: 35px;
    }
}
    
</style>