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
            context.dispatch('Slide/actRealTimeSlide')
            context.dispatch('Customer/actRealTimeCustomer')
            context.dispatch('Order/actRealTimeOrder')
            context.dispatch('Post/actRealTimePost')
            context.dispatch('Tag/actRealTimeTag')
            context.dispatch('Comment/actRealTimeComment')
            context.commit('Cart/getCart')
        } catch (error) {
            console.log(error);
        }   
    },
    async nuxtServerInit(context, { req }){
        try {
            let token = null
            if(req){
                if(req.headers.cookie != undefined){
                    token = req.headers.cookie.split(';').find( c => c.trim().startsWith('token='))
                    if(token){
                        token = token.split('=')[1].split('?')[0]
                    }
                }
            }
            return Promise.all([
                context.dispatch('actGetUserCurrent', token),
                context.dispatch('Product/actGetProducts'),
                context.dispatch('Slide/actGetSlides'),
                context.dispatch('Category/actGetCategories'),
                context.dispatch('Customer/actGetCustomers'),
                context.dispatch('Order/actGetOrders'),
                context.dispatch('Post/actGetPosts'),
                context.dispatch('Tag/actGetTags'),
                context.dispatch('Comment/actGetComments'),
            ]);
        } catch (error) {
            console.log(error);
        }   
    },
    async actIsLogin(context, data){
        let token = ''
        let userCurrent = null

        if(data.idUser){
            const user = firebase.firestore().collection('users').doc(data.idUser.uid).get()
            const getUser = await user
            token = data.idUser.uid + "?" + getUser.data().role
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
    async actEditProfile(context, data){
        try {
            let urlImage = data.avatarOld

            if(data.avatar != null){

                let storageRef = firebase.storage().ref('avatars/' + data.avatar.name)

                let uploadImage = await storageRef.put(data.avatar);
                
                urlImage = await uploadImage.ref.getDownloadURL()
                
                
            }

            // Update profile frontend

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

            // Update collection users

            firebase.firestore().collection('users').doc(data.id).update({
                userHandle: data.userHandle,
                email: data.email,
                phone: data.phone,
                address: data.address,
                imageURL: urlImage,
            })

            // Update collection comments

            const getComment = firebase.firestore().collection('comments').where("userId","==",data.id).get()
            const awaitComment = await getComment
            awaitComment.forEach(response => {
                firebase.firestore().collection('comments').doc(response.id).update({
                    userName: data.userHandle,
                    userImage: urlImage
                })
            })

            if(data.role == 'admin'){
                // Update collection posts

                const getPost = firebase.firestore().collection('posts').where("authorId","==",data.id).get()
                const awaitPost = await getPost
                awaitPost.forEach(response => {
                    firebase.firestore().collection('posts').doc(response.id).update({
                        authorName: data.userHandle,
                        authorImage: urlImage
                    })
                })
            }
            
        } catch (error) {
            console.log(error);
        }
    },
    
}

export const getters = {
    isAuthenticated (state) {
        return !!state.userCurrent
    }
}