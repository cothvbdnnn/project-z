export default {
    getOrders(state, data){
        if(data){
            state.orders = data
        }
    },
    addOrder(state, data){
        if(data){
            data.forEach(value => {
                state.orders.unshift({
                    id: value.id,
                    createAt: value.createAt,
                    name: value.name,
                    email: value.email,
                    phone: value.phone,
                    address: value.address,
                    notes: value.notes,
                    total: value.total,
                    order: value.order,
                    read: value.read,
                    status: value.status,
                })
            })
        }
    },
    removeOrder(state, data){
        if(data){
            for(let i in state.orders){
                if(state.orders[i].id == data.id){
                    state.orders.splice(i, 1)
                }
                
            }
        }
    },
    editOrder(state, data){
        if(data){
            for(let i in state.orders){
                if(state.orders[i].id == data.id){
                    state.orders[i].status = data.status
                }
            }
        }
    },
}

