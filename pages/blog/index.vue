<template>
    <div class="blog">
        <div class="container">
            <div class="row">
                <div class="col-md-8 col-12">
                    <div class="row">
                        <div class="col-md-12 col-sm-12 col-12 item-blog"
                            v-for="(post,i) in slicePost"
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
                                                <h5 class="mb-1 text-primary"><strong>{{ post.title }}</strong></h5>
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
                    <b-button size="lg" block class="btn-primary" v-if="getPosts.length > slicePost.length"
                        @click="handleLoadPost()"
                    >Load More</b-button>
                </div>
                <div class="col-md-4 col-12">
                    <div class="newsletter-sidebar">
                        <h4 class="text-primary">SUBSCRIBE</h4>
                        <img src="~/assets/images/logo.png">
                        <h6 class="my-3 text-primary">To receive the lastest news from Cong Caphe</h6>
                        <CompMailchimpSignup/>
                    </div>
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
            loadPost: 5,
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
        slicePost(){
            return this.getPosts.slice(0, this.loadPost)
        }
    },
    methods: {
        handleLoadPost(){
            this.loadPost += this.loadPost
        }
    }
}
</script>

<style lang="scss">
    .blog{
        .item-blog{
            margin-bottom: 30px;
            .container-item{
                overflow: hidden;
                height: 100%;
                img{
                    height: 200px;
                    width: 100%;
                    object-fit: cover;
                }
                .content{
                    height: 200px;
                    overflow: hidden;
                    h5{
                        margin-bottom: 0;
                        font-size: 20px;
                    }
                }
            }   
        }
        .newsletter-sidebar{
            background-color: #d3b161;
            padding: 20px;
            text-align: center;
            img{
                max-width: 150px;
            }
        }
    }
</style>