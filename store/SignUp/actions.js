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
                imageURL: 'https://firebasestorage.googleapis.com/v0/b/project-z-68d96.appspot.com/o/avatars%2Fbanner2.jpg?alt=media&token=a1980039-45c9-47a8-ab9b-a0cc4e3b1784',
            })

        } catch (error) {
            commit('registerUser', error.message)
        }
        
    }
}