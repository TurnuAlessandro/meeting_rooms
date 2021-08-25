const app = require('./src/app')

//const { users } = require('./data')
//const { authUser } = require('./auth')

const port = process.env.PORT || 8000



//const subscribersRouter = require('./routes/room.js')
//app.use('/room', subscribersRouter)
/*
app.get('/dashboard', /*authUser,/*\ (req, res) => {
    res.json([1,2,3,4444,5,6])
})
*/
/*
function setUser(req, res, next){
    const userId = req.body.userId
    if(userId)
        req.user = users.find(user => user.id === userId)

    next()
}*/


app.listen(port, () => console.log(`Server listening on port ${port}`))