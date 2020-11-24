<template>
    <div class="row comments mt-5">
        <div class="col-12">
            <h2 class="text-primary">Comment<span v-if="filterComment.length > 1">s</span>({{filterComment.length}})</h2>
            <b-form-textarea class="mt-4 mb-3" placeholder="Enter your comment"
                v-model="comment"
            ></b-form-textarea>
            <b-button class="btn-primary"
                @click="handleComment"
            >Comment</b-button>
            
            <div class="container-comment mt-5">
                <div v-for="(comment,i) in filterComment.filter(x => x.reply == null)" :key="i" class="row item-comment">
                    <div class="col-md-2 col-12 col-image">
                        <b-img :src="comment.userImage"></b-img>
                    </div>
                    <div class="col-md-10 col-12 col-content">
                        <div class="row-comment">
                            <h4>{{ comment.userName }}</h4>
                            <b-dropdown v-if="userId == comment.userId">
                                <b-dropdown-item
                                    @click="toggleEdit(comment.id, comment.content)"
                                >Edit</b-dropdown-item>
                                <b-dropdown-item @click="handleRemoveCmt(comment.id)">Remove</b-dropdown-item>
                            </b-dropdown>
                        </div>
                        <div v-if="comment.isEdit == false">
                            <p class="content-comment">{{ comment.content }}</p>
                            <p><span>
                                <a class="mr-3" v-b-toggle="'collapse-' + i" href="javascript:void(0)" @click="commentReply = ''">Reply</a>
                                </span>{{ comment.createAt | filterDate}}
                            </p>
                        </div>
                        <div v-if="comment.isEdit == true" class="mb-3">
                            <div class="comment-edit">
                                <b-form-textarea class="mb-2" placeholder="Enter your comment"
                                    v-model="editComment"
                                ></b-form-textarea>
                                <b-button class="btn-primary"
                                    @click="handleEditCmt(comment.id)"
                                >Edit</b-button>
                            </div>
                        </div>
                        <div v-for="(commentReply,j) in filterComment.filter(x => x.reply == comment.id).sort( (a,b) => a.createAt - b.createAt )" :key="j" class="row item-comment">
                            <div class="col-md-2 col-12 col-image">
                                <b-img :src="commentReply.userImage"></b-img>
                            </div>
                            <div class="col-md-10 col-12 col-content">
                                <div class="row-comment">
                                    <h4>{{ commentReply.userName }}</h4>
                                    <b-dropdown v-if="userId == commentReply.userId">
                                        <b-dropdown-item
                                            @click="toggleEdit(commentReply.id, commentReply.content)"
                                        >Edit</b-dropdown-item>
                                        <b-dropdown-item @click="handleRemoveCmt(commentReply.id)">Remove</b-dropdown-item>
                                    </b-dropdown>
                                </div>
                                <div v-if="commentReply.isEdit == false">
                                    <p class="content-comment">{{ commentReply.content }}</p>
                                    <p><span>
                                        <a class="mr-3" v-b-toggle="'collapse-' + i" href="javascript:void(0)" @click="commentReply = ''">Reply</a>
                                        </span>{{ comment.createAt | filterDate}}
                                    </p>
                                </div>
                                <div v-if="commentReply.isEdit == true" class="mb-3">
                                    <div class="comment-edit">
                                        <b-form-textarea class="mb-2" placeholder="Enter your comment"
                                            v-model="editComment"
                                        ></b-form-textarea>
                                        <b-button class="btn-primary"
                                            @click="handleEditCmt(commentReply.id)"
                                        >Edit</b-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <b-collapse :id="'collapse-' + i" accordion="my-accordion" class="mt-2">
                            <div class="comment-reply">
                                <b-form-textarea class="mt-3 mb-2" placeholder="Enter your comment"
                                    v-model="commentReply"
                                ></b-form-textarea>
                                <b-button class="btn-primary"
                                    v-b-toggle="'collapse-' + i"
                                    @click="handleCommentReply(comment.id)"
                                >Comment</b-button>
                            </div>
                        </b-collapse>
                    </div>
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
            comment: '',
            commentReply: '',
            editComment: '',
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
        postType: {
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
            getComments: state => state.Comment.comments,
        }),
        filterComment(){
            return this.getComments.filter( x => {
                return x.postId == this.idPost
            })

        }
    },
    methods: {
        ...mapActions({
            'actAddComment' : 'Comment/actAddComment',
            'actEditComment' : 'Comment/actEditComment',
            'actRemoveComment' : 'Comment/actRemoveComment',
        }),
        ...mapMutations({
            'toggleEditComment' : 'Comment/toggleEditComment',
        }),
        handleEditCmt(id){
            this.actEditComment({
                id: id,
                content: this.editComment,
            })
        },
        toggleEdit(id, content){
            this.toggleEditComment(id)
            this.editComment = content
        },
        handleRemoveCmt(id){
            this.actRemoveComment({
                id: id
            })
        },
        handleCommentReply(id){
            if(this.commentReply != ''){
                this.actAddComment({
                    content: this.commentReply,
                    postId: this.idPost,
                    postName: this.namePost,
                    postType: this.postType,
                    postImage: this.imagePost,
                    userId: this.userId,
                    userName: this.userName,
                    userImage: this.userImage,
                    reply: id,
                })
                this.commentReply = ''
            }
        },
        handleComment(){
            if(this.comment != ''){
                this.actAddComment({
                    content: this.comment,
                    postId: this.idPost,
                    postName: this.namePost,
                    postType: this.postType,
                    postImage: this.imagePost,
                    userId: this.userId,
                    userName: this.userName,
                    userImage: this.userImage,
                    reply: null,
                })
                this.comment = ''
            }
        },
    },
}
</script>

<style>

</style>