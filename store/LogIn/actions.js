import firebase from "firebase";

export default {
    async actLogInUser( {commit}, data){
        try {

            const logIn = await firebase.auth().signInWithEmailAndPassword(data.email, data.password)

			this.$router.push({path: '/', query: {}})

        } catch (error) {
            commit('logInUser', error.message)
        }
        
    },
    async actLogInGoogle({commit}){
        try {
            const loginGoogle = new firebase.auth.GoogleAuthProvider()
            const logIn = await firebase.auth().signInWithPopup(loginGoogle)

            const userCollection = await firebase.firestore().collection('users')

            userCollection.doc(logIn.user.uid).set({
                userId: logIn.user.uid,
                userHandle: logIn.user.displayName,
                createAt: Date.now(),
                role: 'user',
                phone: '',
                email: '',
                address: '',
                imageURL: 'https://firebasestorage.googleapis.com/v0/b/project-z-68d96.appspot.com/o/avatars%2Ffavicon.png?alt=media&token=ccf0e43e-ce84-464d-b3a0-1e65fdbdf1ec',
            })
            this.$router.push({path: '/', query: {}})
        } catch (error) {
            commit('logInUser', error.message)
        }
        
    },
    async actLogInFacebook({commit}){
        try {
            const loginFacebook = new firebase.auth.FacebookAuthProvider()
            const logIn = await firebase.auth().signInWithPopup(loginFacebook)

            const userCollection = await firebase.firestore().collection('users')

            userCollection.doc(logIn.user.uid).set({
                userId: logIn.user.uid,
                userHandle: logIn.user.displayName,
                createAt: Date.now(),
                role: 'user',
                phone: '',
                email: logIn.user.email,
                address: '',
                imageURL: 'https://firebasestorage.googleapis.com/v0/b/project-z-68d96.appspot.com/o/avatars%2Ffavicon.png?alt=media&token=ccf0e43e-ce84-464d-b3a0-1e65fdbdf1ec',
            })
            this.$router.push({path: '/', query: {}})
        } catch (error) {
            commit('logInUser', error.message)
        }
        
    }
}