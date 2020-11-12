<template>
    <div class="container-sidebar">
        <b-row class="row-avatar justify-content-start align-items-center py-2 px-3">
            <b-avatar class="avatar mr-2"
                :src="avatar"
            >
            </b-avatar>
            <h5 class="mb-0">{{ name }}</h5>
        </b-row>
        <ul class="mt-3 mx-0 p-0">
            <li v-for="(listSidebar, i) in listsSidebar" :key="i">
                <nuxt-link :to="listSidebar.link">
                    <h6><b-icon :icon="listSidebar.icon"></b-icon>{{ listSidebar.title }}</h6>
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'SideBar',
    data() {
        return {
            name: null,
            avatar: null,
            listsSidebar: [
                { link: '/admin', title: 'DASHBOARD', icon: 'columns-gap' },
                { link: '/admin/slides', title: 'SLIDES', icon: 'image' },
                { link: '/admin', title: 'COMMENTS', icon: 'chat-square-text' },
                { link: '/admin/profile', title: 'PROFILE', icon: 'file-earmark-person' },
                { link: '/admin/products', title: 'PRODUCTS', icon: 'box-seam' },
                { link: '/admin/categories', title: 'CATEGORIES', icon: 'folder2-open' },
                { link: '/admin/orders', title: 'ORDERS', icon: 'cart-check' }, 
                { link: '/admin/posts', title: 'POSTS', icon: 'brush' },
                { link: '/admin/tags', title: 'TAGS', icon: 'tags' },
                { link: '/admin/customers', title: 'CUSTOMERS', icon: 'people' },
                { link: '/admin', title: 'NEWSLETTER', icon: 'envelope-open' },
            ]
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
            getUser: state => state.userCurrent
        }),
    },
}
</script>

<style lang="scss">

.container-sidebar{
    .row-avatar{
        flex-flow: row nowrap;
        span{
            min-width: 40px;
        }
        h5{
            white-space: nowrap; 
            width: 100%; 
            overflow: hidden;
            text-overflow: ellipsis; 
        }
    }
    ul{
        list-style: none;
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
}

</style>