const { google } = require('googleapis')

async function getEvents(req, res, auth){
  const calendar = google.calendar({version: 'v3', auth})

  const { minDate, maxDate, currentSala } = JSON.parse(req.query[0])

  function fromUserDateToISOdate({year, month, day}){
    return new Date(year, month, day).toISOString()
  }

  calendar.events.list({
    calendarId: currentSala.id,
    timeMin: fromUserDateToISOdate(minDate || {
      year: 2016,
      month: 0,
      day: 1
    }),
    timeMax: fromUserDateToISOdate(maxDate || {
      year: 2026,
      month: 11,
      day: 31
    }),
    maxResults: 100,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, listEventResponse) => {
    if (err) return console.log('The API returned an error: ' + err)
    res.status(200).send(listEventResponse.data.items.map(event => {
      // TODO da controllare event.desciption is undefined
      let description = {} //JSON.parse(event.description)
      return ({
        ...event,
        ...description
      })
    }))
    return listEventResponse.data.items
  })
}

async function getCalendars(req, res, auth){
  const service = google.calendar({version: 'v3', auth})

  service.calendarList.list({}, (err, gcres) => {
    if (err) return console.log('The API returned an error: ' + err)

    let calendariSale = gcres.data.items.filter(c => !c.primary)
    res.status(200).send(calendariSale)
    return gcres.data
  })
}

async function newEvent(req, res, auth){
  const service = google.calendar({version: 'v3', auth})

  const {user, sala, summary, year, month, monthName, day, dayName, hour, room, ...eventInfo} = req.body

  function add0(x){
    return x.toString().length === 1 ? '0'+x : x
  }
  function transformDate(y, m, d){

    return `${y}-${add0(m+1)}-${add0(d)}`
  }

  const event = {
    'summary': summary,
    'location': sala.summary,
    'description': JSON.stringify({
      user: user.email,
      ...eventInfo
    }),
    'start': {
      'dateTime': `${transformDate(year, month, day)}T${add0(hour)}:00:00`,
      'timeZone': 'Europe/Rome',
    },
    'end': {
      'dateTime': `${transformDate(year, month, day)}T${add0(hour+1)}:00:00`,
      'timeZone': 'Europe/Rome',
    },
  }

  service.events.insert({
    auth: auth,
    calendarId: sala.id,
    resource: event,
  }, function(err, event) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      res.status(500).send('Error Creating the event')
      return;
    }
    res.status(200).send(event)
    console.log('Event %s created', summary);
  })
}

async function newCalendar(req, res, auth){
  const service = google.calendar({version: 'v3', auth})
  const { nome, posti, indirizzo } = req.body

  const new_calendar = {
    summary: nome,
    timeZone: 'Europe/Rome',
    description: JSON.stringify({posti, indirizzo})
  }
  // console.log({new_calendar})

 // console.log("AAAaaaAAAAAAAAAaaaaaaaaaAAAAAAAAAaaaaaaaaaAAAAAAAAAaaaaaaa",service.calendars)

  service.calendarList.insert({colorRgbFormat: 'rgb(50,50,50)', requestBody: new_calendar},(err, r) => {
        console.log({err, r})
        res.send(true)
  })

}

module.exports = {
  getEvents,
  getCalendars,
  newEvent,
  newCalendar
}