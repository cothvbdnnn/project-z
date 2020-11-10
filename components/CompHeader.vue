<template>
    <div class="header">
        <b-navbar class="py-3" toggleable="lg" >
            <b-container>
            <div class="menu">
                <div v-for="(menu,i) in menus.slice(0, 3)" :key="i" class="item" 
                    :class="menu.submenu.length > 0 ? 'hasChild' : null"
                >
                    <nuxt-link :to="menu.link">{{ menu.title }}</nuxt-link>
                    <div class="wrapDrop" v-if="menu.submenu.length > 0">
                        <ul>
                            <li v-for="(sub,i) in menu.submenu" :key="i">
                                <a :href="sub.sublink">{{ sub.subtitle }}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <b-navbar-brand>
                <Logo/>
            </b-navbar-brand>
            <div class="menu">
                <div v-for="(menu,i) in menus.slice(3, 5)" :key="i" class="item"
                    :class="menu.submenu.length > 0 ? 'hasChild' : null"
                >
                    <nuxt-link :to="menu.link">{{ menu.title }}</nuxt-link>
                    <div class="wrapDrop" v-if="menu.submenu.length > 0">
                        <ul>
                            <li v-for="(sub,i) in menu.submenu" :key="i">
                                <a :href="sub.sublink">{{ sub.subtitle }}</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="item hasChild">
                    <nuxt-link to="">ACCOUNT</nuxt-link>
                    <div class="wrapDrop">
                        <ul>
                            <li v-if="isUserLogin == null">
                                <nuxt-link to="/login">LOGIN</nuxt-link>
                            </li>
                            <li v-if="isUserLogin == null">
                                <nuxt-link to="/sign-up">SIGN UP</nuxt-link>
                            </li>
                            <li v-if="isUserLogin != null">
                                <nuxt-link to="/cart">CART</nuxt-link>
                            </li>
                            <li v-if="isUserLogin != null">
                                <nuxt-link to="/admin">ADMIN</nuxt-link>
                            </li>
                            <li v-if="isUserLogin != null">
                                <a @click="handleLogOut">
                                    LOGOUT
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
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
            menus: [
                {title: "OUR STORY", link: "/", submenu: []},
                {title: "NEWSLETTER", link: "/", submenu: [
                    {subtitle: "Cộng Caphe", sublink: "/"},
                    {subtitle: "Here & There", sublink: "/"},
                    {subtitle: "Brew Guides", sublink: "/"}
                ]},
                {title: "MENU", link: "/shop", submenu: [
                    {subtitle: "DRINKS MENU", sublink: "/"},
                    {subtitle: "GROCERIES", sublink: "/"}
                ]},
                {title: "CARRERS", link: "/", submenu: []},
                {title: "CONTACT", link: "/", submenu: []},
            ],
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
    .menu{
        display: flex;
        .item{
            padding: 0 30px;
            position: relative;
            &:first-child{
                padding-left: 0;
            }
            &:last-child{
                padding-right: 0;
            }
            &:hover .wrapDrop{
                top: 120%;
                opacity: 1;
                visibility: visible;
            }
            .wrapDrop{
                position: absolute;
                top: 160%;
                left: 0;
                z-index: 9;
                background: #fff;
                -webkit-box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.15);
                box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.15);
                width: 200px;
                border-radius: 0 0 5px 5px;
                -webkit-transition: all 0.3s ease;
                -o-transition: all 0.3s ease;
                transition: all 0.3s ease;
                opacity: 0;
                visibility: hidden;
                ul{
                    padding: 0;
                    margin: 0;
                    list-style: none;
                    li{
                        padding: 7px 15px;
                        text-align: left;
                        margin: 0;
                        border-bottom: 1px solid #ddd;
                        a{
                            font-size: 16px;
                            text-transform: none;
                        }
                    }
                }
            }
            a{
                text-transform: uppercase;
                -webkit-transition: all 0.25s ease;
                -o-transition: all 0.25s ease;
                transition: all 0.25s ease;
                font-size: 20px;
                display: inline-block;
                outline: none;
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
        
    }
}
    
</style>