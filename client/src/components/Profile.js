import React, { useState } from 'react'
import './Profile.css'
import TextareaAutosize from 'react-textarea-autosize';
import Friend from './Friend';

export default function Profile() {
    const [status, setStatus] = useState("Не люблю ананасы")
    const [staticStatus,setStaticStatus] = useState("Не люблю ананасы")

    const pressHandler = (e) =>{
        if(e.key==="Enter") {
            // console.log(e.target.value)
            setStaticStatus(e.target.value)
            e.target.blur()
        }
    }
    return (
        <div className="profile-container">
            <div className="user-data">
                <div>
                <img src="https://cdn.discordapp.com/avatars/331103366774259713/98a1aff5ac590c1840571f504955bc12.png?size=256" alt="avatar"/>
                </div>
                <div className="data-wrapper">
                    <div className="username">Sketch <div className="tag dev">Dev</div></div>
                    {/* <div className="status"></div> */}
                        <TextareaAutosize
                        maxLength="190"
                        
                        className="status" 
                        type="text" 
                        value={status} 
                        onChange={({target})=>{
                            setStatus(target.value)
                        }}
                        onBlur={({target})=>{
                            target.value = staticStatus
                        }}
                        onKeyPress={pressHandler}
                        />
                </div>
            </div>
            <div className="friends">
                    <div className="friends-header">Друзья</div>
                    <div className="friends-content">
                        {/* <span className="no-friends">У тебя нет друзей :с</span> */}
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
            </div>
        </div>
    )
}
