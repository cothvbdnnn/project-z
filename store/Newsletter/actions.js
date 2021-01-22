import firebase from "firebase";

export default {
    async actGetNewsletters(context){
        try {
            const getNewsletters = firebase.firestore().collection('newsletters').orderBy('createAt', 'desc').get()
            const awaitNews = await getNewsletters
            let newsletters = []
            awaitNews.forEach(doc => {
                newsletters.push({
                    id: doc.id,
                    createAt: doc.data().createAt,
                    title: doc.data().title,
                    content: doc.data().content,
                    status: doc.data().status,
                    authorId: doc.data().authorId,
                    authorName: doc.data().authorName
                })
            })
            context.commit('getNewsletters', newsletters)
        } catch (error) {
            console.log(error)
        }
    },
    async actRealTimeNewsletter(context){
        try {
            let initState = true
            firebase.firestore().collection('newsletters').orderBy('createAt', 'asc').onSnapshot(snap => {
                if (initState) {
                    initState = false;
                } else {
                    if (!snap.docChanges().empty) {
                        snap.docChanges().forEach( change => {
                            let newsletters = []
                            let doc = change.doc;
                            
                            if(change.type == 'added'){
                                newsletters.push({
                                    id: doc.id,
                                    createAt: doc.data().createAt,
                                    title: doc.data().title,
                                    content: doc.data().content,
                                    status: doc.data().status,
                                    authorId: doc.data().authorId,
                                    authorName: doc.data().authorName
                                })
                                
                                context.commit('addNewsletter', newsletters)
                                
                            }
                            if (change.type === "removed") {
                                context.commit('removeNewsletter', doc.data())
                            }
                            if (change.type === "modified") {
                                context.commit('editNewsletter', doc.data())
                            }
                        })   
                    }
                }
			})
        } catch (error) {
            console.log(error)
        }
    },
    actAddNewsletter(context, data){
        let formatId = Math.random().toString(36).substr(2, 9)
        firebase.firestore().collection('newsletters').doc(formatId).set({
            id: formatId,
            createAt: Date.now(),
            title: data.title,
            content: data.content,
            status: 'draft',
            authorId: data.authorId,
            authorName: data.authorName
        })
    },
    actRemoveNewsletter(context, data){

        firebase.firestore().collection('newsletters').doc(data.id).delete()
        
    },
    actEditNewsletter(context, data){
        firebase.firestore().collection('newsletters').doc(data.id).update({
            title: data.title,
            content: data.content,
        })
    },
    actSendMail(context, data){

        let emailSubscribers = context.rootState.Subscriber.subscribers.map((x) => {
            return x.email
        })
        console.log(emailSubscribers);
    }
}
