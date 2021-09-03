import { Modal } from "react-bootstrap"
import '../../css/form.css'
import '../../css/modal.css'
import {useEffect} from "react"


/**
 * Finestra modale che scompare dopo $timer secondi che mostra un messaggio ($message) di successo
 * o insuccesso a seocnda di $success
 * */
export default function MessageModal({timer, message, success, show, beforeElement = null, afterElement = null, onHide}){


    /*  Viene invocata quando show timer o onHide cambiano valore e
        serve a impostare il timer per la scomparsa della finestra */
    useEffect(() => {
        if(show && timer > 0){
            const timeout = setTimeout(() => {
                                onHide()
                            }, timer)

            return () => clearTimeout(timeout)
        }
    }, [show, timer, onHide])

    return(
        <Modal
            onHide={onHide}
            show={show}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Body className='d-flex flex-column justify-content-center align-content-center align-items-center'>
                {beforeElement}
                <div className='my-3'>
                    {success ? /*ICONA SUCCESSO*/
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50"
                            height="50"
                            fill={'green'}
                            viewBox="0 0 24 24">
                            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 16.518l-4.5-4.319 1.396-1.435 3.078 2.937 6.105-6.218 1.421 1.409-7.5 7.626z"/>
                        </svg> : /*ICONA INSUCCESSO*/
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50"
                            height="50"
                            fill='red'
                            viewBox="0 0 24 24">
                            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z"/>
                        </svg>}
                </div>
                <h4 className={`fw-bold text-${success ? 'success' : 'danger'}`}>
                    {message}
                </h4>
                {afterElement}
            </Modal.Body>

        </Modal>
    )
}