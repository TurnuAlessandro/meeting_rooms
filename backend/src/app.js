const express = require('express')
const cors = require('cors')

const app = express()

const index = require('./routes/index')
const userRoute = require('./routes/user.routes')
const calendarRoute = require('./routes/calendar.routes')
const awsRoute = require('./routes/aws.routes')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.json({ type: 'application/vnd.api+json' }))
app.use(cors())

app.use(index)
app.use('/auth/', userRoute)
app.use('/calendar/', calendarRoute)
app.use('/mqtt/', awsRoute)

module.exports = app