import firebase from "firebase";

export default {
    async actLogOutUser(){
        try {
            const logOut = await firebase.auth().signOut()

            this.$router.push({path: '/login', query: {}});

        } catch (error) {
            console.log(error.message);
        }
    }
}