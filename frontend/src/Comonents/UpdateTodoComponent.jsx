import { useNavigate, useParams } from "react-router-dom"
import {retrieveSpecificTodoForUser, updateTodoForUser, createTodoForUser} from '../BasicComponents/Api'
import { useEffect, useState } from "react"
import {ErrorMessage, Field, Form, Formik, fieldset} from 'formik'
import moment from 'moment'

import '../Css/StyleUpdateTodoComponent.css';


export default function UpdateTodoComponent(){

    const {todoid} = useParams()
    const userid = localStorage.getItem("userid")
    const [description, setDescription] = useState('')
    const [targetdate, setTargetDate] = useState('')
    const [done, setdone] = useState(false)
    const [updateSuccessMessage, setUpdateSuccessMessage] = useState(false)
    const [newTodoSuccessMessage, setNewTodoSuccessMessage] = useState(false)

    useEffect(
        ()=> retrieveSpecificTodo(),[todoid]
    )

    function retrieveSpecificTodo(){

        if(todoid!=-1){
            retrieveSpecificTodoForUser(userid, todoid)
            .then(
                (response) => 
                    {
                        setDescription(response.data.description)
                        setTargetDate(response.data.targetdate)
                        setdone(response.data.done)
                        
                    }
            )
            .catch((error)=> console.log(error))
        }
    }

    function onSubmit(values){
        const userid = localStorage.getItem("userid")
        const todo = {
            "description" : values.description,
            "targetdate" : values.targetdate,
            "done" : values.done === "true"
        }
        if(todoid!=-1){
            console.log(todo)
            updateTodoForUser(userid,todoid, todo)
            .then((response)=> {
                setUpdateSuccessMessage(true)
                setTimeout(()=>setUpdateSuccessMessage(false),3000)
            })
            .catch((error) => console.log(error))

        }
        // create  new todo
        else{
            createTodoForUser(userid, todo)
            .then(()=> {
                setNewTodoSuccessMessage(true)
                setTimeout(()=>setNewTodoSuccessMessage(false),3000)
            })
            .catch((error) => console.log(error))
        }
    }

    function validate(values){
        const error = {}
        if(values.description.length < 5){
            error.description= "enter description with more  4 characters "
        }
        if(values.targetdate.length == "" || values.targetdate.length == "" || !moment(values.targetdate).isValid()){
            error.targetdate= "enter valid targetdate"
        }
        return error
    }

    return(
        <div className="update-todo-container">
            {todoid!=-1 && <div className="todo-title"> <h1>Update Your Existing Todo</h1></div>}
            {todoid == -1 && <div className="todo-title"> <h1>Create New Todo</h1></div>}
            {updateSuccessMessage && <div className="success-message">Your changes have been saved</div>}
            {newTodoSuccessMessage && <div className="success-message">New Todo created successfully!</div>}
            <Formik 
                initialValues={{description, targetdate, done}}
                enableReinitialize = {true}
                onSubmit={onSubmit}
                validate={validate}
                validateOnChange={false}
                validateOnBlur={false}
            > 
                {
                    (props) => (
                        <Form>

                            <ErrorMessage name="description" className="error-message" component="div"/>
                            <ErrorMessage name="targetdate" className="error-message" component="div"/>

                            <table className="update-table">
                                <thead>
                                    <tr>
                                        <th>
                                             Description
                                        </th>
                                        <th>
                                            TargetDate
                                        </th>
                                        <th>
                                            Done?
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <Field type="text" name="description" className="update-input-field"/>
                                        </td>
                                        <td>
                                            <Field type="date" name="targetdate" className="update-input-field"/>
                                        </td>
                                        <td>
                                        <Field as="select" name="done" className="input-field">
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </Field>
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
                            <div className="update-todo-button-container" >
                                <button type="submit">Save</button>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}