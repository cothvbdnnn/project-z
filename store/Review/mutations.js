
export default {
    getReviews(state, data){
        if(data){
            state.reviews = data
        }
    },
    addReview(state, data){
        data.forEach(value => {
            state.reviews.unshift({
                id: value.id,
                read: false,
                rating: value.rating,
                createAt: value.createAt,
                content: value.content,
                userId: value.userId,
                userName: value.userName,
                userImage: value.userImage,
                postId: value.postId,
                postName: value.postName,
                postImage: value.postImage,
            })
        })
    },
    removeReview(state, data){
        if(data){      
            for(let i in state.reviews){
                if(state.reviews[i].id == data.id){
                    state.reviews.splice(i, 1)
                }
            }
        }
    },
}