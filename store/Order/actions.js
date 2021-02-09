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
    actMomoPayment(){
        const uuidv1 = require('uuid/v1');
        const https = require('https');
        //parameters send to MoMo get get payUrl
        var endpoint = "https://test-payment.momo.vn/gw_payment/transactionProcessor"
        var hostname = "https://test-payment.momo.vn"
        var path = "/gw_payment/transactionProcessor"
        var partnerCode = "MOMO"
        var accessKey = "F8BBA842ECF85"
        var serectkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz"
        var orderInfo = "pay with MoMo"
        var returnUrl = "https://momo.vn/return"
        var notifyurl = "https://callback.url/notify"
        var amount = "50000"
        var orderId = uuidv1()
        var requestId = uuidv1()
        var requestType = "captureMoMoWallet"
        var extraData = "merchantName=;merchantId=" //pass empty value if your merchant does not have stores else merchantName=[storeName]; merchantId=[storeId] to identify a transaction map with a physical store

        //before sign HMAC SHA256 with format
        //partnerCode=$partnerCode&accessKey=$accessKey&requestId=$requestId&amount=$amount&orderId=$oderId&orderInfo=$orderInfo&returnUrl=$returnUrl&notifyUrl=$notifyUrl&extraData=$extraData
        var rawSignature = "partnerCode="+partnerCode+"&accessKey="+accessKey+"&requestId="+requestId+"&amount="+amount+"&orderId="+orderId+"&orderInfo="+orderInfo+"&returnUrl="+returnUrl+"&notifyUrl="+notifyurl+"&extraData="+extraData
        //puts raw signature
        console.log("--------------------RAW SIGNATURE----------------")
        console.log(rawSignature)
        //signature
        const crypto = require('crypto');
        var signature = crypto.createHmac('sha256', serectkey)
                        .update(rawSignature)
                        .digest('hex');
        console.log("--------------------SIGNATURE----------------")
        console.log(signature)

        //json object send to MoMo endpoint
        var body = JSON.stringify({
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
        var options = {
        hostname: 'test-payment.momo.vn',
        port: 443,
        path: '/gw_payment/transactionProcessor',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(body)
        }
        };

        //Send the request and get the response
        console.log("Sending....")
        var req = https.request(options, (res) => {
        console.log(`Status: ${res.statusCode}`);
        console.log(`Headers: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (body) => {
            console.log('Body');
            console.log(body);
            console.log('payURL');
            console.log(JSON.parse(body).payUrl);
        });
        res.on('end', () => {
            console.log('No more data in response.');
        });
        });

        req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
        });

        // write data to request body
        req.write(body);
        req.end();
    }
}