const router = require('express-promise-router')()
const calendarController = require('../controllers/calendar.controller')

const fs = require('fs')
const readline = require('readline')
const {google} = require('googleapis')

// If modifying these scopes, delete token.json.
const SCOPES = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events',
]

const TOKEN_PATH = 'token.json'


function getAuth(){
    const secret = JSON.parse(process.env.GOOGLE_CALENDAR_SECRET)
    const {client_secret, client_id, redirect_uris} = secret.installed

    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0])

    // Check if we have previously stored a token.
// Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (!err){
            oAuth2Client.setCredentials(JSON.parse(token));
        } else {
            const authUrl = oAuth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: SCOPES,
            })
            console.log('Authorize this app by visiting this url:', authUrl);
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            })
            rl.question('Enter the code from that page here: ', (code) => {
                rl.close();
                oAuth2Client.getToken(code, (err, token) => {
                    if (err)
                        return console.error('Error retrieving access token', err)

                    oAuth2Client.setCredentials(token);
                    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                        if (err) return console.error(err);
                        console.log('Token stored to', TOKEN_PATH);
                    })
                })
            })
        }
    });
    return oAuth2Client
}
const auth = getAuth()
const service = google.calendar({version: 'v3', auth})





// service.calendarList.list({}, (err, res) => {
//     if (err) return console.log('The API returned an error: ' + err)
//     console.log(res.data.items)
// })
router.get('/', (req, res) => calendarController.getCalendars(req, res, auth))
router.get('/events', (req, res) => calendarController.getEvents(req, res, auth))
//router.get('/:calendarName/event/:name', (req, res) => calendarController.getEvent(req, res, auth))
router.post('/event', (req, res) => calendarController.newEvent(req, res, auth))
router.post('/newCalendar', (req, res) => calendarController.newCalendar(req, res, auth))
module.exports = router