import React, { useEffect, useState }  from "react"
import axios from 'axios'
import Homepage from "./pages/Homepage"

function App(){
    let [user, setUser] = useState(null)

    /** Viene invocata SOLO la prima volta che App viene renderizzata e serve a recuperare l'utente dalla sessione, se loggato */
    useEffect(() => {
        let loggedUser = null
        if(JSON.parse(sessionStorage.getItem('logged'))){
            loggedUser = JSON.parse(sessionStorage.getItem('user'))
        }
        if(loggedUser){
            setUser(loggedUser)
            sessionStorage.setItem('user', JSON.stringify(loggedUser))
        }
    }, [])

    /** Effettua la chiamata al backend per effettuare la login
     * @param email    -> l'email dell'utente che vuole logggarsi
     * @param password -> la password dell'utente che vuole logggarsi
     * @return null se la login NON ha avuto successo, l'oggetto javascript dell'utente altrimenti*/
    function login(email, password){
        const res = axios
            .post('/auth/login', {email, password})
            .then(res => {
                setUser(res.data)
                sessionStorage.setItem('user', JSON.stringify(res.data))
                return res.data
            })
            .catch(e => {
                setUser(null)
                sessionStorage.setItem('user', JSON.stringify(null))
                return null
            })
        return res
    }

    /** Effettua la chiamata al backend per effettuare la registrazione di un nuovo utente
     * @param name     -> il nome dell'utente che vuole registrarsi
     * @param email    -> l'email dell'utente che vuole registrarsi
     * @param password -> la password dell'utente che vuole registrarsi
     * @return (void) -> l'unico motivo per il quale una registrazione non va a buon fine è la presenza di una stessa mail, ma il controllo lo fa ANCHE il frontend*/
    function signup(name, email, password){
        axios
            .post('/auth/signup', {name, email, password})
            .then(res => {
                console.log(res.data.text)
                setUser(res.data.user)
            })
            .catch(e => setUser(null))
    }

    /** Controlla che la mail passata come parametro non appartenga già ad un altro utente
     * @param email -> l'email da controllare
     * @return boolean : true se l'email esiste già, false altrimenti (res.data sarà true o false)
     */
    function emailAlreadyExists(email){
        return axios.post('/auth/exists', {email})
            .then(res => res.data)
            .catch(err => console.warn(err))
    }

    /** Effettua il logout sia nel frontend che nel backend
     * @return void
     */
    function logout(){
        console.log('LOGOUT')

        sessionStorage.setItem('logged', JSON.stringify(false))
        sessionStorage.setItem('user', JSON.stringify(null))
        setUser(null)

        // BACKEND
        axios.post('/auth/logout')

        window.location.href = '/'
    }

    return (
        <Homepage
            user={user}
            login={login}
            signup={signup}
            emailAlreadyExists={emailAlreadyExists}
            logout={logout}
        />
    )
}

export default App