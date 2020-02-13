import React,{useState, useEffect, useContext} from 'react'
import SideBar from '../components/chats/SideBar'
import ChatHeading from '../components/chats/ChatHeading'
import Messages from '../components/messages/Messages'
import MessageInput from '../components/messages/MessageInput'
import '../styles/Chat.css'
import { Animated } from 'react-animated-css'
import { useWindowSize } from '../hooks/winsize.hook'
// import io from 'socket.io-client'
import { AuthContext } from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import {UserContext} from '../context/UserContext'
import useSocket from 'use-socket.io-client'
// import { set } from 'mongoose'

export default function Chat() {
    const auth = useContext(AuthContext)
    const [isChat,setIsChat] = useState(true)
    const [hide, setHide] = useState(false)
    const [visibleButton, setVisibleButton] = useState(false)
    // const [socket, setSocket] = useState(null)
    const [socket] = useSocket({
        query: {
            token:auth.token
        },
        autoConnect: false
    });   

    const history = useHistory()
    const [user, setUser] = useState({
        username:'',avatar:'',userId:'',load:true
    })
    const [chat] = useState('community')

    const [messages, setMessages] = useState([])

    // const

    const [width] = useWindowSize()

    

    // useEffect(()=>{
    //     const ioSocket = io({
    //         query: {
    //             token:auth.token
    //         }
    //     })
    //     setSocket(ioSocket)
    // },[])

    useEffect(()=>{
        // if(!socket) return
        socket.on('connect',()=>{
            console.log("Connected")
        })
        socket.on('reload', ()=>{
            auth.reload()
        })
        socket.on('logout', ()=>{
            auth.logout()
            history.push('/')
        })
        socket.on('user_info',(user)=>{
            // console.log(user)
            setUser({...user,load:false})
        })
        socket.on('push_message',(message)=>{
            // let msgs = messages.push({text,username,userId})
            // console.log('push',messages)
            setMessages([...messages,message])
            console.log('Получено',message)
            // console.log(messages)
        })
        socket.on('push',({text,username,userId})=>{
            console.log('push')
        })
        // ioSocket.emit("hi")

        // setSocket(ioSocket)
    },[socket,history,auth,messages])

    useEffect(()=>{
        socket.connect();
    },[socket])
    
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
        <UserContext.Provider value={{ username: user.username, avatar: user.avatar, userId:user.userId,load:user.load }} >

            <div className="container">
                { width<=510 ? 
                    (
                        <>
                        <Animated style={{width:"100%",height:"100%"}} animationIn="slideInLeft" animationOut="slideOutLeft" animationInDuration={400} animationOutDuration={400} isVisible={isChat} animateOnMount={false}>
                        <div className={"chat-room-container" + (!hide ? " chat-active": " chat-hide")}>
                            <div className="chat-room">
                                <ChatHeading barSwitch={viewSwitch} />
                                <Messages messages={messages} setVisibleButton={setVisibleButton} />
                                <MessageInput chat={chat} socket={socket} visibleButton={visibleButton} />
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
                                <Messages messages={messages} setVisibleButton={setVisibleButton} />
                                <MessageInput chat={chat} socket={socket} visibleButton={visibleButton} />
                            </div>
                        </div>
                        {/* </Animated> */}
                        <SideBar socket={socket} viewState={true} chatSwitch={viewSwitch} />
                        </>
                    )
                }
                
            </div>

        </UserContext.Provider>
    )
}
