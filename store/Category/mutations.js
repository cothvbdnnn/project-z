
export default {
    getCategories(state, data){
        if(data){
            state.categories = data
        }
    },
    addCategory(state, data){
        data.forEach(value => {
            state.categories.unshift({
                id: value.id,
                createAt: value.createAt,
                name: value.name,
            })
        })
    },
    removeCategory(state, data){
        if(data){
            
            for(let i in state.categories){
                if(state.categories[i].id == data.id){
                    state.categories.splice(i, 1)
                }
                
            }
        }
    },
    editCategory(state, data){
        if(data){
            for(let i in state.categories){
                if(state.categories[i].id == data.id){
                    state.categories[i].name = data.name
                }
            }
        }
    },
}