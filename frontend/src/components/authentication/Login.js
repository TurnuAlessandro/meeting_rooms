import { Modal } from "react-bootstrap"
import { Formik, Form as FormikForm } from "formik"
import * as Yup from 'yup'
import TextField from "./TextField"
import '../../css/form.css'
import {useState} from "react"

export default function Login({login, onLoginDone, ...props}){
    const [errorMessage, setErrorMessage] = useState(null)

    const defaultInitialValues = {
        email: '',
        password: '',
    }

    const validator = Yup.object({
        password: Yup
            .string()
            .required('Campo Obbligatorio'),
        email: Yup.string()
            .email('Inserisci una mail valida')
            .required('Campo Obbligatorio'),
    })
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Formik
                enableReinitialize={true}
                initialValues={defaultInitialValues}
                validationSchema={validator}
                onSubmit={async values => {
                    console.log('You submitted the form')
                    const loginRes = await login(values.email, values.password)

                    if(loginRes){ // login effettuato

                        onLoginDone()
                    } else { // login fallito
                        setErrorMessage('Email o Password errati')
                    }
                }}
                onReset={() => {
                    console.log('You resetted the form')
                }}>
                {formik => {
                    return (
                        <FormikForm>
                            <fieldset className='form-group'>
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">
                                        <legend>Login</legend>
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {errorMessage ?
                                    <div className='fw-bold text-danger text-center'>{errorMessage}</div> : null}
                                    <TextField
                                        label='Email'
                                        name='email'
                                        placeholder='inserisci email...'
                                        labelClassName='mandatory'
                                        type='email'/>
                                    <TextField
                                        label='Password'
                                        name='password'
                                        placeholder='inserisci password...'
                                        labelClassName='mandatory'
                                        type='password'/>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button
                                        className='btn btn-success mx-1'
                                        style={{borderRadius: 0}}
                                        type='submit'>Accedi</button>
                                </Modal.Footer>
                            </fieldset>
                        </FormikForm>
                    )
                }}
            </Formik>

        </Modal>
    )
}