import { Formik, Form, Field } from "formik";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { deleteUser } from "../BasicComponents/Api";
import { useState } from "react";
export default function DeleteUserComponent(){


    const navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState(false)

    const {username} = useParams()


    function onSubmit(values){

        console.log(username)

        if(username == values.username){

            deleteUser(values.username)
            .then(() =>
                navigate(`/`)
            )
            .catch(
                setErrorMessage(true)
            )

        }
        else{
            setErrorMessage(true)
        }
        

        
    }




    return(

        <div>
            <h2>Delete User!</h2>

            {errorMessage && <div>User with the given username is not availble</div>}
            <Formik
            
            initialValues={
                {username:""}
            }
            onSubmit={onSubmit}
            
            >
                {
                    (props) => (
                        <Form>
                            <fieldset>
                                <label htmlFor="username"/>
                                <Field type="text" name="username"/>
                            </fieldset>
                            <button type="submit">Delete</button>

                        </Form>
                    )
                }

            </Formik>
            
        </div>
    )
}