const { ROLE, users } = require('./data')

function authUser(req, res, next){
    console.log({user: req.userId})
    if(!req.userId){
        req.user = {id:-1, name: 'Guest User', role: ROLE.PUBLIC} // lo user è il guest, sola visualizzazione
    } else {
        req.user = users.find(u => u.id = req.userId)

        if(!req.user){
            return res.status(403).send('You need to sign up')
        }
    }

    console.log()

    next()
}

module.exports = {
    authUser
}