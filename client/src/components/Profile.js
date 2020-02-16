import React, { useState, useContext, useEffect } from 'react'
import './Profile.css'
import TextareaAutosize from 'react-textarea-autosize';
import Friend from './Friend';
import { UserContext } from '../context/UserContext';

export default function Profile({socket,setStatus}) {
    const {username,avatar,status,userId} = useContext(UserContext)
    const [profStatus, setProfStatus] = useState('')
    const [staticStatus,setStaticStatus] = useState('')

    useEffect(() => {
        setProfStatus(status)
        setStaticStatus(status)
    }, [status])

    const pressHandler = (e) =>{
        if(e.key==="Enter") {
            // console.log(e.target.value)
            setStaticStatus(e.target.value)
            setStatus(e.target.value)
            socket.emit('change_status',{status:e.target.value})
            e.target.blur()
        }
    }
    return (
        <div className="profile-container">
            <div className="user-data">
                <div>
                <img src={avatar} alt="avatar"/>
                </div>
                <div className="data-wrapper">
                    <div className="username">{username} <div className="tag dev">Dev</div></div>
                    {/* <div className="status"></div> */}
                        <TextareaAutosize
                        maxLength="190"
                        
                        className="status" 
                        type="text" 
                        value={profStatus} 
                        onChange={({target})=>{
                            setProfStatus(target.value)
                        }}
                        onBlur={({target})=>{
                            target.value = staticStatus
                        }}
                        onKeyPress={pressHandler}
                        />
                </div>
            </div>
            {/* <div className="friends">
                    <div className="friends-header">Друзья</div>
                    <div className="friends-content">
                        <span className="no-friends">У тебя нет друзей :с</span>
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        

                         <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend /> 

                    </div>
                    <div className="friends-footer"></div>
            </div>*/}
        </div> 
    )
}
