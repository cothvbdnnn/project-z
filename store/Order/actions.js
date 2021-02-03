import firebase from "firebase";

export default {
    async actGetOrders(context){
        try {

            const getOrders = firebase.firestore().collection('orders').orderBy('createAt', 'desc').get()
            const awaitOrder = await getOrders
            let orders = []
            awaitOrder.forEach(doc => {
                orders.push({
                    id: doc.id,
                    createAt: doc.data().createAt,
                    name: doc.data().name,
                    userId: doc.data().userId,
                    email: doc.data().email,
                    phone: doc.data().phone,
                    notes: doc.data().notes,
                    address: doc.data().address,
                    total: doc.data().total,
                    order: doc.data().order,
                    read: doc.data().read,
                    status: doc.data().status,
                })
            })
            context.commit('getOrders', orders)

        } catch (error) {
            console.log(error)
        }
    },
    async actRealTimeOrder(context){
        try {
            let initState = true
            firebase.firestore().collection('orders').orderBy('createAt', 'asc').onSnapshot(snap => {
                if (initState) {
                    initState = false;
                } else {
                    if (!snap.docChanges().empty) {
                        snap.docChanges().forEach( change => {
                            let orders = []
                            let doc = change.doc;
                            
                            if(change.type == 'added'){
                                orders.push({
                                    id: doc.id,
                                    createAt: doc.data().createAt,
                                    name: doc.data().name,
                                    userId: doc.data().userId,
                                    email: doc.data().email,
                                    phone: doc.data().phone,
                                    notes: doc.data().notes,
                                    address: doc.data().address,
                                    total: doc.data().total,
                                    order: doc.data().order,
                                    read: doc.data().read,
                                    status: doc.data().status,
                                })
                                context.commit('addOrder', orders)
                                
                            }
                            if (change.type === "removed") {
                                context.commit('removeOrder', doc.data())
                            }
                            if (change.type === "modified") {
                                context.commit('editOrder', doc.data())
                            }
                        })   
                    }
                }
			})
        } catch (error) {
            console.log(error)
        }
    },
    actAddOrder(context, data){
        let formatId = Math.random().toString(36).substr(2, 9)

        data.order.forEach(order => {
            firebase.firestore().collection('products').doc(order.id).update({
                quantity: firebase.firestore.FieldValue.increment(-order.quantity)
            })
        })

        firebase.firestore().collection('orders').doc(formatId).set({
            id: formatId,
            createAt: Date.now(),
            read: false,
            status: 'Processing',
            name: data.name,
            userId: data.userId,
            email: data.email,
            phone: data.phone,
            address: data.address,
            notes: data.notes,
            order: data.order,
            total: data.total,
        })
    },
    async actRemoveOrder(context, data){
        firebase.firestore().collection('orders').doc(data.id).delete()
        data.order.forEach(order => {
            firebase.firestore().collection('products').doc(order.id).update({
                quantity: firebase.firestore.FieldValue.increment(order.quantity)
            })
        })
    },
    async actEditOrder(context, data){
        firebase.firestore().collection('orders').doc(data.id).update({
            status: data.status
        })
        
    },
}