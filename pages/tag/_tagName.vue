<template>
    <div class="blog">
        <div class="container">
            <div class="row">
                <div class="col-md-8 col-12">
                    <h1 class="text-primary">Tag:<span class="text-capitalize">{{tagCurrent}}</span></h1>
                    <div class="row mt-4">
                        <div class="col-md-12 col-sm-12 col-12 item-blog"
                            v-for="(post,i) in filterPosts"
                            :key="i"
                        >   
                            <div class="container-item">
                                <div class="row">
                                    <div class="col-md-6 col-12">
                                        <nuxt-link :to="/blog/+ post.title + '?id=' + post.id | fomartLink">
                                            <b-img
                                                :src="post.image"
                                            >
                                            </b-img>
                                        </nuxt-link>
                                    </div>
                                    <div class="col-md-6 col-12">
                                        <div class="content">
                                            <nuxt-link :to="/blog/+ post.title + '?id=' + post.id | fomartLink">
                                                <h5 class="mb-2 text-primary"><strong>{{ post.title }}</strong></h5>
                                            </nuxt-link>
                                            <h6 class="mb-1 text-primary"><strong>Author: 
                                                <span>
                                                    <nuxt-link :to="'/author/' + post.authorName | fomartLink">{{post.authorName}}</nuxt-link>
                                                </span> - {{ post.createAt | filterDate}}</strong>
                                            </h6>
                                            <p class="mb-1">{{ post.excerpt | truncate(150, '...') }}</p>
                                            <h6 class="text-primary"><strong>Tag<span v-if="post.tags.length > 1">s</span>: 
                                                <span v-for="(tag, i) in post.tags" :key="i" class="tags">
                                                    <nuxt-link :to="'/tag/' + tag | fomartLink">{{tag}}</nuxt-link>
                                                </span></strong>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-12">
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import moment from 'moment';
import firebase from "firebase";

export default {
    name: 'Tag',
    head: {
        title: "Tag - Project Z"
    },
    transition: 'fade',
    async validate(context) {
        if(context.params.tagName){
            const tags = await context.store.state.Tag.tags
            for(let i in tags){
                if(tags[i].name.toLowerCase() == context.params.tagName.split('-').join(' ')){
                    return true
                }
            }
        }else{
            context.redirect('/blog')
        }
    },
    data() {
        return {
            
        }
    },
    filters: {
        fomartLink(text) {
            return text.split(' ').join('-').toLowerCase()
        },
        filterDate: function (date) {
            return moment(date).format('l');
        },
        truncate(text, length, suffix) {
            if (text.length > length) {
                return text.substring(0, length) + suffix;
            } else {
                return text;
            }
        },
    },
    computed: {
        ...mapState({
            getPosts: state => state.Post.posts,
        }),
        tagCurrent(){
            return this.$route.params.tagName.split('-').join(' ')
        },
        filterPosts(){
            return this.getPosts.filter( x => {
                return x.tags.toString().toLowerCase().includes(this.tagCurrent)
            })
        }
    },
}
</script>

<style lang="scss">
</style>