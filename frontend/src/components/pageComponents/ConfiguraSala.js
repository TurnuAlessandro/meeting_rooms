import {Col, Container, Row, Modal} from "react-bootstrap"
import { Formik, Form as FormikForm } from "formik"
import * as Yup from 'yup'
import TextField from "../authentication/TextField";
import '../../css/form.css'
import '../../css/modal.css'
import axios from "axios";

export default function ConfiguraSala(){
    const defaultInitialValues = {
        nome: '',
        codice: '',
        posti: '',
        indirizzo: '',
    }

    const validator = Yup.object({
        codice: Yup
            .string()
            .min(5, 'Codice a 5 caratteri')
            .max(5, 'Codice a 5 caratteri')
            .required('Campo Obbligatorio'),
        nome: Yup
            .string()
            .max(30, 'Massimo 30 caratteri')
            .required('Campo Obbligatorio'),
        indirizzo: Yup
            .string()
            .required('Campo Obbligatorio'),
        posti: Yup
            .number()
            .min(1, 'Minimo 1 posto a sedere')
            .required('Campo Obbligatorio')
    })

    return (
        <Container>
            <Row>
                <Col/>
                <Col className={'col-7'}>
                    <Formik
                        enableReinitialize={true}
                        initialValues={defaultInitialValues}
                        validationSchema={validator}
                        onSubmit={values => {
                            axios.post('http://localhost:8084/calendar/newCalendar/', values)
                                .catch(err => console.log({err}))
                                .then(res => console.log({res}))

                        }}
                        onReset={() => {
                            console.log('You resetted the form')
                        }}>
                        {formik => {
                            return (
                                <FormikForm className='mt-5'>
                                    <fieldset className='form-group'>
                                                <legend>Configurazione Sala</legend>
                                            <TextField
                                                label='Codice Sala'
                                                name='codice'
                                                placeholder='inserisci codice...'
                                                labelClassName='mandatory'
                                                type='text'/>
                                            <TextField
                                                label='Nome Sala'
                                                name='nome'
                                                placeholder='inserisci nome...'
                                                labelClassName='mandatory'
                                                type='text'/>
                                            <TextField
                                                label='Numero postazioni'
                                                name='posti'
                                                step={1}
                                                labelClassName='mandatory'
                                                type='number'/>
                                            <TextField
                                                label='Indirizzo'
                                                name='indirizzo'
                                                placeholder='inserisci indirizzo...'
                                                labelClassName='mandatory'
                                                type='text'/>
                                            <button
                                                className='btn btn-success mx-1 float-end mt-3'
                                                style={{borderRadius: 0}}
                                                type='submit'>Aggiungi Sala</button>

                                        BOOO DA FINIRE, NON VA NODE. NON RIESCO A CREARE IL CALEDNARIO NUOVO
                                    </fieldset>
                                </FormikForm>
                            )
                        }}
                    </Formik>

                </Col>
                <Col/>

            </Row>
        </Container>
    )
}