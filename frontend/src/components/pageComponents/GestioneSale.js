import {Button, Col, Container, Row} from "react-bootstrap"
import {useEffect, useState} from "react";
import axios from "axios";
import {AddressIcon, ChairIcon} from "../icons/Icons";

export default function GestioneSale(){
    const [roomsInfo, setRoomsInfo] = useState([])

    useEffect(() => {
        axios.get('/calendar')
            .then(({data}) => {
                console.log(data)
                setRoomsInfo(data.map(d => ({...d, description: JSON.parse(d.description)})))
            })
    })

    return (
        <Container>
            <Row className='mt-3'>
                <Col className='mt-5'>
                    <div className='text-center mb-2 pb-2'>
                        <h1>Gestione Sale</h1>
                    </div>
                    <div className="d-flex flex-row flex-nowrap overflow-auto mt-2">
                        {[...roomsInfo].map(room => {
                            return (
                                <div className="card card-block mx-2" style={{minWidth: 400}}>
                                    <div className='card-header text-center'>
                                        <h3>{room.summary}</h3>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item"><strong>Codice Sala</strong>: {room.description.codice}</li>
                                        <li className="list-group-item">
                                            <ChairIcon />
                                            <span className='ms-2'>
                                                <strong>Posti a sedere</strong>: {room.description.posti}
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <AddressIcon />
                                            <span className='ms-2'>
                                                <strong>{room.description.indirizzo}</strong>
                                            </span>
                                        </li>
                                    </ul>
                                    <div className='card-footer'>
                                        <Button
                                            onClick={() => document.location.href = '/a/vedi_calendario.html/'+room.summary}
                                            variant='outline-dark'
                                            className='btn-sm rounded-0 float-end'>Vedi calendario</Button>
                                        <Button
                                            onClick={() => document.location.href = '/a/gestione_prenotazione.html/'+room.summary}
                                            variant='outline-dark'
                                            className='btn-sm rounded-0 float-end mx-1'>Gestisci prenotazioni</Button>
                                    </div>
                                </div>

                            )
                        })}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}