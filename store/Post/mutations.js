
export default {
    getPosts(state, data){
        if(data){
            state.posts = data
            for(let i in state.posts){
                state.posts[i].new = false
                if(((Date.now() - state.posts[i].createAt) / 86400000) < 30 ){
                    state.posts[i].new = true
                }
            }
        }
    },
    addPost(state, data){
        if(data){
            data.forEach(value => {
                state.posts.unshift({
                    id: value.id,
                    tags: value.tags,
                    createAt: value.createAt,
                    image: value.image,
                    title: value.title,
                    excerpt: value.excerpt,
                    content: value.content,
                    authorId: value.authorId,
                    authorName: value.authorName,
                    authorImage: value.authorImage,
                })
            })
        }
    },
    removePost(state, data){
        if(data){
            for(let i in state.posts){
                if(state.posts[i].id == data.id){
                    state.posts.splice(i, 1)
                }
            }
        }
    },
    editPost(state, data){
        if(data){
            for(let i in state.posts){
                if(state.posts[i].id == data.id){
                    state.posts[i].authorImage = data.authorImage
                    state.posts[i].authorName = data.authorName
                    state.posts[i].title = data.title
                    state.posts[i].image = data.image
                    state.posts[i].excerpt = data.excerpt
                    state.posts[i].content = data.content
                    state.posts[i].tags = data.tags
                }
            } 
        }
    },
}