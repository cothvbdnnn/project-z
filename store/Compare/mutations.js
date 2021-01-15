export default {
    getCompare(state,data){
        state.compare = JSON.parse(localStorage.getItem('compare') || '[]')
    },
    toggleCompare(state, data){
        let check = state.compare.findIndex(x => x.id == data.id)
        
        if(check == -1){
            state.compare.push(data)
            localStorage.setItem('compare', JSON.stringify(state.compare))
        }else{
            for(let i in state.compare){
                if(state.compare[i].id == data.id){
                    state.compare.splice(i, 1)
                    localStorage.setItem('compare', JSON.stringify(state.compare))
                }
            }
        }
    },
    removeCompare(state, data){
        state.compare.splice(data, 1)
        localStorage.setItem('compare', JSON.stringify(state.compare))
    },
    clearCompare(state, data){
        state.compare = []
        localStorage.setItem('compare', JSON.stringify(state.compare))
    },
}