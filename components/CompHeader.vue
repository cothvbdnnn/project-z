<template>
    <div class="header">
        <b-navbar toggleable="lg" >
            <b-container>
                <div class="container-menu">
                <nav class="menu-mobile" role="navigation">
                    <div id="menuToggle">
                        <input type="checkbox" />
                        <span></span>
                        <span></span>
                        <span></span>
                        <ul id="menu">
                            <li class="item hasChild search">
                                <nuxt-link to="">SEARCH</nuxt-link>
                                <div class="wrapDrop">
                                    <b-form
                                        id="search-form"
                                        ref="form"
                                        @submit.prevent="search"
                                    >
                                        <b-input-group>
                                            <b-form-input type="text" v-model="inputSearch" trim></b-form-input>
                                            <b-input-group-append>
                                                <b-button size="sm" class="btn-primary" type="submit" form="search-form"
                                                    @keyup.enter="search"
                                                >
                                                    <b-icon icon="search" />
                                                </b-button>
                                            </b-input-group-append>
                                        </b-input-group>
                                    </b-form>
                                </div>
                            </li>
                            <li v-for="(menu,i) in menus" :key="i" class="item"
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
                            </li>
                            <li class="item hasChild">
                               <a>ACCOUNT</a> 
                                <div class="wrapDrop">
                                    <ul>
                                        <li v-if="isUserLogin == null">
                                            <nuxt-link to="/login">LOGIN</nuxt-link>
                                        </li>
                                        <li v-if="isUserLogin == null">
                                            <nuxt-link to="/sign-up">SIGN UP</nuxt-link>
                                        </li>
                                        <li>
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
                            </li>
                        </ul>
                    </div>
                </nav>
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
                    <div class="item hasChild search">
                        <nuxt-link to="">SEARCH</nuxt-link>
                        <div class="wrapDrop">
                            <b-form
                                id="search-form"
                                ref="form"
                                @submit.prevent="search"
                            >
                                <b-input-group>
                                    <b-form-input type="text" v-model="inputSearch"></b-form-input>
                                    <b-input-group-append>
                                        <b-button class="btn-primary" type="submit" form="search-form"
                                            @keyup.enter="search"
                                        >
                                            <b-icon icon="search" />
                                        </b-button>
                                    </b-input-group-append>
                                </b-input-group>
                            </b-form>
                        </div>
                    </div>
                    <div class="item hasChild">
                        <a>ACCOUNT</a>
                        <div class="wrapDrop">
                            <ul>
                                <li v-if="isUserLogin == null">
                                    <nuxt-link to="/login">LOGIN</nuxt-link>
                                </li>
                                <li v-if="isUserLogin == null">
                                    <nuxt-link to="/sign-up">SIGN UP</nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link to="/cart">CART({{totalQuantity}})</nuxt-link>
                                </li>
                                <li v-if="isUserLogin != null && isUserLogin.role == 'admin'">
                                    <nuxt-link to="/admin">ADMIN</nuxt-link>
                                </li>
                                <li v-if="isUserLogin != null && isUserLogin.role == 'user'">
                                    <nuxt-link to="/profile">PROFILE</nuxt-link>
                                </li>
                                <li v-if="isUserLogin != null">
                                    <nuxt-link to="/wishlist">WISHLIST</nuxt-link>
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
                {title: "OUR STORY", link: "/our-story", submenu: []},
                {title: "NEWSLETTER", link: "/blog", submenu: [
                    {subtitle: "COFFEE", sublink: "/blog"},
                    {subtitle: "TRAVEL", sublink: "/blog"},
                    {subtitle: "LIFE", sublink: "/blog"}
                ]},
                {title: "MENU", link: "/menu", submenu: [
                    {subtitle: "DRINKS MENU", sublink: "/menu"},
                ]},
                {title: "CONTACT", link: "/contact", submenu: []},
            ],
            arrCart: [],
            inputSearch: '',
        }
    },
    computed: {
        ...mapState({
            isUserLogin: state => state.userCurrent,
            getCart: state => state.Cart.cart,
        }),
        totalQuantity(){
            let mapCart = this.getCart.map((a) => {
                return a.quantity
            })
            return mapCart.reduce((a,b) => {
                return a + b
            }, 0)
        }
    },
    methods: {
        ...mapActions({
            'actLogOutUser' : 'LogOut/actLogOutUser',
        }),
        handleLogOut(){
            this.actLogOutUser();
        },
        search(){
            if(this.inputSearch != ""){
                this.$router.push("/search?key=" + this.inputSearch)
            }
        }
    }
}
</script>

<style lang="scss">
.navbar{
    padding: 20px 0;
    @media screen and ( max-width: 1024px ){
        padding: 10px 0;
        position: fixed;
        top: 0;
        width: 100%;
        background-color: #fff;
        z-index: 30;
    }
    .container-menu{
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        @media screen and ( max-width: 1024px ){
            padding: 0 15px;
        }
        .menu-mobile{
            display: none;
            @media screen and ( max-width: 1024px ){
                display: block;
            }
        }
        .navbar-brand{
            @media screen and ( max-width: 1024px ){
                margin: 0 calc( 100%/2 - 42.5px) 0 calc( 100%/2 - 65.5px);
            }
        }
        .menu{
            display: flex;
            @media screen and ( max-width: 1024px ){
                display: none;
            }
            .item{
                padding: 0 30px;
                position: relative;
                &.search{
                    .wrapDrop{
                        width: 300px;
                        left: -50%;
                        .input-group-append{
                            height: 35px;
                        }
                    }
                }
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
            
        }
        #menuToggle{
            display: block;
            position: relative;
            z-index: 1;
            -webkit-user-select: none;
            user-select: none;
            input{
                display: block;
                width: 40px;
                height: 32px;
                position: absolute;
                top: -7px;
                left: -5px;
                cursor: pointer;
                opacity: 0;
                z-index: 2;
                -webkit-touch-callout: none;
            }
            span{
                display: block;
                width: 25px;
                height: 3px;
                margin-bottom: 5px;
                position: relative;
                background: #3f5d18;
                border-radius: 3px;
                z-index: 1;
                transform-origin: 4px 0px;
                transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0), background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                opacity 0.55s ease;
                &:first-child{
                    transform-origin: 0% 0%;
                }
                &:nth-last-child(2){
                    transform-origin: 0% 100%;
                }
            }
            input:checked ~ span{
                opacity: 1;
                transform: rotate(-45deg) translate(-16px, 10px);
                background: #3f5d18;
                &:nth-last-child(3){   
                    opacity: 0;
                    transform: rotate(0deg) scale(0.2, 0.2);
                }
                &:nth-last-child(2){
                    transform: rotate(45deg) translate(-11px, -7px);
                }
            }
            #menu{
                overflow-y: scroll;
                position: absolute;
                width: 300px;
                margin: 24px 0 0 -50px;
                padding: 0 15px 15px 50px;
                background: #fff;
                height: calc( 100vh - 70px );
                list-style-type: none;
                -webkit-font-smoothing: antialiased;
                transform-origin: 0% 0%;
                transform: translate(-100%, 0);
                transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
                li{
                    padding: 3px 0;
                    font-size: 22px;
                    &.search{
                        .input-group{
                            flex-wrap: nowrap;
                            margin-top: 10px;
                            input.form-control{
                                top: 0;
                                width: 100%;
                                position: relative;
                                cursor: default;
                                opacity: 1;
                                left: 0;
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
                        position: relative;
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
                    .wrapDrop{
                        ul{
                            padding-left: 20px;
                            li{
                                padding: 0;
                                list-style: none;
                                a{
                                    font-size: 16px;
                                }
                            }
                        }
                    }
                }
                
            }
            input:checked ~ ul{
                transform: none !important;
            }
        }
    }
    
}
    
</style>