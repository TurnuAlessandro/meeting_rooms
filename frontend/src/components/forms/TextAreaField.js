import { useField, ErrorMessage } from "formik"
import { v4 as uuidv } from 'uuid'

export default function TextAreaField({ label, ...props }){
    const [field, meta] = useField(props)

    const fieldId = `field${uuidv()}`

    return (
        <div className='mb-2 field-container'>
            <label htmlFor={fieldId} >{label}</label>
            <textarea
                className={`form-control shadow-none rounded-0 ${meta.touched && meta.error ? 'is-invalid': ''}`}
                {...field} {...props}
                id={fieldId}
                autoComplete='off'
            />
            <ErrorMessage
                component='div'
                className='text-danger error-message'
                name={field.name}/>
        </div>
    )
}