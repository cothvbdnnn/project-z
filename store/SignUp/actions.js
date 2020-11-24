import firebase from "firebase";

export default {
    async actRegisterUser( {commit}, data){
        try {
            const createUser = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)

            this.$router.push({path: '/', query: {}});
            
            const userCollection = await firebase.firestore().collection('users')

            userCollection.doc(createUser.user.uid).set({
                userId: createUser.user.uid,
                userHandle: data.userName,
                createAt: Date.now(),
                role: 'user',
                phone: '',
                email: '',
                address: '',
                imageURL: 'https://firebasestorage.googleapis.com/v0/b/project-z-68d96.appspot.com/o/avatars%2Ffavicon.png?alt=media&token=ccf0e43e-ce84-464d-b3a0-1e65fdbdf1ec',
            })

        } catch (error) {
            commit('registerUser', error.message)
        }
        
    }
}