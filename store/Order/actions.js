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
    actMomoPayment(context, data){
        const uuidv1 = require('uuid/v1')
        const https = require('https')

        //parameters send to MoMo get payUrl

        let endpoint = "https://test-payment.momo.vn/gw_payment/transactionProcessor"
        let hostname = "https://test-payment.momo.vn"
        let path = "/gw_payment/transactionProcessor"
        let partnerCode = "MOMOWEJ020210209"
        let accessKey = "xbCzgnNIrhxAEyUL"
        let serectkey = "4LjJutUecZRGULBMVyKEJS4Hm9rq6jmV"
        let orderInfo = "Sử dụng app MoMo TEST và sử dụng account test do MoMo cung cấp sẵn 0917003003 Mật khẩu: 000000 Mã xác thực: 000000"
        let returnUrl = window.location.origin + '/check-out'
        let notifyurl = window.location.origin + '/check-out'
        let amount = data.total.toString()
        let orderId = uuidv1()
        let requestId = uuidv1()
        let requestType = "captureMoMoWallet"
        let extraData = "merchantName=;merchantId="

        //before sign HMAC SHA256 with format

        let rawSignature = "partnerCode="+partnerCode+"&accessKey="+accessKey+"&requestId="+requestId+"&amount="+amount+"&orderId="+orderId+"&orderInfo="+orderInfo+"&returnUrl="+returnUrl+"&notifyUrl="+notifyurl+"&extraData="+extraData
       
        const crypto = require('crypto');
        let signature = crypto.createHmac('sha256', serectkey).update(rawSignature).digest('hex')

        //json object send to MoMo endpoint

        let body = JSON.stringify({
            partnerCode : partnerCode,
            accessKey : accessKey,
            requestId : requestId,
            amount : amount,
            orderId : orderId,
            orderInfo : orderInfo,
            returnUrl : returnUrl,
            notifyUrl : notifyurl,
            extraData : extraData,
            requestType : requestType,
            signature : signature,
        })

        //Create the HTTPS objects

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('GET', 'POST', 'OPTIONS');

        let options = {
            hostname: 'test-payment.momo.vn',
            port: 443,
            path: '/gw_payment/transactionProcessor',
            method: 'POST',
            headers: headers
        };

        //Send the request and get the response

        let req = https.request(options, (res) => {

            res.setEncoding('utf8')

            res.on('data', (body) => {
                window.location.replace(JSON.parse(body).payUrl)
            })

            res.on('end', () => {
                console.log('No more data in response.');
            })

        });

        req.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
        });

        // write data to request body

        req.write(body);
        req.end();
    }
}