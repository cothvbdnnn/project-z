import firebase from "firebase";

export default {
    async actGetSubscribers(context){
        try {
            const getSubscribers = firebase.firestore().collection('subscribers').orderBy('createAt', 'desc').get()
            const awaitSubs = await getSubscribers
            let subscribers = []
            awaitSubs.forEach(doc => {
                subscribers.push({
                    id: doc.id,
                    createAt: doc.data().createAt,
                    email: doc.data().email,
                    read: doc.data().read
                })
            })
            context.commit('getSubscribers', subscribers)
        } catch (error) {
            console.log(error)
        }
    },
    async actRealTimeSubscriber(context){
        try {
            let initState = true
            firebase.firestore().collection('subscribers').orderBy('createAt', 'asc').onSnapshot(snap => {
                if (initState) {
                    initState = false;
                } else {
                    if (!snap.docChanges().empty) {
                        snap.docChanges().forEach( change => {
                            let subscribers = []
                            let doc = change.doc;
                            
                            if(change.type == 'added'){
                                subscribers.push({
                                    id: doc.id,
                                    createAt: doc.data().createAt,
                                    email: doc.data().email,
                                    read: doc.data().read
                                })
                                
                                context.commit('addSubscriber', subscribers)
                                
                            }
                            if (change.type === "removed") {
                                context.commit('removeSubscriber', doc.data())
                            }
                            if (change.type === "modified") {
                                context.commit('editSubscriber', doc.data())
                            }
                        })   
                    }
                }
			})
        } catch (error) {
            console.log(error)
        }
    },
    actAddSubscriber(context, data){
        let formatId = Math.random().toString(36).substr(2, 9)

        firebase.firestore().collection('subscribers').doc(formatId).set({
            id: formatId,
            createAt: Date.now(),
            email: data,
            read: false
        })
    },
    actRemoveSubscriber(context, data){

        firebase.firestore().collection('subscribers').doc(data.id).delete()
    },
    actReadAllSubscribers(context, data){

        for(let i in data){
            firebase.firestore().collection('subscribers').doc(data[i]).update({
                read: true
            })
        }
        
    },
}