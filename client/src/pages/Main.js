import React,{useState, useEffect, useContext} from 'react'
import SideBar from '../components/chats/SideBar'
import ChatHeading from '../components/chats/ChatHeading'
import Messages from '../components/messages/Messages'
import MessageInput from '../components/messages/MessageInput'
import '../styles/Main.css'
import { Animated } from 'react-animated-css'
import { useWindowSize } from '../hooks/winsize.hook'
// import io from 'socket.io-client'
import { AuthContext } from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import {UserContext} from '../context/UserContext'
import useSocket from 'use-socket.io-client'
import Profile from '../components/Profile'
// import { set } from 'mongoose'

export default function Main({chatRoute}) {
    const auth = useContext(AuthContext)
    const [isChat,setIsChat] = useState(true)
    const [hide, setHide] = useState(false)
    const [visibleButton, setVisibleButton] = useState(false)
    const history = useHistory()
    const [user, setUser] = useState({
        username:'',avatar:'',userId:'',status:'',load:true
    })
    const [chat] = useState('community')
    const [loadMessages,setLoadMessages] = useState(true)
    const [chats, setChats] = useState({})
    const [typingChats,setTypingChats] = useState({})
    const [width] = useWindowSize()
    
    const [socket] = useSocket({
        query: {
            token:auth.token
        },
        autoConnect: false
    });   

    useEffect(()=>{
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
        socket.on('load_user_info',(user)=>{
            setUser({...user,load:false})
        })
        socket.on('load_messages',(msgs)=>{
            // console.log(msgs)
            let messages = []
            for(let i = 0;i<msgs.length;i++){
                messages.push({username:msgs[i].username,userId:msgs[i].userId,text:msgs[i].text})
            }
            setLoadMessages(false)
            setChats({['community']:{messages:[...messages],last:false,typing:[]}})
            
        })
        socket.on('push_message',({chat,username,userId,text})=>{
            let message = {username,userId,text}
            let currentMessages = chats[chat] ? chats[chat].messages : []
            let currentTyping = chats[chat] ? chats[chat].typing : []

            var textLast = text.slice(0,15);
            if (textLast.length < text.length) {
                textLast += '...';
            }
            setChats({...chats,[chat]:{messages:[...currentMessages,message],last:{...message,text:textLast},typing:[...currentTyping]}})
            // console.log('Получено',message)
        })
        socket.on('push_typing_on',({username,chat})=>{
            // console.log(username,chat,'typing...')
            // let currentMessages = chats[chat] ? chats[chat].messages : []
            // let lastMessage = chats[chat] ? chats[chat].last : null
            let currentTyping = typingChats[chat] ? typingChats[chat] : []
            
            if (currentTyping.indexOf(username) < 0) {
                currentTyping.push(username);
            }
            if (currentTyping.indexOf(user.username) > -1) {
                currentTyping.splice(currentTyping.indexOf(user.username), 1);
            }
            
            // let obj = {...typingChats,[chat]:currentTyping}
            setTypingChats({...typingChats,[chat]:currentTyping})
            // console.log(obj)
        })
        socket.on('push_typing_off',({username,chat})=>{
            // console.log(username,chat,'off typing...')

            let currentTyping = typingChats[chat] ? typingChats[chat] : []
            
            // console.log(currentTyping)
            

            if (currentTyping.indexOf(username) > -1) {
                currentTyping.splice(currentTyping.indexOf(username), 1);
            }
            
            // let obj = {...typingChats,[chat]:currentTyping}
            setTypingChats({...typingChats,[chat]:currentTyping})
            // console.log(obj)
        })

        return(
            ()=>{
                socket.removeAllListeners();
            }
        )
        // setSocket(ioSocket)
    },[socket,chats,history,auth,user,typingChats])

    useEffect(()=>{
        socket.connect();
        console.log('connect')
    },[socket])
    
    function viewSwitch(){
        if(width>510) return
        if(isChat){
            setTimeout((setHide)=>{
                setHide(true)
            },400,setHide)
        }else{
            setHide(false)
        }
        setIsChat(!isChat)
    }

    const setStatus = (status) => {
        setUser({...user, status})
    }

    

    return (
        <UserContext.Provider value={{ username: user.username, avatar: user.avatar, userId:user.userId,status:user.status,load:user.load }} >
            <link rel="stylesheet" href="/themes/Light.css"/>
            <div className="container">
                { chatRoute ?
                <Animated style={width<=510 ? {width:"100%",height:"100%"} :  {width:"76.25%",height:"100%"}} animationIn="slideInLeft" animationOut="slideOutLeft" animationInDuration={400} animationOutDuration={400} isVisible={isChat} animateOnMount={false}> 
                <div style={{width:"100%"}} className={"chat-room-container" + (!hide ? " chat-active": " chat-hide")}>
                    <div className="chat-room">
                        <ChatHeading title={"Community"} barSwitch={viewSwitch} />
                        <Messages messages={chats[chat] ? chats[chat].messages : []} setVisibleButton={setVisibleButton} visibleButton={visibleButton} loading={loadMessages} />
                        <MessageInput typing={typingChats} chat={chat} socket={socket} visibleButton={visibleButton} />
                    </div>
                </div>
                </Animated>
                :
                <Animated style={width<=510 ? {width:"100%",height:"100%"} :  {width:"76.25%",height:"100%"}} animationIn="slideInLeft" animationOut="slideOutLeft" animationInDuration={400} animationOutDuration={400} isVisible={isChat} animateOnMount={false}> 
                <div style={{width:"100%"}} className={"chat-room-container" + (!hide ? " chat-active": " chat-hide")}>
                    <div className="chat-room">
                        <ChatHeading title={"Профиль"} barSwitch={viewSwitch} />
                        <Profile setStatus={setStatus} socket={socket} />
                        {/* <Messages messages={chats[chat] ? chats[chat].messages : []} setVisibleButton={setVisibleButton} visibleButton={visibleButton} /> */}
                        {/* <MessageInput typing={typingChats} chat={chat} socket={socket} visibleButton={visibleButton} /> */}
                    </div>
                </div>
                </Animated>
                } 
                <SideBar chatRoute={chatRoute} chats={chats} chat={chat} socket={socket} viewState={width<=510 ? !isChat : false} chatSwitch={viewSwitch} hide={width<=510 ? !hide : false} />
            </div>
        </UserContext.Provider>
    )
}
