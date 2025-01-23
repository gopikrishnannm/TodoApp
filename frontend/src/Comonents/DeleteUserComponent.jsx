import { Formik, Form, Field } from "formik";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { deleteUser } from "../BasicComponents/Api";
import { useState } from "react";
import '../Css/StyleDeleteComponent.css'

export default function DeleteUserComponent(){

    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState(false)
    const {username} = useParams()

    function onSubmit(values){

        if(username == values.username){
            deleteUser(values.username)
            .then(() =>
                navigate(`/`)
            )
            .catch(()=> {
                setErrorMessage(true)
                setTimeout(()=>setErrorMessage(false), 3000)
                }  
            )   
        }
        else{
            setErrorMessage(true)
            setTimeout(()=>setErrorMessage(false), 3000)
        }
        
    }
    return(
        <div className="delete-container">
            <div className="delete-title">
                <h2>Account Deletion</h2>
                <p>Please enter your username to proceed with account deletion.</p>
            </div>
            {errorMessage && <div className="error-message ">Please enter the correct username</div>}
            <Formik
            initialValues={
                {username:""}
            }
            onSubmit={onSubmit}
            >
                {
                    (props) => (
                        <Form className="delete-form">
                            <fieldset>
                                <Field type="text" name="username"  className="input-field" placeholder="username"/>
                            </fieldset>
                            <button className="delete-button" type="submit">Delete</button>

                        </Form>
                    )
                }

            </Formik>
            
        </div>
    )
}