import React,{useState, useEffect, useContext} from 'react'
import SideBar from '../components/chats/SideBar'
import ChatHeading from '../components/chats/ChatHeading'
import Messages from '../components/messages/Messages'
import MessageInput from '../components/messages/MessageInput'
import '../styles/Chat.css'
import { Animated } from 'react-animated-css'
import { useWindowSize } from '../hooks/winsize.hook'
import io from 'socket.io-client'
import { AuthContext } from '../context/AuthContext'


export default function Chat() {
    const auth = useContext(AuthContext)
    const [isChat,setIsChat] = useState(true)
    const [hide, setHide] = useState(false)
    const [visibleButton, setVisibleButton] = useState(false)
    const [socket, setSocket] = useState(null)

    const [width] = useWindowSize()

    useEffect(()=>{
        const ioSocket = io({
            query: {
                token:auth.token
            }
        })
        ioSocket.on('connect',()=>{
            console.log("Connected")
        })
        ioSocket.on('logout', ()=>{
            auth.logout()
        })
        // ioSocket.emit("hi")
        setSocket(ioSocket)
    },[])

    function viewSwitch(){
        if(isChat){
            setTimeout((setHide)=>{
                setHide(true)
            },400,setHide)
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
                    <Animated style={{width:"100%",height:"100%"}} animationIn="slideInLeft" animationOut="slideOutLeft" animationInDuration={400} animationOutDuration={400} isVisible={isChat} animateOnMount={false}>
                    <div className={"chat-room-container" + (!hide ? " chat-active": " chat-hide")}>
                        <div className="chat-room">
                            <ChatHeading barSwitch={viewSwitch} />
                            <Messages setVisibleButton={setVisibleButton} />
                            <MessageInput visibleButton={visibleButton} />
                        </div>
                    </div>
                    </Animated>
                    <SideBar socket={socket} viewState={!isChat} chatSwitch={viewSwitch} hide={!hide} />
                    </>
                ) :
                (
                    <>
                    <div className="chat-room-container">
                        <div className="chat-room">
                            <ChatHeading barSwitch={viewSwitch} />
                            <Messages setVisibleButton={setVisibleButton} />
                            <MessageInput visibleButton={visibleButton} />
                        </div>
                    </div>
                    {/* </Animated> */}
                    <SideBar socket={socket} viewState={true} chatSwitch={viewSwitch} />
                    </>
                )
            }
            
        </div>
    )
}
