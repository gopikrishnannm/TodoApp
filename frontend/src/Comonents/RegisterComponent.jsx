import { Formik, fieldset, Field, Form} from "formik"
import { isUserExist, register } from "../BasicComponents/Apiforlogin"
import { useState } from "react"
export default function RegisterComponent(){

    const [successMessage, setSuccessMessage] = useState(false)
    const [failureMessage, setFailureMessage] = useState(false)


    async function onSubmit(values){
        console.log(values)
        const userExist = await isUserExist(values.username)
        if(userExist.data != true){

            const user = {
                username : values.username,
                password : values.password
            }

            register(user)
            .then( (response) =>{

                console.log(response)
                setSuccessMessage(true)
            }
                
            )
            .catch((error) =>{
                console.log(error)
                setFailureMessage(true)
            } 
                
            )

            

        }
        else{
            setFailureMessage(true)

        }
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
            
            >    
                {

                    (props) =>(
                        <Form>
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