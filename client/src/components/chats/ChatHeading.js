import React from 'react'
// import FAVideo from 'react-icons/lib/fa/video-camera'
// import FAUserPlus from 'react-icons/lib/fa/user-plus'
// import MdEllipsisMenu from 'react-icons/lib/md/keyboard-control'

import { IoMdMail } from "react-icons/io";

export default function ChatHeading({barSwitch}) {
    return (
        <div className="chat-header">
			<div className="user-info">
				<div className="user-name">Community</div>
				{/* <div className="status">
					<div className="indicator"></div>
					<span></span>
				</div> */}
            
			{/* <div className="options">
                
				{/* <FAVideo />
				<FAUserPlus />
				<MdEllipsisMenu /> 
			</div> */}
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
