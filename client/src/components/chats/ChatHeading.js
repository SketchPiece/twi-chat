import React from 'react'

import { IoMdMail } from "react-icons/io";

export default function ChatHeading({title,barSwitch}) {
    return (
        <div className="chat-header">
			<div className="user-info">
				<div className="user-name">{title}</div>
            </div>
            <div 
            id="chats-back"
            onClick={()=>{barSwitch()}}
            >
				<IoMdMail/>
			</div>
			
		</div>
    )
}
