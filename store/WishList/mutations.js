
export default {
    getWishLists(state, data){
        if(data){
            state.wishlists = data
        }
    },
    addWishList(state, data){
        data.forEach(value => {
            state.wishlists.unshift({
                id: value.id,
                createAt: value.createAt,
                userId: value.userId,
                userName: value.userName,
                userImage: value.userImage,
                postId: value.postId,
                postName: value.postName,
                postImage: value.postImage,
                regularPrice: value.regularPrice,
                salePrice: value.salePrice
            })
        })
    },
    removeWishList(state, data){
        if(data){      
            for(let i in state.wishlists){
                if(state.wishlists[i].id == data.id){
                    state.wishlists.splice(i, 1)
                }
            }
        }
    },
}