<template>
    <div class="product">
        <div class="container">
            <div class="row">
                <div class="col-md-8 col-12">
                    <h1 class="text-primary">{{ postCurrent.title }}</h1>
                    <CompShare />
                    <h5 class="mt-3">Author: <span><nuxt-link :to="'/author/' + postCurrent.authorName | fomartLink">{{postCurrent.authorName}}</nuxt-link></span> - {{ postCurrent.createAt | filterDate}}</h5>    
                    <div class="content-blog" v-html="postCurrent.content"></div>
                    <h6>Tag<span v-if="postCurrent.tags.length > 1">s</span>: 
                        <span v-for="(tag, i) in postCurrent.tags" :key="i" class="tags">
                            <nuxt-link :to="'/tag/' + tag | fomartLink">{{tag}}</nuxt-link>
                        </span>
                    </h6>
                    <CompComments
                        :idPost="postCurrent.id"
                        :namePost="postCurrent.title"
                        :imagePost="postCurrent.image"
                        :userId="userId"
                        :userName="userName"
                        :userImage="userImage"
                        :postType="'blog'"
                    />
                </div>
                <div class="col-md-4 col-12">
                    <CompRelatedPost
                        :idPost="postCurrent.id"
                        :tags="postCurrent.tags"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import moment from 'moment';

export default {
    name: 'Post',
    head() {
        return {
            title: this.postCurrent.title + ' - Project Z',
            meta: [
                {
                    hid: this.postCurrent.title + ' - Project Z',
                    name: this.postCurrent.title + ' - Project Z',
                }
            ]
        }
    },
    transition: 'fade',
    async validate(context) {
        const posts = await context.store.state.Post.posts
        for(let i in posts){
           if(posts[i].id == context.query.id){
                return true
           }
        }
    },
    data() {
        return {
            userId: '',
            userName: '',
            userImage: '',
        }
    },
    filters: {
        filterDate: function (date) {
            return moment(date).format('l');
        },
        fomartLink(text) {
            return text.split(' ').join('-').toLowerCase()
        },
    },
    created() {
        if(this.getUserCurrent){
            this.userId = this.getUserCurrent.userId
            this.userName = this.getUserCurrent.userHandle
            this.userImage = this.getUserCurrent.imageURL
        }
    },
    computed: {
        ...mapState({
            getPosts: state => state.Post.posts,
            getUserCurrent: state => state.userCurrent,
        }),
        postCurrent(){
            return this.getPosts.find( x => {
                return x.id == this.$route.fullPath.split('?id=')[1]
            })
        },
    },
}
</script>

<style lang="scss">
    .content-blog{
        iframe.ql-video{
            width: 100%;
            height: 350px;
        }
    }
    .item-blog{
        .container-item{
            overflow: hidden;
            height: 100%;
            img{
                height: 100px;
                width: 100%;
                object-fit: cover;
            }
            .content{
                height: 100px;
                h5{
                    margin-bottom: 0;
                    font-size: 20px;
                }
            }
        }   
    }
</style>