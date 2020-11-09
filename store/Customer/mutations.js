export default {
    getCustomers(state, data){
        if(data){
            state.customers = data
        }
    },
    addCustomer(state, data){
        if(data){
            console.log(data);
            data.forEach(value => {
                state.customers.unshift({
                    id: value.id,
                    createAt: value.createAt,
                    name: value.name,
                    email: value.email,
                    phone: value.phone,
                    image: value.image,
                    role: value.role,
                    address: value.address,
                })
            })
        }
    },
}