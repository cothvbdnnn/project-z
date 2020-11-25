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
                                            <p>{{ post.excerpt }}</p>
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
import firebase from "firebase";

export default {
    name: 'Tag',
    head: {
        title: "Tag - Project Z"
    },
    transition: 'fade',
    async validate(context) {
        const tags = await context.store.state.Tag.tags
        for(let i in tags){
           if(tags[i].name.toLowerCase() == context.params.tagName.split('-').join(' ')){
               return true
           }
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
                    h5{
                        text-transform: uppercase;
                        margin-bottom: 0;
                        font-size: 20px;
                    }
                }
            }   
        }
    }
</style>