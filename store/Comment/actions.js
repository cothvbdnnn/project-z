import firebase from "firebase";

export default {
    async actGetComments(context){
        try {
            const getComments = firebase.firestore().collection('comments').orderBy('createAt', 'desc').get()
            const awaitComment = await getComments
            let comments = []
            awaitComment.forEach(doc => {
                comments.push({
                    id: doc.id,
                    createAt: doc.data().createAt,
                    content: doc.data().content,
                    userId: doc.data().userId,
                    userName: doc.data().userName,
                    userImage: doc.data().userImage,
                    postId: doc.data().postId,
                    postName: doc.data().postName,
                    postImage: doc.data().postImage,
                    postType: doc.data().postType,
                    reply: doc.data().reply,
                    isEdit: false,
                    read: doc.data().read,
                })
            })
            context.commit('getComments', comments)
        } catch (error) {
            console.log(error)
        }
    },
    async actRealTimeComment(context){
        try {
            let initState = true
            firebase.firestore().collection('comments').orderBy('createAt', 'asc').onSnapshot(snap => {
                if (initState) {
                    initState = false;
                } else {
                    if (!snap.docChanges().empty) {
                        snap.docChanges().forEach( change => {
                            let comments = []
                            let doc = change.doc;
                            
                            if(change.type == 'added'){
                                comments.push({
                                    id: doc.id,
                                    createAt: doc.data().createAt,
                                    content: doc.data().content,
                                    userId: doc.data().userId,
                                    userName: doc.data().userName,
                                    userImage: doc.data().userImage,
                                    postId: doc.data().postId,
                                    postName: doc.data().postName,
                                    postImage: doc.data().postImage,
                                    postType: doc.data().postType,
                                    reply: doc.data().reply,
                                    read: doc.data().read,
                                })
                                
                                context.commit('addComment', comments)
                                
                            }
                            if (change.type === "removed") {
                                context.commit('removeComment', doc.data())
                            }
                            if (change.type === "modified") {
                                context.commit('editComment', doc.data())
                            }
                        })   
                    }
                }
			})
        } catch (error) {
            console.log(error)
        }
    },
    actAddComment(context, data){
        let formatId = Math.random().toString(36).substr(2, 9)

        firebase.firestore().collection('comments').doc(formatId).set({
            id: formatId,
            createAt: Date.now(),
            content: data.content,
            userId: data.userId,
            userName: data.userName,
            userImage: data.userImage,
            postId: data.postId,
            postName: data.postName,
            postImage: data.postImage,
            postType: data.postType,
            reply: data.reply,
            read: false,
        })
    },
    async actRemoveComment(context, data){

        firebase.firestore().collection('comments').doc(data.id).delete()

        // Remove reply comments in comment

        const getComment = firebase.firestore().collection('comments').where("reply","==",data.id).get()
        const awaitComment = await getComment
        awaitComment.forEach(response => {
            firebase.firestore().collection('comments').doc(response.id).delete()
        })

    },
    actReadComment(context, data){

        firebase.firestore().collection('comments').doc(data.id).update({
            read: true
        })
    },
    actReadAllComments(context, data){

        for(let i in data){
            firebase.firestore().collection('comments').doc(data[i]).update({
                read: true
            })
        }
        
    },
    actEditComment(context, data){

        // Update category

        firebase.firestore().collection('comments').doc(data.id).update({
            content: data.content
        })
        
    },
}