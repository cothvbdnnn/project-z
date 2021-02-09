
export default {
    getProducts(state, data){
        if(data){
            state.products = data
            for(let i in state.products){
                if(state.products[i].salePrice == 0){
                    state.products[i].price = state.products[i].regularPrice    
                }else{
                    state.products[i].price = state.products[i].salePrice
                }
                state.products[i].new = false
                if(((Date.now() - state.products[i].createAt) / 86400000) < 30 ){
                    state.products[i].new = true
                }
            }
        }
    },
    addProduct(state, data){
        if(data){
            data.forEach(value => {
                state.products.unshift({
                    id: value.id,
                    categoryId: value.categoryId,
                    createAt: value.createAt,
                    categoryName: value.categoryName,
                    image: value.image,
                    name: value.name,
                    new: true,
                    regularPrice: value.regularPrice,
                    salePrice: value.salePrice,
                    quantity: value.quantity,
                    description: value.description,
                })
            })
        }
    },
    removeProduct(state, data){
        if(data){
            for(let i in state.products){
                if(state.products[i].id == data.id){
                    state.products.splice(i, 1)
                }
            }
        }
    },
    editProduct(state, data){
        if(data){
            for(let i in state.products){
                if(state.products[i].id == data.id){
                    state.products[i].name = data.name
                    state.products[i].image = data.image
                    state.products[i].regularPrice = data.regularPrice
                    state.products[i].salePrice = data.salePrice
                    state.products[i].quantity = data.quantity
                    state.products[i].description = data.description
                    state.products[i].categoryId = data.categoryId
                    state.products[i].categoryName = data.categoryName 
                }
            } 
        }
    },
}