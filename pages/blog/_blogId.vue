<template>
    <div class="product">
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-12">  
                    <h1>{{ postCurrent.title }}</h1>
                    <h5>Author: {{postCurrent.authorName}} - {{ postCurrent.createAt | filterDate}}</h5>    
                    <div class="content-blog" v-html="postCurrent.content"></div>
                    <h6>Tag<span v-if="postCurrent.tags.length > 1">s</span>: 
                        <span v-for="(tag, i) in postCurrent.tags" :key="i" class="tags">{{tag}}</span>
                    </h6>
                </div>
                <div class="col-12">
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
            </div>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import moment from 'moment';

export default {
    name: 'Blog',
    head: {
        title: "Blog - Project Z"
    },
    transition: 'fade',
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
        }
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
            height: 500px;
        }
    }
</style>