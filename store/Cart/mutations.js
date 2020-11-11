export default {
    getCart(state,data){
        state.cart = JSON.parse(localStorage.getItem('cart') || '[]')
    },
    addCart(state, data){
        state.cart.push(data)
        localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    addQuantityCart(state, data){
        state.cart[data].quantity += 1
        localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    removeCart(state, data){
        state.cart.splice(data, 1)
        localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    minusQuantity(state, data){
        state.cart[data].quantity -= 1
        localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    plusQuantity(state, data){
        state.cart[data].quantity += 1
        localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    clearCart(state, data){
        state.cart = []
        localStorage.setItem('cart', JSON.stringify(state.cart))
    }
}