import {Button, Container, Dropdown, Nav, Navbar} from "react-bootstrap"
import * as Icon from 'react-bootstrap-icons'
import {ConferenceIcon} from "../../icons/Icons";
import {Link} from "react-router-dom";

export default function SubNavigationBar(props){
    const {
        user,
        onLoginButtonClick,
        onSignUpButtonClick,
        onLogoutButtonClick,
        onViewUsersButtonClick,
        onManageReservationButtonClick,
    } = props

    return (
        <Container fluid className='mx-0 mw-100 p-0' style={{backgroundColor: 'rgb(46,50,59)'}}>
            <Container className='text-center'>
                <Button
                    variant={window.location.pathname === '/a/configurazione_sala.html' ? 'success' : 'outline-dark'}
                    style={{marginRight: 60}}
                    onClick={() => {
                        window.location.href = '/a/configurazione_sala.html'

                    }}
                    className='text-white rounded-0 border-2 border-top-0 border-bottom-0 border-secondary mr-btn-success'>
                    <Link
                        to='/a/configurazione_sala.html'
                        className='mx-2 text-white text-decoration-none'>
                        Configura Sala
                    </Link>
                    <ConferenceIcon />
                </Button>
                <Button
                    variant={window.location.pathname === '/a/gestione_sala.html' ? 'info' : 'outline-dark'}
                    onClick={() => {
                        window.location.href = '/a/gestione_sala.html'
                    }}
                    className={`rounded-0 border-2 border-top-0 border-right-0 border-secondary ${window.location.pathname !== '/a/gestione_sala.html' ? 'text-white' : 'text-black'}`}>
                    <Link
                        to='/a/gestione_sala.html'
                        style={{color: 'inherit'}}
                        className={`mx-2 text-decoration-none`}>
                        Gestione Sale
                    </Link>
                    <Icon.DoorOpen />
                </Button>
                <Button
                    variant={window.location.pathname === '/a/gestione_prenotazione.html' ? 'info' : 'outline-dark'}
                    onClick={() => {
                        window.location.href = '/a/gestione_prenotazione.html'
                    }}
                    style={{borderLeft: 0}}
                    className={`rounded-0 border-2 border-top-0 border-bottom-0 border-secondary ${window.location.pathname !== '/a/gestione_prenotazione.html' ? 'text-white' : 'text-black'}`}>
                    <Link
                        to='/a/gestione_prenotazione.html'
                        style={{color: 'inherit'}}
                        className='mx-2 text-decoration-none'>
                        Gestione Prenotazione
                    </Link>
                    <Icon.Calendar3 />
                </Button>
                <Button
                    variant={window.location.pathname === '/a/vedi_calendario.html' ? 'info' : 'outline-dark'}
                    onClick={() => {
                        window.location.href = '/a/vedi_calendario.html'

                    }}
                    style={{borderLeft: 0}}
                    className={`rounded-0 border-2 border-top-0 border-bottom-0 border-secondary ${window.location.pathname !== '/a/vedi_calendario.html' ? 'text-white' : 'text-black'}`}>
                    <Link
                        to='/a/vedi_calendario.html'
                        style={{color: 'inherit'}}
                        className='mx-2 text-decoration-none'>
                        Vedi Calendario
                    </Link>
                    <Icon.Calendar />
                </Button>
                <Button
                    variant={window.location.pathname === '/a/gestione_utenti.html' ? 'primary' : 'outline-dark'}
                    onClick={() => {
                        window.location.href = '/a/gestione_utenti.html'
                    }}
                    style={{marginLeft: 60}}
                    className={`rounded-0 border-2 border-top-0 border-bottom-0 border-secondary text-white`}>
                    <Link
                        to='/a/gestione_utenti.html'
                        style={{color: 'inherit'}}

                        className='mx-2 text-decoration-none'>
                        Gestione Utenti
                    </Link>
                    <Icon.PersonLinesFill />

                </Button>
            </Container>
        </Container>
    )
}