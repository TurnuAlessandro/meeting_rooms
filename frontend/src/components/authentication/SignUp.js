import { Modal } from "react-bootstrap"
import { Formik, Form as FormikForm } from "formik"
import * as Yup from 'yup'
import TextField from "./TextField"
import '../../css/form.css'
import '../../css/modal.css'

export default function SignUp({emailAlreadyExists, onSubmit, onSuccess, ...props}){
    const defaultInitialValues = {
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    }

    const validator = Yup.object({
        name: Yup
            .string()
            .min(3, 'Minimo 3 caratteri')
            .max(20, 'Massimo 20 caratteri')
            .required('Campo Obbligatorio'),
        password: Yup
            .string()
            .min(5, 'Minimo 5 caratteri')
            .required('Campo Obbligatorio'),
        passwordConfirm: Yup
            .string()
            .min(5, 'Minimo 5 caratteri')
            .oneOf([Yup.ref('password'), null], 'Le password devono coincidere')
            .required('Campo Obbligatorio'),
        email: Yup.string()
            .email('Inserisci una mail valida')
            .test('Email già esistente', 'Esiste già un utente con questa email', async function(email){
                return !(await emailAlreadyExists(email || ''))
            })
            .required('Campo Obbligatorio')
    })

    return(
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
                onSubmit={values => {
                    onSubmit(values.name, values.email, values.password)
                    onSuccess()
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
                                        <legend>Registrazione</legend>
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <TextField
                                        label='Nome'
                                        name='name'
                                        placeholder='inserisci nome...'
                                        labelClassName='mandatory'
                                        type='text'/>
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
                                    <TextField
                                        label='Conferma Password'
                                        name='passwordConfirm'
                                        placeholder='conferma password...'
                                        labelClassName='mandatory'
                                        type='password'/>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button
                                        className='btn btn-success mx-1'
                                        style={{borderRadius: 0}}
                                        type='submit'>Registrati</button>
                                </Modal.Footer>
                            </fieldset>
                        </FormikForm>
                    )
                }}
            </Formik>

        </Modal>
    )
}