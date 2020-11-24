import firebase from "firebase";

export default function ({ store, route, redirect}) {
    if (store.getters.isAuthenticated && route.name === 'login') {
        redirect('/')
    }
    if (store.getters.isAuthenticated && route.name === 'sign-up') {
        redirect('/')
    }
    if (store.state.userCurrent != null && store.state.userCurrent.role == 'user' && route.fullPath.includes('admin')) {
        redirect('/')
    }
}