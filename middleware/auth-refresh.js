export default function (context) {
    context.isLogin = false
    context.role = 'user'
    if(context.req){
        if(context.req.headers.cookie != undefined){
            let token = context.req.headers.cookie.split(';').find( c => c.trim().startsWith('token='))
            if(token){
                context.isLogin = true
                let role = token.split('=')[1].split('?')[1]
                if(role == "admin"){
                    context.role = 'admin'
                }
            }
        }
        if (context.isLogin && context.route.name === 'login') {
            context.redirect('/')
        }
        if (context.isLogin && context.route.name === 'sign-up') {
            context.redirect('/')
        }
        if (context.role == 'user' && context.route.fullPath.includes('admin')) {
            context.redirect('/')
        }
        if (!context.isLogin && context.route.fullPath.includes('admin') || context.route.name === 'profile' || context.route.name === 'order' || context.route.name === 'order-view-orderId') {
            context.redirect('/login')
        }
    }  
    
    
}