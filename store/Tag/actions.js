import firebase from "firebase";

export default {
    async actGetTags(context){
        try {
            const getTags = firebase.firestore().collection('tags').orderBy('createAt', 'desc').get()
            const awaitTag = await getTags
            let tags = []
            awaitTag.forEach(doc => {
                tags.push({
                    id: doc.id,
                    createAt: doc.data().createAt,
                    name: doc.data().name,
                })
            })
            context.commit('getTags', tags)
        } catch (error) {
            console.log(error)
        }
    },
    async actRealTimeTag(context){
        try {
            let initState = true
            firebase.firestore().collection('tags').orderBy('createAt', 'asc').onSnapshot(snap => {
                if (initState) {
                    initState = false;
                } else {
                    if (!snap.docChanges().empty) {
                        snap.docChanges().forEach( change => {
                            let tags = []
                            let doc = change.doc;
                            
                            if(change.type == 'added'){
                                tags.push({
                                    id: doc.id,
                                    createAt: doc.data().createAt,
                                    name: doc.data().name,
                                })
                                
                                context.commit('addTag', tags)
                                
                            }
                            if (change.type === "removed") {
                                context.commit('removeTag', doc.data())
                            }
                            if (change.type === "modified") {
                                context.commit('editTag', doc.data())
                            }
                        })   
                    }
                }
			})
        } catch (error) {
            console.log(error)
        }
    },
    actAddTag(context, data){
        let formatId = Math.random().toString(36).substr(2, 9)

        firebase.firestore().collection('tags').doc(formatId).set({
            id: formatId,
            createAt: Date.now(),
            name: data
        })
    },
    async actRemoveTag(context, data){

        // Remove tag

        firebase.firestore().collection('tags').doc(data.id).delete()

        const getPost = firebase.firestore().collection('posts').where("tags","array-contains",data.tagOld).get()
        const awaitPost = await getPost

        // Remove tag in posts

        awaitPost.forEach(response => {
            firebase.firestore().collection('posts').doc(response.id).update({
                tags: firebase.firestore.FieldValue.arrayRemove(data.tagOld)
            })
        })
    },
    async actEditTag(context, data){

        // Update tag

        firebase.firestore().collection('tags').doc(data.id).update({
            name: data.tagUpdate
        })

        // Update tag in posts

        const getPost = firebase.firestore().collection('posts').where("tags","array-contains",data.tagOld).get()
        const awaitPost = await getPost

        awaitPost.forEach(response => {
            console.log(response.id);
            firebase.firestore().collection('posts').doc(response.id).update({
                tags: firebase.firestore.FieldValue.arrayRemove(data.tagOld)
            })
            firebase.firestore().collection('posts').doc(response.id).update({
                tags: firebase.firestore.FieldValue.arrayUnion(data.tagUpdate)
            })
        })
        
    },
}