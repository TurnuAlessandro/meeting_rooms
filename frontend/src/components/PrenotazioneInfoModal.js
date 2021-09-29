import {Modal} from "react-bootstrap"
import '../css/form.css'
import '../css/modal.css'

export default function PrenotazioneInfoModal({event, ...props}){

    if(!event) return null

    console.log(event)

    return(
        <Modal
            centered
            size={'xl'}
            {...props}
        >
            <Modal.Header closeButton>
                {event.summary}
            </Modal.Header>
            <Modal.Body>
                <table className='table-striped'>
                    <tr>
                        <td className='fw-bold'>Sala</td>
                        <td>{event.summary}</td>
                    </tr>
                    <tr>
                        <td className='fw-bold'>Data</td>
                        <td>{`${event.date.day}/${event.date.month+1}/${event.date.year} ${event.date.hour}:00-${event.date.hour+1}:00`}</td>
                    </tr>
                </table>

            </Modal.Body>
        </Modal>    )
}