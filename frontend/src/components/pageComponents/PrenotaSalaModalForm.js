import {Form, Modal} from "react-bootstrap"
import { Formik, Form as FormikForm, Field } from "formik"
import * as Yup from 'yup'
import '../../css/form.css'
import '../../css/modal.css'
import TextField from "../authentication/TextField";
import TextAreaField from "../forms/TextAreaField";
import {EVENT_STATE} from "../../utils/event_state";

export default function PrenotaSalaModalForm({slot, onSubmit, onSuccess, ...props}){
    const defaultInitialValues = {
        summary: '',
        partecipanti: 1,
        descrizione: '',
        accessori: []
    }

    const validator = Yup.object({
        summary: Yup
            .string()
            .min(3, 'Minimo 3 caratteri')
            .max(15, 'Massimo 15 caratteri')
            .required('Campo Obbligatorio'),
        partecipanti: Yup
            .number('Inserisci un numero')
            .min(1, 'Deve esserci almeno un partecipante')
            .required('Campo Obbligatorio'),
        descrizione: Yup.string()
    })

    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <b>Richiesta prenotazione sala</b>
                </Modal.Title>
            </Modal.Header>

            <Formik
                enableReinitialize={true}
                initialValues={defaultInitialValues}
                validationSchema={validator}
                onSubmit={values => {
                    values = {...values, stato: EVENT_STATE.DA_APPROVARE}
                    onSubmit({...values, ...slot})
                }}>
                {() => {
                    return (
                        <FormikForm>
                            <Modal.Body>
                                <div
                                    className={'p-2 pt-0 rounded-0 mb-4'}
                                    style={{borderBottom: '1px solid black'}}>
                                    <div><b>Sala</b>: {slot ? slot.room : ''}</div>
                                    <div>
                                        <b>Data</b>: {slot ? slot.dayName : null} {slot ? slot.day : null} {slot ? slot.monthName : null} {slot ? slot.year : null}
                                    </div>
                                    <div><b>Ora</b>: {slot ? slot.hour : null}:00-{slot ? slot.hour + 1 : null}:00</div>
                                </div>
                                <div style={{padding: '0px 30px'}}>
                                    <TextField
                                        label='Nome riunione'
                                        name='summary'
                                        placeholder='inserisci nome riunione...'
                                        labelClassName='mandatory'
                                        type='text'/>
                                    <TextField
                                        label='Numero di partecipanti'
                                        name='partecipanti'
                                        labelClassName='mandatory'
                                        min={1}
                                        type='number'/>
                                    <TextAreaField
                                        label={'Descrizione'}
                                        name={'descrizione'}/>

                                    <div>
                                        <b>Spunta ciò che ti serve per la riunione</b>
                                        <div>
                                            <Field
                                                type='checkbox'
                                                id='proiettore'
                                                className='me-2'
                                                name='accessori'
                                                value='Proiettore'
                                            />
                                            <label htmlFor='proiettore' className='me-5 fw-normal'>Proiettore</label>
                                            <Field
                                                type='checkbox'
                                                id='computer'
                                                className='me-2'
                                                name='accessori'
                                                value='Computer'
                                            />
                                            <label htmlFor='computer' className='me-5 fw-normal'>Computer</label>
                                            <Field
                                                type='checkbox'
                                                id='lavagna'
                                                className='me-2'
                                                name='accessori'
                                                value='Lavagna'
                                            />
                                            <label htmlFor='lavagna' className='me-5 fw-normal'>Lavagna</label>
                                        </div>
                                    </div>
                                </div>

                            </Modal.Body>
                            <Modal.Footer>
                                <button
                                    className='btn btn-success mx-1'
                                    style={{borderRadius: 0}}
                                    type='submit'>Richiedi prenotazione</button>
                            </Modal.Footer>
                        </FormikForm>
                    )
                }}
            </Formik>
        </Modal>
    )
}