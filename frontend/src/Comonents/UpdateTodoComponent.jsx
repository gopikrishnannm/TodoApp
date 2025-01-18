import { useNavigate, useParams } from "react-router-dom"
import {retrieveSpecificTodoForUser, updateTodoForUser, createTodoForUser} from '../BasicComponents/Api'
import { useEffect, useState } from "react"
import {ErrorMessage, Field, Form, Formik, fieldset} from 'formik'
import moment from 'moment'


export default function UpdateTodoComponent(){

    const navaigate = useNavigate()

    const {todoid} = useParams()

    const userid = localStorage.getItem("userid")

    const [description, setDescription] = useState('')
    const [targetdate, setTargetDate] = useState('')


    const [updateSuccessMessage, setUpdateSuccessMessage] = useState(false)
    const [newTodoSuccessMessage, setNewTodoSuccessMessage] = useState(false)

    useEffect(
        ()=> retrieveSpecificTodo(),[todoid]
    )

    function retrieveSpecificTodo(){

        console.log("userid is ,", userid)
        console.log("todoid is ", todoid)
        retrieveSpecificTodoForUser(userid, todoid)
        .then(
            (response) => 
                {
                    setDescription(response.data.description)
                    setTargetDate(response.data.targetdate)
                    
                }
        )
        .catch((error)=> console.log(error))
    }

    function onSubmit(values){
        const userid = localStorage.getItem("userid")
        const todo = {
            "description" : values.description,
            "targetdate" : values.targetdate,
            "done" : false
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
            .then(
                setNewTodoSuccessMessage(true)

            )
            .catch((error) => console.log(error))

        }
        
    }

    function validate(values){
        const error = {
            // description : "error in description",
            // targetdate : "error in target date"
        }

        if(values.description.length < 5){
            error.description= "enter description with more  4 characters "
        }
        if(values.targetdate.length == "" || values.targetdate.length == "" || !moment(values.targetdate).isValid()){
            error.targetdate= "enter valid targetdate"
        }
        // console.log(values)
        console.log(error)
        return error
    }


 
 
    return(
        <div>
            {updateSuccessMessage && <div>Todo has been updated</div>}
            {newTodoSuccessMessage && <div>New Todo has been created</div>}
            <Formik initialValues={{description, targetdate}}
                enableReinitialize = {true}
                onSubmit={onSubmit}
                validate={validate}
                validateOnChange={false}
                validateOnBlur={false}
            > 

                {
                    (props) => (
                        <Form  >
                            <ErrorMessage
                            
                            name="description"
                            component="div"


                            />
                            <ErrorMessage
                            
                            name="targetdate"


                            />
                            <fieldset>
                                <label>Description</label>
                                <Field type="text" name="description"/>
                            </fieldset>
                            <fieldset>
                                <label>TargetDate</label>
                                <Field type="date" name="targetdate"/>
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