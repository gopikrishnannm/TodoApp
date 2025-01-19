import { Formik, fieldset, Field, Form, ErrorMessage} from "formik"
import { isUserExist, register } from "../BasicComponents/Apiforlogin"
import { useState } from "react"
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
            .then( () =>setSuccessMessage(true))
            .catch(
                (error) =>{
                console.log(error)
                setFailureMessage(true)
                } 
            )
        }
        else{
            setFailureMessage(true)
        }
    }
    function validate(values){
        const error = {}
        if(values.username.length<=4){
            error.username = "enter a 5 or more character username"
        }
        if(values.password.length<=5){
            error.password= "enter a 5 or more length password"
        }
        return error
    }
    return(
        <div>
            {successMessage && <div>New User Has Been Created !</div>}
            {failureMessage && <div>User With Same Username Already Exists!</div>}
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
                        <Form>
                            <ErrorMessage name="username" component="div"/>
                            <ErrorMessage name="password" component="div"/>
                            <fieldset>
                                <label htmlFor="username">Username</label>
                                <Field type="text" name="username"/>
                            </fieldset>
                            <fieldset>
                                <label htmlFor="password" >Password</label>
                                <Field type="password" name="password"/>    
                            </fieldset>
                            <button type="submit">Register</button>
                        </Form>
                    )

                }
            </Formik>
        </div>
    )
}