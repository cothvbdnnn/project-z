const middleware = {}

middleware['auth-refresh'] = require('..\\middleware\\auth-refresh.js')
middleware['auth-refresh'] = middleware['auth-refresh'].default || middleware['auth-refresh']

middleware['auth'] = require('..\\middleware\\auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

export default middleware
