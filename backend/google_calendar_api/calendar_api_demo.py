from pprint import pprint
from Google import Create_Service, convert_to_RFC_datetime

CLIENT_SECRET_FILE = 'client_secret_file.json'
API_NAME = 'calendar'
API_VERSION = 'v3'
SCOPES = ['https://www.googleapis.com/auth/calendar']

service = Create_Service(CLIENT_SECRET_FILE, API_NAME, API_VERSION, SCOPES)

#print(dir(service))

# creates a calendar 
def createCalendar(name):
    request_body = {
        'summary': name
    }
    response = service.calendars().insert(body=request_body).execute()
    return response


#deletes a calendar given its id
def deleteCalendar(id):
    return service.calendars().delete(calendarId=id).execute()

def hourAdjustment(hour):
    return hour - 2
event_request_body = {
    'start' : {
        'dateTime' : convert_to_RFC_datetime(year=2021, month=7, day=12, hour=hourAdjustment(12), minute=0),
        'timeZone' : 'Europe/Rome'
    },
    'end' : {
        'dateTime' : convert_to_RFC_datetime(year=2021, month=7, day=12, hour=hourAdjustment(16), minute=0),
        'timeZone' : 'Europe/Rome'
    },
    'summary' : 'event title',
    'description' : 'event description',
    'colorId' : 5,
    'status': 'confirmed',
    'transparency' : 'opaque', 
    'visibility' : 'public',
    'location' : 'Cagliari, Sardegna', 
    'attendees' : [
        {
            'displayName' : "Alessandro",
            'comment' : 'Ale',
            'email' : 'turnualessandroo@gmail.com',
            'optional' : False,
            'organizer' : True,
            'responseStatus' : 'accepted'
        }
    ]
}

maxAttendees = 5
sendNotifications = True
sendUpdates = 'none'
supportsAttachments = False #per non allegare file 

calendarResponse = createCalendar('Prova Calendario')

response = service.events().insert(
    calendarId=calendarResponse['id'],
    maxAttendees=maxAttendees,
    sendNotifications=sendNotifications,
    sendUpdates=sendUpdates,
    supportsAttachments=supportsAttachments,
    body=event_request_body
).execute()

