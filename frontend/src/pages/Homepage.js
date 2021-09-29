
import {useEffect, useState} from "react"
import SignUp from "../components/authentication/SignUp"
import Login from "../components/authentication/Login"
import MessageModal from "../components/authentication/MessageModal"
import NavigationBar from "../components/pageComponents/NavigationBar"
import SubNavigationBar from "../components/pageComponents/SubNavigationBar"
import ConfiguraSala from "../components/pageComponents/ConfiguraSala"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import GestionePrenotazioni from "../components/pageComponents/GestionePrenotazioni"
import GestioneSale from "../components/pageComponents/GestioneSale"
import VediCalendario from "../components/pageComponents/VediCalendario"
import GestioneUtenti from "../components/pageComponents/GestioneUtenti"
import axios from "axios"

export default function Homepage({user, login, signup, logout, emailAlreadyExists}){
    const [isSignUpOpen, setIsSignUpOpen] = useState(false)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [messageModal, updateMessageModal] = useState({open: false, message: '', success: false, timer: -1})

    //onMount
    useEffect(() => {
            // axios.post('/mqtt/', {
            //     sala: 'Sala '+Math.floor(Math.random()*100),
            //     meetingName: 'DAI AMO STAMPATI',
            //     meetingTime: '2021092118'
            // })
        // setInterval(() => {
        //     axios.get('/mqtt/').then(r => (console.log(r)))
        //         console.log('AA')
        // }, 1000)
    }, [])

    let content = <div>Page Unavailable</div>
    switch(content){
        case 'CONFIGURA_SALA':
            content = <ConfiguraSala />
            break
        default:
            console.warn('Pagina Inesistente')
    }
    return (
        <>

            <Router>
                <div className='fixed-top'>
                    <NavigationBar
                        user={user}
                        onLoginButtonClick={() => setIsLoginModalOpen(true)}
                        onSignUpButtonClick={() => setIsSignUpOpen(true)}
                        onLogoutButtonClick={logout}
                        onViewUsersButtonClick={() => 'TODO' /* TODO */}
                        onManageReservationButtonClick={() => 'TODO' /* TODO */}
                    />
                    {user && user.role === 'ADMIN' &&
                    <SubNavigationBar
                        user={user}
                        onLoginButtonClick={() => setIsLoginModalOpen(true)}
                        onSignUpButtonClick={() => setIsSignUpOpen(true)}
                        onLogoutButtonClick={logout}
                        onViewUsersButtonClick={() => 'TODO' /* TODO */}
                        onManageReservationButtonClick={() => 'TODO' /* TODO */}
                    />}
                </div>
                <div style={{paddingTop: 100}}>
                    <Switch>
                        <Route exact path="/">
                            <div>Pagina unavailable</div>
                        </Route>
                        <Route path="/a/configurazione_sala.html">
                            <ConfiguraSala />
                        </Route>
                        <Route path="/a/gestione_utenti.html">
                            <GestioneUtenti />
                        </Route>
                        <Route path="/a/gestione_sala.html">
                            <GestioneSale />
                        </Route>
                        <Route path="/a/gestione_prenotazione.html">
                            <GestionePrenotazioni />
                        </Route>
                        <Route path="/a/vedi_calendario.html">
                            <VediCalendario user={user}/>
                        </Route>
                    </Switch>
                </div>
            </Router>
            <SignUp
                show={isSignUpOpen}
                emailAlreadyExists={emailAlreadyExists}
                onHide={() => setIsSignUpOpen(false)}
                onSubmit={signup}
                onSuccess={() => {
                    setIsSignUpOpen(false)
                    updateMessageModal({
                        show: true,
                        message: 'Registrazione Effettuata',
                        success: true,
                        timer: 600
                    })
                }}
            />
            <Login
                show={isLoginModalOpen}
                onHide={() => setIsLoginModalOpen(false)}
                login={login}
                onLoginDone={() => {
                    sessionStorage.setItem('logged', JSON.stringify(true))
                    setIsLoginModalOpen(false)
                    updateMessageModal({
                        show: true,
                        message: 'Login Effettuato',
                        success: true,
                        timer: 600
                    })
                }}
            />
            <MessageModal
                success={messageModal.success}
                message={messageModal.message}
                timer={messageModal.timer}
                show={messageModal.show}
                onHide={() => updateMessageModal(old => ({...old, show: false}))} />


        </>
    )
}


// TODO aggiungere le storie dell'utente per loggarsi i modal e tutto