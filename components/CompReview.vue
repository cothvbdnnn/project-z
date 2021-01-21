<template>
    <div class="row comments mt-5">
        <div class="col-12">
            <h2 class="text-primary">Customer review<span v-if="filterReview.length > 1">s</span>({{filterReview.length}})</h2>
            <div class="row mx-0 justify-content-between align-items-center">
                <div class="row mx-0 justify-content-start align-items-center" v-if="filterReview.length > 0">
                    <h2 class="mb-1 mr-4 display-3 rating-number text-primary">{{ ratingProduct }}</h2>
                    <client-only>
                        <StarsRatings inactive-color="#ccc" active-color="#3c5e2c"
                            :rounded-corners="true"
                            :rating="ratingProduct"
                            :star-size="30"
                            :increment="0.1"
                            :read-only="true"
                            :show-rating="false"
                            :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
                        ></StarsRatings>
                    </client-only>
                    <h5 class="ml-3">{{filterReview.length}}<span> review</span><span v-if="filterReview.length > 1">s</span></h5>
                </div>
                <b-button v-b-modal.modal-prevent-closing class="btn-primary mt-2"
                    v-if="userId && filterReview.filter(x => x.userId == userId).length == 0"
                >Write reviews</b-button>
                <h4 class="text-primary" v-if="!userId">Please login to review</h4>
                <h4 class="text-primary" v-if="filterReview.filter(x => x.userId == userId).length > 0">You have rated this product</h4>
            </div>
            <b-modal
                hide-footer
                id="modal-prevent-closing"
                ref="write-review"
                title="Write reviews"
            >
                <div class="mt-2">
                    <client-only>
                        <StarsRatings inactive-color="#ccc" active-color="#3c5e2c"
                            :rounded-corners="true"
                            v-model="rating"
                            :star-size="20"
                            :show-rating="false"
                            :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
                        ></StarsRatings>
                    </client-only>
                    <b-form-textarea class="mt-2 mb-3" placeholder="Enter your review"
                        v-model="review"
                        trim
                    ></b-form-textarea>
                    <b-button class="btn-primary mb-3"
                        @click="handleReview"
                    >Review</b-button>
                </div>
            </b-modal>
            
            <div class="container-comment mt-4">
                <div v-for="(review,i) in sliceReview.filter(x => x.reply == null)" :key="i" class="mb-2 row item-comment">
                    <div class="col-md-2 col-12 col-image">
                        <b-img :src="review.userImage"></b-img>
                    </div>
                    <div class="col-md-10 col-12 col-content">
                        <div class="row-comment justify-content-start align-items-center">
                            <h4 class="mb-1 mr-2">{{ review.userName }}</h4>
                            <client-only>
                                <StarsRatings inactive-color="#ccc" active-color="#3c5e2c"
                                    :rounded-corners="true"
                                    :rating="review.rating"
                                    :star-size="15"
                                    :increment="0.1"
                                    :read-only="true"
                                    :show-rating="false"
                                    :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
                                ></StarsRatings>
                            </client-only>
                        </div>
                        <div>
                            <p class="content-comment mb-1">{{ review.content }}</p>
                            <p class="mb-1">{{ review.createAt | filterDate}}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <b-button block class="btn-primary" v-if="filterReview.length > sliceReview.length"
                        @click="handleLoadReview()"
                    >Load More</b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    data() {
        return {
            review: '',
            rating: 0,
            loadReview: 3,
        }
    },
    props: {
        idPost: {
            type: String,
            default: '',
        },
        namePost: {
            type: String,
            default: '',
        },
        imagePost: {
            type: String,
            default: '',
        },
        userId: {
            type: String,
            default: '',
        },
        userName: {
            type: String,
            default: '',
        },
        userImage: {
            type: String,
            default: '',
        },
    },
    filters: {
        filterDate: function (date) {
            return moment(date).fromNow()
        }
    },
    computed: {
        ...mapState({
            getReviews: state => state.Review.reviews,
        }),
        filterReview(){
            return this.getReviews.filter( x => {
                return x.postId == this.idPost
            })
        },
        sliceReview(){
            return this.filterReview.slice(0, this.loadReview)
        },
        ratingProduct(){
            let rating = 0
            if(this.filterReview.length > 0){
                let mapReview = this.filterReview.map(a => {
                    return a.rating
                })

                let reduceReview = mapReview.reduce((a,b) => {
                    return a + b
                })

                rating = Math.round(reduceReview/mapReview.length * 10) / 10
            }
            return rating
        }
    },
    methods: {
        ...mapActions({
            'actAddReview' : 'Review/actAddReview',
        }),
        handleLoadReview(){
            this.loadReview += this.loadReview
        },
        handleReview(){
            if(this.review != '' && this.rating != 0){
                this.actAddReview({
                    content: this.review,
                    postId: this.idPost,
                    postName: this.namePost,
                    postImage: this.imagePost,
                    userId: this.userId,
                    userName: this.userName,
                    userImage: this.userImage,
                    rating: this.rating
                })
                this.review = ''
                this.rating = 0
                this.$refs['write-review'].hide()
            }
        },
    },
}
</script>

<style>

</style>