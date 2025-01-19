import { useNavigate, useParams } from "react-router-dom"
import {retrieveSpecificTodoForUser, updateTodoForUser, createTodoForUser} from '../BasicComponents/Api'
import { useEffect, useState } from "react"
import {ErrorMessage, Field, Form, Formik, fieldset} from 'formik'
import moment from 'moment'


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
            })
            .catch((error) => console.log(error))

        }
        // create  new todo
        else{
            createTodoForUser(userid, todo)
            .then(setNewTodoSuccessMessage(true))
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
        <div>
            {updateSuccessMessage && <div>Todo has been updated</div>}
            {newTodoSuccessMessage && <div>New Todo has been created</div>}
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

                            <ErrorMessage name="description" component="div"/>
                            <ErrorMessage name="targetdate" />

                            <fieldset>
                                <label>Description</label>
                                <Field type="text" name="description"/>
                            </fieldset>
                            <fieldset>
                                <label>TargetDate</label>
                                <Field type="date" name="targetdate"/>
                            </fieldset>
                            <fieldset>
                                <label>Done?</label>
                                <Field as="select" name="done">
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </Field>
                            </fieldset>
                            <div>
                                <button type="submit">Save</button>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}