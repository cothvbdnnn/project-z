import firebase from "firebase";

export default {
    async actGetCustomers(context){
        try {

            const getCustomers = firebase.firestore().collection('users').orderBy('createAt', 'desc').get()
            const awaitCustomer = await getCustomers
            let customers = []
            awaitCustomer.forEach(doc => {
                customers.push({
                    id: doc.id,
                    createAt: doc.data().createAt,
                    name: doc.data().userHandle,
                    email: doc.data().email,
                    phone: doc.data().phone,
                    image: doc.data().imageURL,
                    role: doc.data().role,
                    address: doc.data().address,
                })
            })
            context.commit('getCustomers', customers)

        } catch (error) {
            console.log(error)
        }
    },
    async actRealTimeCustomer(context){
        try {
            let initState = true
            firebase.firestore().collection('users').orderBy('createAt', 'asc').onSnapshot(snap => {
                if (initState) {
                    initState = false;
                } else {
                    if (!snap.docChanges().empty) {
                        snap.docChanges().forEach( change => {
                            let users = []
                            let doc = change.doc;
                            
                            if(change.type == 'added'){
                                users.push({
                                    id: doc.id,
                                    createAt: doc.data().createAt,
                                    name: doc.data().userHandle,
                                    email: doc.data().email,
                                    phone: doc.data().phone,
                                    image: doc.data().imageURL,
                                    role: doc.data().role,
                                    address: doc.data().address,
                                })
                                context.commit('addCustomer', users)
                                
                            }
                            if (change.type === "removed") {
                            }
                            if (change.type === "modified") {
                            }
                        })   
                    }
                }
			})
        } catch (error) {
            console.log(error)
        }
    },
}