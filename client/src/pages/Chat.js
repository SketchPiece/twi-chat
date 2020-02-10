import React,{useState} from 'react'
import SideBar from '../components/chats/SideBar'
import ChatHeading from '../components/chats/ChatHeading'
import Messages from '../components/messages/Messages'
import MessageInput from '../components/messages/MessageInput'
import '../styles/Chat.css'
import { Animated } from 'react-animated-css'
import { useWindowSize } from '../hooks/winsize.hook'

export default function Chat() {
    const [isChat,setIsChat] = useState(false)
    const [hide, setHide] = useState(true)

    const [width] = useWindowSize()


    function viewSwitch(){
        if(isChat){
            setTimeout((setHide)=>{
                setHide(true)
            },1000,setHide)
        }else{
            setHide(false)
        }
        setIsChat(!isChat)
    }

    return (
        <div className="container">
            { width<=510 ? 
                (
                    <>
                    <Animated style={{"width":"100%"}} animationIn="slideInLeft" animationOut={"slideOutLeft"} isVisible={isChat}>
                    <div className={"chat-room-container" + (!hide ? " chat-active": " chat-hide")}> {/* chat-active */}
                        <div className="chat-room">
                            <ChatHeading barSwitch={viewSwitch} />
                            <Messages />
                            <MessageInput />
                        </div>
                    </div>
                    </Animated>
                    <SideBar viewState={!isChat} chatSwitch={viewSwitch} hide={hide} />
                    </>
                ) :
                (
                    <>
                    <div className="chat-room-container">
                        <div className="chat-room">
                            <ChatHeading barSwitch={viewSwitch} />
                            <Messages />
                            <MessageInput />
                        </div>
                    </div>
                    {/* </Animated> */}
                    <SideBar viewState={true} chatSwitch={viewSwitch} />
                    </>
                )
            }
            
        </div>
    )
}
