import {v4 as uuidv4} from 'uuid'
import {Button, Col, Container, Modal, Row} from "react-bootstrap"
import {useEffect, useState} from "react"
import axios from "axios"
import moment from "moment"
import {getFirstDayOfThisWeek, NOMI_GIORNI_SETTIMANA, NOMI_MESI} from "../../utils/date_management"
import PrenotaSalaModalForm from "../../components/pageComponents/PrenotaSalaModalForm"
import PrenotazioneInfoModal from "../../components/pageComponents/PrenotazioneInfoModal"
import '../../css/event_state.css'
import YesNoModal from "../../utils/YesNoModal"
import {EVENT_STATE} from "../../utils/event_state"

export default function CalendarioUser({
                                            user,
                                            currentSala,
                                            year,
                                            weekNumber,
                                            filter,
                                            updateDelay = 600
                                        }){
    const [googleCalendarEvents, setGoogleCalendarEvents] = useState([])
    const [eventInfoModalInfo, setEventInfoModalInfo] = useState({isOpen: false, currentEvent: null})
    const [weekArray, setWeekArray] = useState([])
    const [bookingModalInfo, setBookingModalInfo] = useState({
        isOpen: false,
        currentSlot: null
    })

    const [eventInfoModal, updateEventInfoModal] = useState({
        show: false,
        event: null
    })

    const [currentInterval, updateInterval] = useState(null)
    const [currentTimeEvent, setCurrentTimeEvent] = useState(null)

    const orari = Array(12).fill(0).map((_, index) => index+9)

    useEffect(updateWeekArray, [year, weekNumber])

    function updateWeekArray(){
        let startDate = moment({year})// restituisce il primo giorno di un certo anno (1 gennaio)
            .add(weekNumber, 'week') // aggiunge un tot di settimane
            .startOf('week') // restituisce il giorno in cui inizia la settimana
            .add(1, 'day') // aggiunge un giorno per far iniziare la settimana di lunedì e non di domenica

        const weekArray = NOMI_GIORNI_SETTIMANA.reduce((array, giornoSettimanaString, i) => {
            let giornoMoment = startDate.clone().add(i, 'days')

            return [...array, {
                year: giornoMoment.get('year'),
                month: giornoMoment.get('month'), // GEN = 0, FEB = 1, etc
                monthName: NOMI_MESI[giornoMoment.get('month')],
                day: giornoMoment.get('date'),
                dayName: giornoSettimanaString,
            }]
        }, [])
        setWeekArray(weekArray)
    }

    useEffect(() => {
        currentInterval && clearInterval(currentInterval)
        const interval = setInterval(() => {
            const firstDayOfThisWeek = getFirstDayOfThisWeek()
            const lastDayOfThisWeek = getFirstDayOfThisWeek().clone().add(7, 'days')

            let minDate = firstDayOfThisWeek.clone().add(-2, 'days')
            let maxDate = lastDayOfThisWeek.clone().add(2, 'days')

            minDate = {
                year: minDate.year(),
                month: minDate.get('month'),
                day: minDate.get('date')
            }
            maxDate = {
                year: maxDate.year(),
                month: maxDate.get('month'),
                day: maxDate.get('date')
            }
            // Prende gli eventi di google calendar
            currentSala &&
            axios.get(`/calendar/events`, {params: JSON.stringify({minDate, maxDate, currentSala})})
                .catch(err => console.warn(err))
                .then((res) => {
                    if(!res) return
                    const { data } = res
                    function transform({start, ...info}){
                        const startDate = moment(start.dateTime)
                        return {
                            ...info,
                            date: {
                                year: startDate.get('year'),
                                month: startDate.get('month'),
                                day: startDate.get('date'),
                                hour: startDate.get('hour')
                            }
                        }
                    }
                    if([...data].length > 0){
                        setGoogleCalendarEvents([...data].map(transform))
                    }
                })
            // Controlla lo stato del bottone
            axios.get('/mqtt/')
                .then(res => {

                    const tempEvent = {
                        summary: '',
                        date: {
                            year: moment().get('year'),
                            month: moment().get('month'),
                            day: moment().get('date'),
                            hour: moment().get('hour')
                        },
                        description: {stato: 'OCCUPATO', user: ''}
                    }
                    if(res.data === 1023){
                        setCurrentTimeEvent(tempEvent)
                    }
                })
        }, updateDelay)
        updateInterval(interval)
    }, [currentSala])

    return (
        <>
            <Container
                id={'calendar-container'}
                style={{border: '1px solid black', borderRadius: '10px', padding: '10px 30px'}}
                className='admin mt-3'>
                <Row>
                    <Col xs={12} className='text-start my-1'>
                        <div
                            style={{borderRadius: 7, backgroundColor: 'rgba(33,37,41,.8)'}}
                            className='px-3 py-2 d-flex align-content-around justify-content-center'>
                            {currentSala ?
                                <>
                                    <div
                                        style={{fontSize: '1.5em', marginRight: 15}}
                                        className='d-inline-block font-weight-bold text-white rounded-0'>{currentSala.summary}</div>
                                    <a href='https://calendar.google.com/calendar/u/0/r' target='_blank'>
                                        <Button
                                            variant='light'
                                            className='float-end rounded-1 btn-sm'>
                                            vedi su
                                            <svg height="32" viewBox="0 0 32 32" width="32">
                                                <path d="M22,4.5v6H10v11H4V6.5a2.0059,2.0059,0,0,1,2-2Z" fill="#4285f4" />
                                                <polygon fill="#ea4435" points="22 27.5 22 21.5 28 21.5 22 27.5" />
                                                <rect fill="#ffba00" height="12" width="6" x="22" y="9.5" />
                                                <rect fill="#00ac47" height="12" transform="translate(40.5 8.5) rotate(90)" width="6" x="13" y="18.5" />
                                                <path d="M28,6.5v4H22v-6h4A2.0059,2.0059,0,0,1,28,6.5Z" fill="#0066da" />
                                                <path d="M10,21.5v6H6a2.0059,2.0059,0,0,1-2-2v-4Z" fill="#188038" />
                                                <path d="M15.69,17.09c0,.89-.66,1.79-2.15,1.79a3.0026,3.0026,0,0,1-1.52-.39l-.08-.06.29-.82.13.08a2.3554,2.3554,0,0,0,1.17.34,1.191,1.191,0,0,0,.88-.31.8586.8586,0,0,0,.25-.65c-.01-.73-.68-.99-1.31-.99h-.54v-.81h.54c.45,0,1.12-.22,1.12-.82,0-.45-.31-.71-.85-.71a1.8865,1.8865,0,0,0-1.04.34l-.14.1-.28-.79.07-.06a2.834,2.834,0,0,1,1.53-.45c1.19,0,1.72.73,1.72,1.45a1.4369,1.4369,0,0,1-.81,1.3A1.52,1.52,0,0,1,15.69,17.09Z" fill="#4285f4" />
                                                <polygon fill="#4285f4" points="18.71 12.98 18.71 18.79 17.73 18.79 17.73 14 16.79 14.51 16.58 13.69 17.95 12.98 18.71 12.98" />
                                            </svg>
                                        </Button>
                                    </a>
                                </>
                                : <h4 className={'text-white'}>Loading...</h4>}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className='col-auto' style={{width: 110}} >{' '}</Col>
                    {weekArray.map(weekDataElement => `${weekDataElement.dayName} ${weekDataElement.day} ${weekDataElement.monthName}`)
                        .map(giorno => <Col key={uuidv4()} className='text-center'>{giorno}</Col>)}
                </Row>
                <Row
                    style={{height: 490}}
                    className={'overflow-auto overflow-auto'}>
                    <Container>
                        {orari.map(ora => {
                            return (
                                <Row key={uuidv4()}>
                                    <Col
                                        style={{textAlign: 'right', padding: '15px 5px 15px 0px', width: 110}}
                                        className='text-right col-auto'>
                                        <b>{ora}:00</b>-{ora+1}:00
                                    </Col>
                                    {weekArray
                                        .map((date) => {
                                            const {
                                                day,
                                                year,
                                                month,
                                            } = date
                                            let isOccupied = false
                                            let meetingName = ''
                                            let eventState = 'none'

                                            const [occupiedArray] = [...googleCalendarEvents, currentTimeEvent]
                                                .filter(e => e) // elimina undefined e nulll
                                                .filter(event => {
                                                    const cond1 = filter.length === 0
                                                    const cond2 = filter.indexOf(event.description.stato) !== -1
                                                    return cond1 || cond2
                                                }) // filtra il cui stato non è tra i filtri
                                                .filter(o => {
                                                    const meetingDate = o.date
                                                    if(meetingDate.hour === ora){
                                                        return day === meetingDate.day
                                                            && year === meetingDate.year
                                                            && month === meetingDate.month
                                                    }
                                                    return false
                                                })

                                            if(occupiedArray) {
                                                isOccupied = true
                                                if(occupiedArray.description.user === user.name){
                                                    meetingName = occupiedArray.summary
                                                    eventState = occupiedArray.description.stato
                                                } else {
                                                    eventState = 'OCCUPATO'
                                                    meetingName = ''
                                                }
                                            }

                                            return (
                                                <Col
                                                    key={uuidv4()}
                                                    onClick={() => {
                                                        if(isOccupied){
                                                            if(occupiedArray.description.stato === EVENT_STATE.CONFERMATO){
                                                                updateEventInfoModal({
                                                                    show: true,
                                                                    event: occupiedArray
                                                                })
                                                            }
                                                        } else {
                                                            setBookingModalInfo(old => ({
                                                                ...old,
                                                                isOpen: true,
                                                                currentSlot: {...date, hour: ora, room: currentSala.summary}
                                                            }))
                                                        }
                                                    }}
                                                    className={`border-2 text-center meetingrooms-timetable-slot user ${isOccupied ? 'occupied' : 'prenotabile'}  ${eventState}`}>
                                                    {isOccupied ? meetingName : ''}
                                                </Col>
                                            )
                                        })}
                                </Row>
                            )
                        })}
                    </Container>
                </Row>
            </Container>

            <PrenotazioneInfoModal
                onHide={() => setEventInfoModalInfo({isOpen: false, currentEvent: null})}
                show={eventInfoModalInfo.isOpen}
                event={eventInfoModalInfo.currentEvent}
            />

            <PrenotaSalaModalForm
                centered
                slot={bookingModalInfo.currentSlot}
                show={bookingModalInfo.isOpen}
                size={'md'}
                onHide={() => setBookingModalInfo(old => ({...old, isOpen: false}))}
                onSubmit={values => {
                    axios.post('/calendar/event/', {user, sala: {...currentSala}, ...values})
                        .catch(err => console.warn(err))
                        .then(res => {
                            // mqtt
                            const daMandareAMqtt =
                                setBookingModalInfo(old => ({...old, isOpen: false}))
                        })
                }}/>


            {/*Form di approvazione/rifiuto di richiesta di prenotazione
            <YesNoModal
                yesText={'Approva richiesta'}
                noText={'Rifiuta prenotazione'}
                onYes={() => {
                    // codice per approvare la prenotazione e portarlo nello stato confermato
                    const event = approvazioneMeetingModal.event
                    event.description.stato = EVENT_STATE.CONFERMATO
                    axios.put('/calendar/event', event)
                    updateApprovazioneMeetingModal(old => ({...old, show: false, event: null}))
                }}
                onNo={() => {
                    // codice per rifiutare la cancellazione e portarlo in rifiutato
                    const event = approvazioneMeetingModal.event
                    event.description.stato = EVENT_STATE.REVOCATO
                    axios.put('/calendar/event', event)
                    updateApprovazioneMeetingModal(old => ({...old, show: false, event: null}))

                }}
                title={'Richiesta di prenotazione'}
                body={
                    <div>
                        Nome Riunione: <b>{approvazioneMeetingModal.event ? approvazioneMeetingModal.event.summary : ''}</b> <br/>
                        Meeting in richiesta di approvazione da <b>{approvazioneMeetingModal.event ? approvazioneMeetingModal.event.description.user : ''}</b>
                    </div>
                }
                onHide={() => updateApprovazioneMeetingModal(old => ({...old, show: false, event: null}))}
                show={approvazioneMeetingModal.show}
            />*/}


            {/*Form di approvazione/rifiuto di richiesta di cancellazione
            <YesNoModal
                yesText={'Approva'}
                noText={'Rifiuta'}
                onYes={() => {
                    // codice per approvare la cancellazione e portarlo nello stato cancellato
                    const event = approvazioneCancellazioneMeetingModal.event
                    event.description.stato = EVENT_STATE.CANCELLATO
                    axios
                        .put('/calendar/event', event)
                        .then(e => console.log(e))

                    updateApprovazioneCancellazioneMeetingModal(old => ({...old, show: false, event: null}))

                }}
                onNo={() => {
                    // codice per rifiutare la cancellazione e portarlo in confermato
                    const event = approvazioneCancellazioneMeetingModal.event
                    event.description.stato = EVENT_STATE.CONFERMATO
                    axios
                        .put('/calendar/event', event)
                        .then(e => console.log(e))

                    updateApprovazioneCancellazioneMeetingModal(old => ({...old, show: false, event: null}))

                }}
                title={'Approvazione cancellazione'}
                body={<div>
                    Nome Riunione: <b>{approvazioneCancellazioneMeetingModal.event ? approvazioneCancellazioneMeetingModal.event.summary : ''}</b> <br/>
                    Il meeting era stato richiesto da <b>{approvazioneCancellazioneMeetingModal.event ? approvazioneCancellazioneMeetingModal.event.description.user : ''}</b>
                </div>}
                onHide={() => updateApprovazioneCancellazioneMeetingModal(old => ({...old, show: false, event: null}))}
                show={approvazioneCancellazioneMeetingModal.show}
            />*/}

            <PrenotazioneInfoModal
                show={eventInfoModal.show}
                event={eventInfoModal.event}
                onHide={() => updateEventInfoModal(old => ({...old, show: false, event: null}))}
            />
        </>
    )
}