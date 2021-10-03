import {Modal} from "react-bootstrap"
import '../../css/form.css'
import '../../css/modal.css'

export default function PrenotazioneInfoModal({event, ...props}){

    if(!event) return null

    console.log(event)
    return(
        <Modal
            centered
            size={'lg'}
            {...props}
        >
            <Modal.Header closeButton>
                <h4>{event.summary}</h4>
            </Modal.Header>
            <Modal.Body>
                <table className='table-striped'>
                    <tr>
                        <td className='fw-bold text-end'>Sala</td>
                        <td>{event.location}</td>
                    </tr>
                    <tr>
                        <td className='fw-bold text-end'>Data</td>
                        <td>{`${event.date.day}/${event.date.month+1}/${event.date.year} ${event.date.hour}:00-${event.date.hour+1}:00`}</td>
                    </tr>
                    <tr>
                        <td className='fw-bold text-end'>Richiesto da</td>
                        <td>{event.description.user}</td>
                    </tr>
                </table>

            </Modal.Body>
        </Modal>    )
}