import React from 'react'

export default function User({username}) {
    return (
        <div 
            className={`user`}
            >
            <div className="user-photo">{username[0].toUpperCase()}</div>
            <div className="user-info">
                <div className="name">{username}</div>
                <div className="last-message">{"Последнее сообщение"}</div>
            </div>
            
        </div>
    )
}
