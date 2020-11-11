import firebase from "firebase";

export default {
    async actGetSlides(context){
        try {

            const getSlides = firebase.firestore().collection('slides').orderBy('createAt', 'desc').get()
            const awaitSlide = await getSlides
            let slides = []
            awaitSlide.forEach(doc => {
                slides.push({
                    id: doc.id,
                    createAt: doc.data().createAt,
                    image: doc.data().image,
                    title: doc.data().title,
                    description: doc.data().description,
                })
                
            })
            context.commit('getSlides', slides)
        } catch (error) {
            console.log(error)
        }
    },
    async actRealTimeSlide(context){
        try {
            let initState = true
            firebase.firestore().collection('slides').orderBy('createAt', 'asc').onSnapshot(snap => {
                if (initState) {
                    initState = false;
                } else {
                    if (!snap.docChanges().empty) {
                        snap.docChanges().forEach( change => {
                            let slides = []
                            let doc = change.doc;
                            
                            if(change.type == 'added'){
                                slides.push({
                                    id: doc.id,
                                    createAt: doc.data().createAt,
                                    image: doc.data().image,
                                    title: doc.data().title,
                                    description: doc.data().description,
                                })
                                
                                context.commit('addSlide', slides)
                                
                            }
                            if (change.type === "removed") {
                                context.commit('removeSlide', doc.data())
                            }
                            if (change.type === "modified") {
                                context.commit('editSlide', doc.data())
                            }
                        })   
                    }
                }
			})
        } catch (error) {
            console.log(error)
        }
    },
    async actAddSlide(context, data){
        let formatId = Math.random().toString(36).substr(2, 9)

        // Upload image to storage

        let storageRef = firebase.storage().ref('slides/' + data.image.name)

        let uploadImage = await storageRef.put(data.image);
        
        let urlImage = await uploadImage.ref.getDownloadURL()

        firebase.firestore().collection('slides').doc(formatId).set({
            id: formatId,
            image: urlImage,
            createAt: Date.now(),
            title: data.title,
            description: data.description,
        })
        
    },
    actRemoveSlide(context, data){

        firebase.firestore().collection('slides').doc(data.id).delete()

    },
    async actEditSlide(context, data){

        let urlImage = data.imageOld

        if(data.image != null){

            let storageRef = firebase.storage().ref('slides/' + data.image.name)

            let uploadImage = await storageRef.put(data.image);
            
            urlImage = await uploadImage.ref.getDownloadURL()
        }

        firebase.firestore().collection('slides').doc(data.id).update({
            title: data.title,
            image: urlImage,
            description: data.description,
        })
        
    },
}