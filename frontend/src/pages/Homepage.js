
import {useState} from "react"
import SignUp from "../components/authentication/SignUp"
import Login from "../components/authentication/Login"
import MessageModal from "../components/authentication/MessageModal"
import NavigationBar from "../components/pageComponents/NavigationBar"

export default function Homepage({user, login, signup, logout, emailAlreadyExists}){
    const [isSignUpOpen, setIsSignUpOpen] = useState(false)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [messageModal, updateMessageModal] = useState({open: false, message: '', success: false, timer: -1})

    return (
        <>
            <NavigationBar
                user={user}
                onLoginButtonClick={() => setIsLoginModalOpen(true)}
                onSignUpButtonClick={() => setIsSignUpOpen(true)}
                onLogoutButtonClick={logout}
                onViewUsersButtonClick={() => 'TODO' /* TODO */}
                onManageReservationButtonClick={() => 'TODO' /* TODO */}
            />
            <main role="main" className="container-fluid border-5 mt-5 pt-3">


            </main>

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