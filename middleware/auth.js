import firebase from "firebase";

export default function ({ store, route, redirect}) {
    if (store.getters.isAuthenticated && route.name === 'login') {
        redirect('/')
    }
    if (store.getters.isAuthenticated && route.name === 'sign-up') {
        redirect('/')
    }
}