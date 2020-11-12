import firebase from "firebase";

export default {
    async actGetPosts(context){
        try {

            const getPosts = firebase.firestore().collection('posts').orderBy('createAt', 'desc').get()
            const awaitPost = await getPosts
            let posts = []
            awaitPost.forEach(doc => {
                posts.push({
                    id: doc.id,
                    tags: doc.data().tags,
                    createAt: doc.data().createAt,
                    image: doc.data().image,
                    title: doc.data().title,
                    excerpt: doc.data().excerpt,
                    content: doc.data().content,
                    authorId: doc.data().authorId,
                    authorName: doc.data().authorName,
                    authorImage: doc.data().authorImage,
                })
                
            })
            context.commit('getPosts', posts)
        } catch (error) {
            console.log(error)
        }
    },
    async actRealTimePost(context){
        try {
            let initState = true
            firebase.firestore().collection('posts').orderBy('createAt', 'asc').onSnapshot(snap => {
                if (initState) {
                    initState = false;
                } else {
                    if (!snap.docChanges().empty) {
                        snap.docChanges().forEach( change => {
                            let posts = []
                            let doc = change.doc;
                            
                            if(change.type == 'added'){
                                posts.push({
                                    id: doc.id,
                                    tags: doc.data().tags,
                                    createAt: doc.data().createAt,
                                    image: doc.data().image,
                                    title: doc.data().title,
                                    excerpt: doc.data().excerpt,
                                    content: doc.data().content,
                                    authorId: doc.data().authorId,
                                    authorName: doc.data().authorName,
                                    authorImage: doc.data().authorImage,
                                })
                                
                                context.commit('addPost', posts)
                                
                            }
                            if (change.type === "removed") {
                                context.commit('removePost', doc.data())
                            }
                            if (change.type === "modified") {
                                context.commit('editPost', doc.data())
                            }
                        })   
                    }
                }
			})
        } catch (error) {
            console.log(error)
        }
    },
    async actAddPost(context, data){
        let formatId = Math.random().toString(36).substr(2, 9)

        // Upload image to storage

        let storageRef = firebase.storage().ref('posts/' + data.image.name)

        let uploadImage = await storageRef.put(data.image);
        
        let urlImage = await uploadImage.ref.getDownloadURL()

        firebase.firestore().collection('posts').doc(formatId).set({
            id: formatId,
            tags: data.tags,
            createAt: Date.now(),
            image: urlImage,
            title: data.title,
            excerpt: data.excerpt,
            content: data.content,
            authorId: data.authorId,
            authorName: data.authorName,
            authorImage: data.authorImage,
        })
        
    },
    actRemovePost(context, data){

        firebase.firestore().collection('posts').doc(data.id).delete()

    },
    async actEditPost(context, data){

        let urlImage = data.imageOld

        if(data.image != null){

            let storageRef = firebase.storage().ref('posts/' + data.image.name)

            let uploadImage = await storageRef.put(data.image);
            
            urlImage = await uploadImage.ref.getDownloadURL()
        }

        firebase.firestore().collection('posts').doc(data.id).update({
            title: data.title,
            image: urlImage,
            excerpt: data.excerpt,
            content: data.content,
            tags: data.tags
        })
        
    },
}