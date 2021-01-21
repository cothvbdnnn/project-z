
export default {
    getNewsletters(state, data){
        if(data){
            state.newsletters = data
        }
    },
    addNewsletter(state, data){
        data.forEach(value => {
            state.newsletters.unshift({
                id: value.id,
                createAt: value.createAt,
                authorName: value.authorName,
                authorId: value.authorId,
                title: value.title,
                content: value.content,
                status: value.status
            })
        })
    },
    removeNewsletter(state, data){
        if(data){
            
            for(let i in state.newsletters){
                if(state.newsletters[i].id == data.id){
                    state.newsletters.splice(i, 1)
                }
                
            }
        }
    },
    editNewsletter(state, data){
        if(data){
            for(let i in state.newsletters){
                if(state.newsletters[i].id == data.id){
                    state.newsletters[i].title = data.title
                    state.newsletters[i].content = data.content
                    state.newsletters[i].status = data.status
                }
            }
        }
    },
}