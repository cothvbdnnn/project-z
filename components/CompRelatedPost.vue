<template>
    <div class="related-post">
        <div class="row">
            <div class="col-12 mb-3">
                <h3 class="text-primary">RELATED POSTS</h3>
            </div>
            <div class="col-12">
                <div class="row">
                    <div class="col-md-12 col-sm-12 col-12 item-blog mb-3"
                        v-for="(post,i) in relatedPosts.slice(0,5)"
                        :key="i"
                    >   
                        <div class="container-item">
                            <div class="row">
                                <div class="col-md-6 col-4 pr-1">
                                    <div class="col-img">
                                        <nuxt-link :to="/blog/+ post.title + '?id=' + post.id | fomartLink">
                                            <b-img
                                                :src="post.image"
                                            >
                                            </b-img>
                                        </nuxt-link>
                                        <!-- <div class="img-baged">
                                            <img src="~/assets/images/label-new.png">
                                        </div> -->
                                    </div>
                                </div>
                                <div class="col-md-6 col-8">
                                    <div class="content">
                                        <nuxt-link :to="/blog/+ post.title + '?id=' + post.id | fomartLink">
                                            <h5 class="mb-0 text-primary"><strong>{{ post.title }}</strong></h5>
                                        </nuxt-link>
                                        <p>{{ post.excerpt | truncate(35, '...') }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            
        }
    },
    props: {
        idPost: {
            type: String,
            default: '',
        },
        tags: {
            type: String,
            default: '',
        },
    },
    filters: {
        fomartLink(text) {
            return text.split(' ').join('-').toLowerCase()
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
        relatedPosts(){
            let arr = [] 

            for(let i in this.tags){
                arr.push(this.getPosts.filter((x) => {
                    if(x.id != this.idPost){
                        return x.tags.includes(this.tags[i])
                    }
                }))
            }
            
            let mergeArr = [].concat.apply([], arr)

            let uniqueArr = mergeArr.filter((a,b,c) => b === c.indexOf(a))
            return uniqueArr
        }
    },
}
</script>

<style lang="scss">

.related-product{
    .slick-list{
        margin: 0 -10px;
        .item-product{
            padding: 0 10px;
            .col-img{
                position: relative;
                .img-baged{
                    position: absolute;
                    top: 0;
                    right: 0;
                    img{
                        width: 30px;
                        height: 30px;
                    }
                }
            }
        }
    }
    
}

</style>