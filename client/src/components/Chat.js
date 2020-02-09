import React from 'react'
import ChatContainer from './chats/ChatContainer'
import './Chat.css'

export default function Chat() {
    return (
        <div className="container">
            {/* <link
            rel="stylesheet"
            type="text/css"
            href="css/chat/Dark.css"
            /> */}
            <ChatContainer />
        </div>
    )
}
