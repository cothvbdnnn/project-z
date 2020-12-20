<template>
    <div>
        <b-row class="header-admin py-2">
            <b-col cols="5" class="row-mobile">
                <nav class="menu-mobile mr-3" role="navigation">
                    <div id="menuToggle">
                        <input type="checkbox" />
                        <span></span>
                        <span></span>
                        <span></span>
                        <ul id="menu">
                            <li class="item" v-for="(listSidebar, i) in listsSidebar" :key="i">
                                <nuxt-link :to="listSidebar.link">
                                    <h6><b-icon :icon="listSidebar.icon"></b-icon>{{ listSidebar.title }}
                                        <b-badge v-if="listSidebar.badge" pill class="ml-2" variant="primary">{{ listSidebar.badge }}</b-badge>
                                    </h6>
                                </nuxt-link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Logo/>
            </b-col>
            <b-col class="d-flex justify-content-end" cols="7">
                <a @click="handleLogOut">LOGOUT</a>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import firebase from "firebase";
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    data() {
        return {
            name: null,
            avatar: null,
        }
    },
    created() {
        if(this.getUser){
            this.name = this.getUser.userHandle
            this.avatar = this.getUser.imageURL
        }
    },
    watch: {
        getUser(){
            this.name = this.getUser.userHandle
            this.avatar = this.getUser.imageURL
        }
    },
    computed: {
        ...mapState({
            isUserLogin: state => state.userCurrent,
            getUser: state => state.userCurrent,
            getComments: state => state.Comment.comments,
            getReviews: state => state.Review.reviews,
            getOrders: state => state.Order.orders
        }),
        filterNewComments(){
            return this.getComments.filter((x) => {
                return x.read == false
            })
        },
        filterNewReviews(){
            return this.getReviews.filter((x) => {
                return x.read == false
            })
        },
        filterNewOrders(){
            return this.getOrders.filter((x) => {
                return x.status == 'Processing'
            })
        },
        listsSidebar(){
            return [
                { link: '/admin', title: 'DASHBOARD', icon: 'columns-gap' },
                { link: '/admin/slides', title: 'SLIDES', icon: 'image' },
                { link: '/admin/comments', title: 'COMMENTS', icon: 'chat-square-text', badge: this.filterNewComments.length },
                { link: '/admin/reviews', title: 'REVIEWS', icon: 'star', badge: this.filterNewReviews.length },
                { link: '/admin/profile', title: 'PROFILE', icon: 'file-earmark-person' },
                { link: '/admin/products', title: 'PRODUCTS', icon: 'box-seam' },
                { link: '/admin/categories', title: 'CATEGORIES', icon: 'folder2-open' },
                { link: '/admin/orders', title: 'ORDERS', icon: 'cart-check', badge: this.filterNewOrders.length }, 
                { link: '/admin/posts', title: 'POSTS', icon: 'brush' },
                { link: '/admin/tags', title: 'TAGS', icon: 'tags' },
                { link: '/admin/customers', title: 'CUSTOMERS', icon: 'people' },
            ]
        }
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
    height: 52px;
    .row-mobile{
        display: flex;
        align-items: center;
    }
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

    .menu-mobile{
        display: none;
        @media screen and ( max-width: 991px ){
            display: block;
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
        & > span{
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
            margin: 15px 0 0 -50px;
            padding: 15px 15px 15px 50px;
            background: #fff;
            height: calc( 100vh - 52px );
            list-style-type: none;
            -webkit-font-smoothing: antialiased;
            transform-origin: 0% 0%;
            transform: translate(-100%, 0);
            transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
            li{
            padding: 10px 0;
            h6{
                display: flex;
                align-items: center;
                svg{
                    width: 25px;
                    height: 25px;
                    margin-right: 10px;
                }
            }
        }
            
        }
        input:checked ~ ul{
            transform: none !important;
        }
    }
}
    
</style>