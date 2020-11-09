import firebase from "firebase";

export default {
    async actLogInUser( {commit}, data){
        try {

            const logIn = await firebase.auth().signInWithEmailAndPassword(data.email, data.password)

			this.$router.push({path: '/', query: {}});

        } catch (error) {
            commit('logInUser', error.message)
        }
        
    }
}