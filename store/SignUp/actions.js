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
                imageURL: 'https://firebasestorage.googleapis.com/v0/b/project-z-68d96.appspot.com/o/avatars%2Fnuxt-icon-white.png?alt=media&token=306c5dd7-c3bd-4ab5-bf28-468b383953ed',
            })

        } catch (error) {
            commit('registerUser', error.message)
        }
        
    }
}