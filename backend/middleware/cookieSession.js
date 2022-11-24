const cookieSession = require("cookie-session")
// Adding required middlewares
const cookieSessions = app.use(cookieSession({
    name: 'authSession',
    keys: ["xxxxKKKsdsdsd@!@#$%^&&***"],
    maxAge: 24*60*60*100
}))

module.exports = cookieSessions