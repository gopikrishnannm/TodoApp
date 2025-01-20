import { Formik, fieldset, Field, Form, ErrorMessage} from "formik"
import { isUserExist, register } from "../BasicComponents/Apiforlogin"
import { useState } from "react"

import '../Css/StyleRegisterComponent.css'
import '../Css/Common.css';

export default function RegisterComponent(){

    const [successMessage, setSuccessMessage] = useState(false)
    const [failureMessage, setFailureMessage] = useState(false)

    async function onSubmit(values){
        const userExist = await isUserExist(values.username)
        if(userExist.data != true){
            const user = {
                username : values.username,
                password : values.password
            }
            register(user)
            .then( () => {
                setSuccessMessage(true)
                setTimeout(() => {
                    setSuccessMessage(false)
                }, 3000)
            })
            .catch(
                () =>{
                setFailureMessage(true)
                setTimeout(()=>setFailureMessage(false), 3000)
                } 
            )
        }
        else{
            setFailureMessage(true)
            setTimeout(()=>setFailureMessage(false), 3000)
        }
    }
    function validate(values){
        const error = {}
        if(values.username.length<4){
            error.username = "Username must be at least 5 characters long"
        }
        else if(!(/^[A-Za-z]/.test(values.username))) {
            error.username = "Username must start with a letter"
        }
        if(values.password.length<4){
            error.password= "Password must be at least 5 characters long"
        }
        return error
    }
    return(
        <div className="register-container">
            {successMessage && <div className="success-message">User Created Successfully!</div>}
            {failureMessage && <div className="failure-message">Username Already Taken!</div>}
            <Formik

            initialValues={
                {
                    username : "",
                    password : ""
                
                }
            }
            onSubmit={onSubmit}
            validate={validate}
            validateOnChange={false}
            validateOnBlur={false}
            >    
                {

                    (props) =>(
                        <Form className="register-form">
                            <div className="title">
                                <h1>Create your account to get started!</h1>
                            </div>
                            <ErrorMessage name="username" className="error-message" component="div"/>
                            <ErrorMessage name="password" className="error-message" component="div"/>
                            <div className="input-container">
                                <fieldset>
                                    <Field type="text" name="username" id="username" className="input-field" 
                                        placeholder="username"/>
                                </fieldset>
                                <fieldset>
                                    <Field type="password" name="password" id="password" className="input-field" 
                                    placeholder="password"/> 
                                </fieldset>
                            </div>
                            <button type="submit" className="button">Register</button>
                        </Form>
                    )

                }
            </Formik>
        </div>
    )
}