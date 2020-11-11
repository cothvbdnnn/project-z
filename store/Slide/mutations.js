
export default {
    getSlides(state, data){
        if(data){
            state.slides = data
        }
    },
    addSlide(state, data){
        if(data){
            data.forEach(value => {
                state.slides.unshift({
                    id: value.id,
                    createAt: value.createAt,
                    image: value.image,
                    title: value.title,
                    description: value.description,
                })
            })
        }
    },
    removeSlide(state, data){
        if(data){
            for(let i in state.slides){
                if(state.slides[i].id == data.id){
                    state.slides.splice(i, 1)
                }
            }
        }
    },
    editSlide(state, data){
        if(data){
            for(let i in state.slides){
                if(state.slides[i].id == data.id){
                    state.slides[i].title = data.title
                    state.slides[i].image = data.image
                    state.slides[i].description = data.description
                }
            } 
        }
    },
}