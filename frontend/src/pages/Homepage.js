
import {useEffect, useState} from "react"
import SignUp from "../components/authentication/SignUp"
import Login from "../components/authentication/Login"
import MessageModal from "../components/authentication/MessageModal"
import NavigationBar from "../components/pageComponents/NavigationBar"
import SubNavigationBar from "../components/pageComponents/admin/SubNavigationBar"
import ConfiguraSala from "./admin/ConfiguraSala"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import GestionePrenotazioni from "./admin/GestionePrenotazioni"
import GestioneSale from "./admin/GestioneSale"
import VediCalendarioAdmin from "./admin/VediCalendarioAdmin"
import GestioneUtenti from "./admin/GestioneUtenti"
import axios from "axios"
import LoginSignupAsker from "./LoginSignupAsker";
import VediCalendarioUser from "./admin/VediCalendarioUser";


export default function Homepage({user, login, signup, logout, emailAlreadyExists}){
    const [isSignUpOpen, setIsSignUpOpen] = useState(false)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [messageModal, updateMessageModal] = useState({open: false, message: '', success: false, timer: -1})

    //onMount
    useEffect(() => {
        // setInterval(() => {
        //     axios.get('/mqtt/').then(r => (console.log(r)))
        //         console.log('AA')
        // }, 1000)
    }, [])

    return (
        <>

            <Router>
                <div className='fixed-top'>
                    <NavigationBar
                        user={user}
                        onLoginButtonClick={() => setIsLoginModalOpen(true)}
                        onSignUpButtonClick={() => setIsSignUpOpen(true)}
                        onLogoutButtonClick={logout}
                    />
                    {user && user.role === 'ADMIN' &&
                    <SubNavigationBar
                        user={user}
                        onLoginButtonClick={() => setIsLoginModalOpen(true)}
                        onSignUpButtonClick={() => setIsSignUpOpen(true)}
                        onLogoutButtonClick={logout}
                    />}
                </div>
                <div style={{paddingTop: 100}}>
                    <Switch>
                        <Route exact path="/">
                            { user ?
                                user.role === 'ADMIN' ?
                                <Redirect to={'/a/vedi_calendario.html'} /> :
                                <Redirect to={'/u/vedi_calendario.html'} />
                                :
                                <LoginSignupAsker
                                    onLogin={() => setIsLoginModalOpen(true)}
                                    onSignUp={() => setIsSignUpOpen(true)}
                                />
                                }

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
                            <GestionePrenotazioni user={user} />
                        </Route>
                        <Route path="/a/vedi_calendario.html">
                            {
                                user ?
                                    user.role === 'ADMIN' ?
                                        <VediCalendarioAdmin user={user}/>
                                        :
                                        <VediCalendarioUser user={user} />
                                    :
                                    <div>Accesso negato: non sei autorizzato</div>

                            }
                        </Route>
                        <Route path="/u/vedi_calendario.html">
                            {
                                user ?
                                    user.role === 'ADMIN' ?
                                        <VediCalendarioAdmin user={user}/>
                                        :
                                        <VediCalendarioUser user={user} />
                                    :
                                    <div>Accesso negato: non sei autorizzato</div>

                            }
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