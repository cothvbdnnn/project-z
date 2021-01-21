
export default {
    getSubscribers(state, data){
        if(data){
            state.subscribers = data
        }
    },
    addSubscriber(state, data){
        data.forEach(value => {
            state.subscribers.unshift({
                id: value.id,
                createAt: value.createAt,
                email: value.email,
                read: value.read
            })
        })
    },
    removeSubscriber(state, data){
        if(data){
            
            for(let i in state.subscribers){
                if(state.subscribers[i].id == data.id){
                    state.subscribers.splice(i, 1)
                }
                
            }
        }
    },
    editSubscriber(state, data){
        if(data){
            for(let i in state.subscribers){
                if(state.subscribers[i].id == data.id){
                    state.subscribers[i].read = data.read
                }
            }
        }
    },
}