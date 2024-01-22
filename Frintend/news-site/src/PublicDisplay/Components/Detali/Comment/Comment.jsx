import React, {useContext, useState} from 'react'
import ViewComment from './ViewComment'
import {useParams} from "react-router-dom";
import {HomeContext} from "../../../Context/contect";


const Comment = () => {
    const {createComment}=useContext(HomeContext)
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    
    const {id} =useParams()
    const newsId= id
    const reset = ()=>{
        setName('')
        setEmail('')
        setSubject('')
        setDescription('')

    }

    const handelSubmit=(e)=>{
        e.preventDefault()
        const  data={
            newsId,description,name,email,subject
        }
        createComment(data)
        reset()
    }

    return (
        <>
            <div className="comment-section mt-6 mb-6">
                <form onSubmit={handelSubmit}>
                    <div className="field">
              <textarea className='textarea' placeholder='نظر شما'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="columns">
                        <div className="column">
                            <input type="text" className="input" placeholder='نام شما'
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}/>

                        </div>
                        <div className="column">
                            <input type="text" className="input" placeholder='ایمیل'
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div className="field">
                        <input type="text" className="input" placeholder='موضوع'
                               value={subject}
                               onChange={(e) => setSubject(e.target.value)}/>
                    </div>
                    <div className="field">
                        <button className="button has-background-danger is-fullwidth mt-5 has-text-white">ارسال نظر
                        </button>
                    </div>
                </form>
            </div>

            <ViewComment/>
        </>
    )
}

export default Comment