import React,{useState} from 'react'
import SideBar from './SideBar'
import ChatHeading from './ChatHeading'
import Messages from '../messages/Messages'
import MessageInput from '../messages/MessageInput'

export default function ChatContainer() {
    const [isChat,setIsChat] = useState(false)

    function viewSwitch(){
        setIsChat(!isChat)
    }

    return (
        <div className="container">
            
            <div className={"chat-room-container" + (isChat ? " chat-active": " chat-hide")}> {/* chat-active */}
                <div className="chat-room">
                    <ChatHeading barSwitch={viewSwitch} />
                    <Messages />
                    <MessageInput />
                </div>
            </div>
            <SideBar viewState={!isChat} chatSwitch={viewSwitch} />
        </div>
    )
}
