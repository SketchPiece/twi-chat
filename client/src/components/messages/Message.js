import React from 'react'

export default function Message({message,right,name}) {
    return (
        <div className={`message-container` + (right ? ' right':'')}>
            <div className="time">20:20</div>
            <div className="data">
                <div className="message">{message}</div>
                <div className="name">{name}</div>
            </div>
        </div>
    )
}
