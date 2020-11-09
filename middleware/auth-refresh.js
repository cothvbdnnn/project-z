export default function (context) {
    context.isLogin = false
    if(context.req){
        if(context.req.headers.cookie != undefined){
            let token = context.req.headers.cookie.split(';').find( c => c.trim().startsWith('token='))
            if(token){
                token = token.split('=')[1]
                if(token != ""){
                    context.isLogin = true
                }
            }
        }
        if (context.isLogin && context.route.name === 'login') {
            context.redirect('/')
        }
        if (context.isLogin && context.route.name === 'sign-up') {
            context.redirect('/')
        }
        if (!context.isLogin && context.route.fullPath.includes('admin')) {
            context.redirect('/login')
        }
    }  
    
    
}