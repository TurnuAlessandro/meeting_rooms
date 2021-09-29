import {v4 as uuidv4} from 'uuid'
import {Button, Col, Container, Modal, Row} from "react-bootstrap"
import {useEffect, useState} from "react"
import axios from "axios"
import moment from "moment"
import {getFirstDayOfThisWeek, NOMI_GIORNI_SETTIMANA, NOMI_MESI} from "../../utils/date_management"
import PrenotaSalaModalForm from "../PrenotaSalaModalForm";
import PrenotazioneInfoModal from "../PrenotazioneInfoModal";

export default function Calendario({
                                        user,
                                       currentSala,
                                       year,
                                       weekNumber
                                   }){
    const [googleCalendarEvents, setGoogleCalendarEvents] = useState([])
    const [eventInfoModalInfo, setEventInfoModalInfo] = useState({isOpen: false, currentEvent: null})
    const [weekArray, setWeekArray] = useState([])
    const [bookingModalInfo, setBookingModalInfo] = useState({
        isOpen: false,
        currentSlot: null
    })

    const [currentInterval, updateInterval] = useState(null)

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
        }, 600)
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
                                    <Button
                                        variant='outline-light'
                                        className='float-end rounded-1'>info</Button>
                                </>
                                : <h4 className={'text-white'}>sto caricando gli eventi...</h4>}
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

                                            const [occupiedArray] = googleCalendarEvents.filter(o => {
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
                                                meetingName = occupiedArray.summary
                                            }

                                            return (
                                                <Col
                                                    key={uuidv4()}
                                                    onClick={() => {
                                                        if(isOccupied){
                                                            setEventInfoModalInfo({
                                                                isOpen: occupiedArray !== undefined,
                                                                currentEvent: occupiedArray || null
                                                            })
                                                        } else {
                                                            setBookingModalInfo(old => ({
                                                                ...old,
                                                                isOpen: true,
                                                                currentSlot: {...date, hour: ora, room: currentSala.summary}
                                                            }))
                                                        }

                                                    }}
                                                    className={`border-2 text-white text-center meetingrooms-timetable-slot ${isOccupied ? 'occupied' : ''}`}>
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
        </>
    )
}