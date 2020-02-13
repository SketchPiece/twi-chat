import React from 'react'

export default function Message({message,me,name,img}) {
    return (
        <div className={`message-container` + (me ? ' me':' ')}>
            {/* <div className="time">20:20</div> */}
            <img src={img} alt="avatar"/>
            <div className="data">
                <div className="message">{message}</div>
                <div className="name">{name}</div>
            </div>
        </div>
    )
}
