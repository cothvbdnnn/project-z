
export default {
    getTags(state, data){
        if(data){
            state.tags = data
        }
    },
    addTag(state, data){
        data.forEach(value => {
            state.tags.unshift({
                id: value.id,
                createAt: value.createAt,
                name: value.name,
            })
        })
    },
    removeTag(state, data){
        if(data){
            
            for(let i in state.tags){
                if(state.tags[i].id == data.id){
                    state.tags.splice(i, 1)
                }
                
            }
        }
    },
    editTag(state, data){
        if(data){
            for(let i in state.tags){
                if(state.tags[i].id == data.id){
                    state.tags[i].name = data.name
                }
            }
        }
    },
}