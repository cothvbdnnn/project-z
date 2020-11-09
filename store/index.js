import firebase from "firebase";
import Cookies from 'js-cookie'

export const state = () => {
    return {
        userCurrent: null,
    }
}

export const mutations = {
    isLogin(state, data){
        state.userCurrent = data.userCurrent
    },
    editProfile(state, data){
        state.userCurrent = data
    },
}

export const actions = {
    async nuxtClientInit(context){
        try {
            firebase.auth().onAuthStateChanged(user => {
                context.dispatch('actIsLogin', {idUser: user})
            })
            context.dispatch('Category/actRealTimeCategory')
            context.dispatch('Product/actRealTimeProduct')
            context.dispatch('Customer/actRealTimeCustomer')
            context.dispatch('Order/actRealTimeOrder')
        } catch (error) {
            console.log(error);
        }   
    },
    async nuxtServerInit(context, { req }){
        try {
            let token = null
            if(req){
                if(req.headers.cookie != undefined){
                    token = req.headers.cookie.split(';').find( c => c.trim().startsWith('token=')).split('=')[1]
                }
            }
            return Promise.all([
                context.dispatch('actGetUserCurrent', token),
                context.dispatch('Product/actGetProducts'),
                context.dispatch('Category/actGetCategories'),
                context.dispatch('Customer/actGetCustomers'),
                context.dispatch('Order/actGetOrders'),
            ]);
        } catch (error) {
            console.log(error);
        }   
    },
    async actIsLogin(context, data){
        let token = ''
        let userCurrent = null

        if(data.idUser){
            token = data.idUser.uid
            const user = firebase.firestore().collection('users').doc(data.idUser.uid).get()
            const getUser = await user
            userCurrent = getUser.data()
        }
        
        Cookies.set('token', token)
        context.commit('isLogin', {userCurrent: userCurrent})
    },
    async actGetUserCurrent(context, data){
        if(data){
            const user = firebase.firestore().collection('users').doc(data).get()
            const getUser = await user
            let userCurrent = getUser.data()
            context.commit('isLogin', {userCurrent: userCurrent})
        }
    },
    actEditProfile(context, data){
        if(data.avatar == null){
            context.commit('editProfile', {
                userHandle: data.userHandle,
                email: data.email,
                phone: data.phone,
                address: data.address,
                imageURL: data.avatarOld,
                role: data.role,
                createAt: data.createAt,
                userId: data.id,
            })

            firebase.firestore().collection('users').doc(data.id).update({
                userHandle: data.userHandle,
                email: data.email,
                phone: data.phone,
                address: data.address,
                imageURL: data.avatarOld,
            })
        }else{
            // Upload image to storage

            let storageRef = firebase.storage().ref('avatars/' + data.avatar.name)
            let uploadImage = storageRef.put(data.avatar);
            
            uploadImage.on('state_changed', async () =>{
                const urlImage = await uploadImage.snapshot.ref.getDownloadURL()

                context.commit('editProfile', {
                    userHandle: data.userHandle,
                    email: data.email,
                    phone: data.phone,
                    address: data.address,
                    imageURL: urlImage,
                    role: data.role,
                    createAt: data.createAt,
                    userId: data.id,
                })

                firebase.firestore().collection('users').doc(data.id).update({
                    userHandle: data.userHandle,
                    email: data.email,
                    phone: data.phone,
                    address: data.address,
                    imageURL: urlImage,
                })
            })
        }
    }
}

export const getters = {
    isAuthenticated (state) {
        return !!state.userCurrent
    }
}