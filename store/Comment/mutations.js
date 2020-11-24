
export default {
    getComments(state, data){
        if(data){
            state.comments = data
        }
    },
    addComment(state, data){
        data.forEach(value => {
            state.comments.unshift({
                id: value.id,
                isEdit: false,
                createAt: value.createAt,
                content: value.content,
                userId: value.userId,
                userName: value.userName,
                userImage: value.userImage,
                postId: value.postId,
                postName: value.postName,
                postImage: value.postImage,
                postType: value.postType,
                reply: value.reply,
            })
        })
    },
    removeComment(state, data){
        if(data){      
            for(let i in state.comments){
                if(state.comments[i].id == data.id){
                    state.comments.splice(i, 1)
                }
            }
        }
    },
    toggleEditComment(state, data){
        if(data){
            for(let i in state.comments){
                if(state.comments[i].id == data){
                    state.comments[i].isEdit = !state.comments[i].isEdit
                }else{
                    state.comments[i].isEdit = false
                }
            }
        }
    },
    editComment(state, data){
        if(data){
            for(let i in state.comments){
                if(state.comments[i].id == data.id){
                    state.comments[i].content = data.content
                    state.comments[i].isEdit = false
                }
            }
        }
    },
}