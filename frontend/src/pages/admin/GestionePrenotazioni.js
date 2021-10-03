import {Button, Col, Container, Modal, Row} from "react-bootstrap"
import { v4 as uuidv4 } from 'uuid'
import '../../css/timetable.css'
import {useEffect, useState} from "react"
import moment from 'moment'
import axios from "axios"
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import {EVENT_STATE, EVENT_STATE_LABELS} from "../../utils/event_state";
import '../../css/event_state.css'
import CalendarioGestionePrenotazioni from "./CalendarioAdmin";
import CalendarioAdmin from "./CalendarioAdmin";
const animatedComponents = makeAnimated()

const getOption = key =>
    ({
        label:
            <div
                className={`p-1 px-3 m-0 rounded-1 w-auto ${key}`}>
                {EVENT_STATE_LABELS[key].admin}
            </div>,
        value: EVENT_STATE[key]
    })

const stateOptions = [...Object.keys(EVENT_STATE)].map(getOption)

export default function GestionePrenotazioni({user}){
    const [weekData, setWeekData] = useState({
        year: 2000,
        weekNumber: 1
    })
    const [roomsInfo, setRoomsInfo] = useState({
        list: [],
        currentIndex: 0
    })
    const [eventFilter, updateEventFilter] = useState(stateOptions.map(option => option.value))

    // onMount
    useEffect(() => {
        updateWeekData(`${moment().get('year')}-W${moment().isoWeek()}`)
        axios.get('/calendar')
            .then(({data}) => {
                setRoomsInfo(old => ({
                    ...old,
                    list: data
                }))
            })
    }, [])

    function updateWeekData(string){
        if(!string)
            return

        let [year, weekNumber] = string.split('-')
        weekNumber = parseInt(weekNumber.replace('W', ''))
        year = parseInt(year)

        setWeekData({weekNumber, year})
    }

    console.log(eventFilter)
    return (
        <>
            <Container fluid>
                <Row>
                    <Col xs={1}/>
                    <Col xs={10} className='mt-3 text-center border border-success border-2 p-2 rounded-2'>
                        <h5>Filtra in base allo stato dell'evento</h5>
                        <Select
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            defaultValue={stateOptions}
                            onChange={(e) => {
                                updateEventFilter(e.map(option => option.value))
                            }}
                            isMulti
                            options={stateOptions} />
                    </Col>
                    <Col xs={1}/>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    <Col xs={1} />
                    <Col xs={10}>
                        <Container fluid>
                            <Row>
                                <Col xs={12}>
                                    <Container fluid>
                                        <Row>
                                            <Col className='text-center' xs={6}>
                                                <label
                                                    htmlFor='week-input'>Scegli Sala</label>
                                                <div>
                                                    <Button
                                                        variant={'outline-dark'}
                                                        className={'rounded-0'}
                                                        onClick={() => setRoomsInfo(oldInfo => {
                                                            let {currentIndex, list} = oldInfo
                                                            currentIndex = Math.abs((currentIndex-1)%list.length)
                                                            return {
                                                                ...oldInfo,
                                                                currentIndex
                                                            }
                                                        })}>
                                                        {'<'}
                                                    </Button>

                                                    <select
                                                        type='week'
                                                        id='sala-input'
                                                        value={roomsInfo.currentIndex}
                                                        className='form-control d-inline border-dark rounded-0'
                                                        style={{width: '250px', cursor: 'pointer'}}
                                                        onChange={e => {
                                                            updateWeekData(e.target.value)
                                                        }}>
                                                        {roomsInfo.list.map((sala, i) => {
                                                            return <option
                                                                key={uuidv4()}
                                                                value={i}>{sala.summary}</option>
                                                        })}
                                                    </select>
                                                    <Button
                                                        variant={'outline-dark'}
                                                        className={'rounded-0'}
                                                        onClick={() => setRoomsInfo(oldInfo => {
                                                            let {currentIndex, list} = oldInfo
                                                            console.log({currentIndex})
                                                            currentIndex = Math.abs((currentIndex+1)%list.length)
                                                            return {
                                                                ...oldInfo,
                                                                currentIndex
                                                            }
                                                        })}>
                                                        {'>'}
                                                    </Button>
                                                </div>
                                            </Col>
                                            <Col className='text-center' xs={6}>
                                                <label
                                                    htmlFor='week-input'>Scegli settimana</label>
                                                <div>
                                                    <Button
                                                        variant={'outline-dark'}
                                                        className={'rounded-0'}
                                                        onClick={() => setWeekData(oldWeekData => ({...oldWeekData, weekNumber: weekData.weekNumber-1}))}>
                                                        {'<'}
                                                    </Button>

                                                    <input
                                                        type='week'
                                                        id='week-input'
                                                        value={`${weekData.year}-W${String(weekData.weekNumber).length <= 1 ? '0'+String(weekData.weekNumber) : String(weekData.weekNumber)}`}
                                                        className='form-control d-inline border-dark w-auto'
                                                        onChange={e => {
                                                            updateWeekData(e.target.value)
                                                        }} />
                                                    <Button
                                                        variant={'outline-dark'}
                                                        className={'rounded-0'}
                                                        onClick={() => setWeekData(oldWeekData => ({...oldWeekData, weekNumber: weekData.weekNumber+1}))}>
                                                        {'>'}
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                            </Row>
                        </Container>
                        <CalendarioAdmin
                            user={user}
                            filter={eventFilter}
                            currentSala={roomsInfo.list[roomsInfo.currentIndex]}
                            year={weekData.year}
                            weekNumber={weekData.weekNumber} />
                    </Col>
                    <Col xs={1}/>
                </Row>
            </Container>
        </>
    )
}