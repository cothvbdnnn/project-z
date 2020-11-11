<template>
    <div>
        <b-row class="header-admin py-2">
            <b-col cols="2">
                <Logo/>
            </b-col>
            <b-col class="d-flex justify-content-end" cols="10">
                <a @click="handleLogOut">LOGOUT</a>
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
    align-items: center;
    border-bottom: 1px solid #ccc;
    .logo{
        max-width: 70px;
        a{
            &:after{
                display: none;
            }
        }
    }
    a{
        text-transform: uppercase;
        -webkit-transition: all 0.25s ease;
        -o-transition: all 0.25s ease;
        transition: all 0.25s ease;
        font-size: 18px;
        display: inline-block;
        outline: none;
        cursor: pointer;
        position: relative;
        &:hover:after{
            width: 100%;
        }
        &:after{
            content: '';
            position: absolute;
            bottom: 0;
            width: 0;
            background: #3c5e2c;
            height: 1px;
            left: 0;
            -webkit-transition: all 0.25s ease;
            -o-transition: all 0.25s ease;
            transition: all 0.25s ease;
        }
    }
}
    
</style>