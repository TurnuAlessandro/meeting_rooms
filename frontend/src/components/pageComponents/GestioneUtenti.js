import {Button, Col, Container, Row, Badge} from "react-bootstrap"
import {useEffect, useState} from "react"
import {v4 as uuidv4} from 'uuid'
import axios from "axios"

export default function GestioneUtenti(){
    const [users, updateUsers] = useState([])
    const [emailFilter, updateEmailFilter] = useState('')
    const [nameFilter, updateNameFilter] = useState('')

    useEffect(() => {
        axios
            .get('/auth/')
            .then(res => updateUsers(res.data.map(u => ({...u, block: false}))))
    }, [])

    const toggleBlock = user => {
        updateUsers(users.reduce((arr, u) => {
            if(u.email === user.email){
                u.block = !u.block
            }
            return [...arr, u]
        }, []))
    }

    const userFiltered = users.filter(u => u.name.includes(nameFilter)).filter(u => u.email.includes(emailFilter))

    return (
        <Container style={{marginTop: 50}}>
            <Row>
                <Col>
                    <div className='text-center h1'>Utenti</div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-4'>
                                <div className="input-group input-group-sm mb-3">
                                    <div className="input-group-prepend">
                                        <label htmlFor='i1' className="input-group-text" id="inputGroup1">Filtra per nome</label>
                                    </div>
                                    <input type="text"
                                           id='i1'
                                           className="form-control"
                                           aria-label="Small"
                                           onChange={e => updateNameFilter(e.target.value)}

                                           aria-describedby="inputGroup1"/>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className="input-group input-group-sm mb-3">
                                    <div className="input-group-prepend">
                                        <label className="input-group-text" htmlFor='i2'>Filtra per email</label>
                                    </div>
                                    <input type="text"
                                           id='i2'
                                           onChange={e => updateEmailFilter(e.target.value)}
                                           className="form-control"
                                           aria-label="Small"
                                           aria-describedby="inputGroup-sizing-sm"/>
                                </div>
                            </div>



                        </div>
                    </div>
                    {
                        userFiltered.length === 0 ?
                            <div>
                                Nessun utente
                            </div>
                            :

                            <table
                                className='table table-dark table-striped'>
                                <thead>
                                <tr>
                                    <th scope='col' className='text-center'>#</th>
                                    <th scope='col'>Nome</th>
                                    <th scope='col'>Email</th>
                                    <th scope='col'>Stato</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {userFiltered.map((user, index) => (
                                    <tr key={uuidv4()}>
                                        <td scope='row' className='text-center'>{index+1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {
                                                user.block ?
                                                    <Badge bg="danger">Ban</Badge>
                                                    :
                                                    <Badge bg="success">Attivo</Badge>
                                            }
                                        </td>
                                        <td className='text-center'>
                                            {user.block ?
                                                <Button
                                                    variant={'secondary'}
                                                    className={'rounded-0'}
                                                    style={{width: 110}}
                                                    onClick={() => toggleBlock(user)}>
                                                    Sblocca
                                                </Button>
                                                :
                                                <Button
                                                    variant={'danger'}
                                                    style={{width: 110}}
                                                    className={'rounded-0'}
                                                    onClick={() => toggleBlock(user)} >
                                                    Blocca
                                                </Button>
                                            }
                                        </td>
                                    </tr>
                                ))}
                                </tbody>

                            </table>
                    }

                </Col>
            </Row>
        </Container>
    )
}