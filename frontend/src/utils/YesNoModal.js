import { Modal } from "react-bootstrap"
import '../css/form.css'
import '../css/modal.css'
export default function YesNoModal({onYes, onNo, yesText, noText, title, body, ...props}){
    return(
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <legend>{title || ''}</legend>
                </Modal.Title>
            </Modal.Header>
            {body && <Modal.Body>
                {body}
            </Modal.Body>}
            <Modal.Footer>
                <button
                    className='btn btn-danger rounded-0 mx-1'
                    style={{borderRadius: 0}}
                    onClick={onNo}
                >{noText || 'No'}</button>

                <button
                    className='btn btn-success rounded-0 mx-1'
                    style={{borderRadius: 0}}
                    onClick={onYes}
                >{yesText || 'Si'}</button>
            </Modal.Footer>
        </Modal>
    )
}