import './Main.css'
import React,{useState, useEffect, useContext} from 'react'
import SideBar from '../components/chats/SideBar'
import ChatHeading from '../components/chats/ChatHeading'
import Messages from '../components/messages/Messages'
import MessageInput from '../components/messages/MessageInput'
import { Animated } from 'react-animated-css'
import { useWindowSize } from '../hooks/winsize.hook'
import { AuthContext } from '../context/AuthContext'
import {useHistory, useParams} from 'react-router-dom'
import {UserContext} from '../context/UserContext'
import useSocket from 'use-socket.io-client'
import Profile from '../components/Profile'
import EasterEgg from '../components/EasterEgg'
import OtherProfile from '../components/OtherProfile'
import { ToBottom } from '../scripts/extra'

export default function Main({chatRoute,otherProfile,direct}) {
    const auth = useContext(AuthContext)
    const paramsChatId = useParams().id
    let community = 'community'
    const [isChat,setIsChat] = useState(true)
    const [hide, setHide] = useState(false)
    const [visibleButton, setVisibleButton] = useState(false)
    const history = useHistory()
    const [user, setUser] = useState({
        username:'',avatar:'',userId:'',status:'',load:true
    })
    const [chat,setChat] = useState(null)
    const [loadMessages,setLoadMessages] = useState(true)
    const [chats, setChats] = useState({})
    const [chatButtons, setChatButtons] = useState([])
    const [typingChats,setTypingChats] = useState({})
    const [width] = useWindowSize()
    const [easterEgg, setEasterEgg] = useState(false)
    const [usersProfile, setUsersProfile] = useState({})
    const [friendRequests, setFriendRequests] = useState([])
    const [friends, setFriends] = useState([])
    const [finishMessages, setFinishMessages] = useState(false)

    const [loadChats, setLoadChats] = useState({})
    
    const [socket] = useSocket({
        query: {
            token:auth.token
        },
        autoConnect: false
    });   

    useEffect(()=>{
        socket.on('connect',()=>{
            // console.log("Connected")
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
        socket.on('load_info',({messages,chatButtonsPush,lasts}) =>{ 
            if(!direct) {
                setLoadMessages(false)
            }           
            // console.log(lasts)
            let last = null
            if(messages.length > 0){
                let text = messages[messages.length-1].text
                let textLast = text.slice(0,15);
                if (textLast.length < text.length) {
                    textLast += '...';
                }
                last = {...messages[messages.length-1],text:textLast}
            }
            let chats = {[community]:{messages:[...messages],last,typing:[],next:1}}
            for(let i = 0; i<lasts.length;i++){
                
                chats = {...chats,[lasts[i].chatId]:{messages:[],typing:[],next:1,last:lasts[i]}}
            }
            setChats(chats)
            setChatButtons([...chatButtonsPush])
            setLoadChats({})
        })
        socket.on('push_more_messages',({messages,isFinish,chat})=>{
            setFinishMessages(isFinish)
            setChats({...chats,[chat]:{messages:[...messages,...chats[chat].messages],last:chats[chat].last,typing:chats[chat].typing,next:chats[chat].next+1}})
        })
        socket.on('push_message',({id,chat,username,userId,text,avatar})=>{
            let message = {id,username,userId,text,avatar}
            let currentMessages = chats[chat] ? chats[chat].messages : []
            let currentTyping = chats[chat] ? chats[chat].typing : []

            var textLast = text.slice(0,15);
            if (textLast.length < text.length) {
                textLast += '...';
            }
            setChats({...chats,[chat]:{messages:[...currentMessages,message],last:{...message,text:textLast},typing:[...currentTyping]}})
            // if(chatButtons)
            // if(sendTo==='community') return
            // if(chatExist(chat)) return
            // setChatButtons([...chatsRefresh])
            // setChatButtons([...chatButtons,{chatId:chat,username}])
            // let u  = {userId,chatId:chat,username}
        })
        socket.on('push_typing_on',({username,chat})=>{
            let currentTyping = typingChats[chat] ? typingChats[chat] : []
            
            if (currentTyping.indexOf(username) < 0) {
                currentTyping.push(username);
            }
            if (currentTyping.indexOf(user.username) > -1) {
                currentTyping.splice(currentTyping.indexOf(user.username), 1);
            }
            
            setTypingChats({...typingChats,[chat]:currentTyping})
        })
        socket.on('push_typing_off',({username,chat})=>{
            let currentTyping = typingChats[chat] ? typingChats[chat] : []
            
            if (currentTyping.indexOf(username) > -1) {
                currentTyping.splice(currentTyping.indexOf(username), 1);
            }
            
            setTypingChats({...typingChats,[chat]:currentTyping})
        })
        socket.on('push_other_user',({exist,userId,username,status,avatar,tag,friends})=>{
            if(!exist) {
                return setUsersProfile({...usersProfile,[userId]:{exist:false}})   
            }
            setUsersProfile({...usersProfile,[userId]:{exist:true,username,status,avatar,tag,friends}})

        })
        socket.on('push_friend_requests',(friendRequests)=>{
            setFriendRequests(friendRequests)
        })
        socket.on('push_friends',(friends)=>{
            // console.log('push_friends')
            setFriends(friends)
        })
        socket.on('update_chat_buttons',({userIds,usernameIds,avatars,chatId})=>{
            // console.log('update chat')
            let notMe = 0
            if(userIds[notMe]===user.userId) notMe = 1
            setChatButtons([...chatButtons,{userId:userIds[notMe],username:usernameIds[notMe],avatar:avatars[notMe],chatId}])
        })
        socket.on('push_chat_messages',({chatId,status,messages,userId})=>{
            // console.log(status)
            
            if(!status) return history.push('/chat')
            setLoadMessages(false)
            setChat(chatId)
            // setLoadChats()
            if(!loadChats[userId]) setLoadChats({...loadChats,[userId]:chatId}) 
            // console.log(messages)
            // setChat(null)
            let last = null
            if(messages.length > 0){
                let text = messages[messages.length-1].text
                let textLast = text.slice(0,15);
                if (textLast.length < text.length) {
                    textLast += '...';
                }
                last = {...messages[messages.length-1],text:textLast}
            }
            setChats({...chats,[chatId]:{messages:[...messages],last,typing:[],next:1}})
            ToBottom()
        })

        return(
            ()=>{
                socket.removeAllListeners();
            }
        )
    },[socket,chats,history,auth,user,typingChats,usersProfile,chat,direct,community,chatButtons,loadChats,setLoadChats])

    useEffect(() => {
        // console.log(direct)
        if(!direct) setChat('community')


        if(otherProfile) return
        if(!paramsChatId) return

        // console.log('loadChats',loadChats)
        if(loadChats[paramsChatId]) return setChat(loadChats[paramsChatId])
    
        setLoadMessages(true)
        socket.emit('get_chat_messages',{userId:paramsChatId})
    }, [socket,paramsChatId,chat,direct,otherProfile,loadChats])

    useEffect(()=>{
        socket.connect();
        // console.log('connect')
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

    const setAvatar = (avatar) => {
        setUser({...user, avatar})
    }

    // const chatExist = (chatId) => {
    //     let isExist = false
    //     console.log(chatId)
    //     console.log(chatButtons)
    //     for(let i = 0;i<chatButtons.length;i++){
    //         console.log(chatButtons[i])
    //         if(chatButtons[i].chatId === chatId) isExist = true
    //     }

    //     return isExist
    // }

    const RefreshChat = (chat) =>{
        let messages = chats[chat] ? chats[chat].messages || [] : []
        
        if(messages.length<=25) return
        // console.log(messages)        
        // console.log(messages.slice(messages.length-25))

        messages = messages.slice(messages.length-25)

        setFinishMessages(false)
        
        let last = null
        if(messages.length > 0){
            let text = messages[messages.length-1].text
            let textLast = text.slice(0,15);
            if (textLast.length < text.length) {
                textLast += '...';
            }
            last = {...messages[messages.length-1],text:textLast}
        }
        // let chat = 'community'
        setChats({...chats,[chat]:{messages:[...messages],last,typing:[],next:1}})
        ToBottom()
    }

    const getChatHeader = (chat) => {
        if(chat==='community') return 'Community'
        for(let i=0; i < chatButtons.length; i++){
            if(chatButtons[i].chatId === chat) return chatButtons[i].username
        }
        return 'Ты шо там, дрочиш?'
    }


    if(easterEgg){
        return <EasterEgg />
    }

    return (
        <UserContext.Provider value={{ username: user.username, avatar: user.avatar, userId:user.userId,status:user.status,tag:user.tag,load:user.load }} >
            <link rel="stylesheet" href="/themes/Dark.css"/>
            <div className="container">
                { chatRoute ?
                <Animated style={width<=510 ? {width:"100%",height:"100%"} :  {width:"76.25%",height:"100%"}} animationIn="slideInLeft" animationOut="slideOutLeft" animationInDuration={400} animationOutDuration={400} isVisible={isChat} animateOnMount={false}> 
                <div style={{width:"100%"}} className={"chat-room-container" + (!hide ? " chat-active": " chat-hide")}>
                    <div className="chat-room">
                        <ChatHeading title={getChatHeader(chat)} barSwitch={viewSwitch} />
                        <Messages RefreshChat={RefreshChat} finishMessages={finishMessages} chat={chat} next={chats[chat] ? chats[chat].next : 0} messages={chats[chat] ? chats[chat].messages : []} setVisibleButton={setVisibleButton} visibleButton={visibleButton} loading={loadMessages} socket={socket} />
                        <MessageInput setChats={setChats} load={loadMessages} typing={typingChats} chat={chat} socket={socket} visibleButton={visibleButton} />
                    </div>
                </div>
                </Animated>
                :
                <Animated style={width<=510 ? {width:"100%",height:"100%"} :  {width:"76.25%",height:"100%"}} animationIn="slideInLeft" animationOut="slideOutLeft" animationInDuration={400} animationOutDuration={400} isVisible={isChat} animateOnMount={false}> 
                <div style={{width:"100%"}} className={"chat-room-container" + (!hide ? " chat-active": " chat-hide")}>
                    <div className="chat-room">
                        <ChatHeading title={"Профиль"} barSwitch={viewSwitch} />
                        {
                            !otherProfile ?
                            <Profile friends={friends} requests={friendRequests} setAvatar={setAvatar} setEasterEgg={setEasterEgg} setStatus={setStatus} socket={socket} />
                            :
                            <OtherProfile usersProfile={usersProfile} setEasterEgg={setEasterEgg} socket={socket} />
                        }
                    </div>
                </div>
                </Animated>
                } 
                <SideBar chatButtons={chatButtons} chatRoute={chatRoute} chats={chats} chat={chat} socket={socket} viewState={width<=510 ? !isChat : false} chatSwitch={viewSwitch} hide={width<=510 ? !hide : false} />
            </div>
        </UserContext.Provider>
    )
}
