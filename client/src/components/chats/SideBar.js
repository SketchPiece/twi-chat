import React, { useContext} from 'react'
import { IoIosArrowBack,IoIosLogOut,IoIosPerson } from "react-icons/io";
import { FaComments } from 'react-icons/fa'
import {getAvatarUrl, ToBottom} from '../../scripts/extra'
// import {} from 'react-router-dom'
import { IconContext } from "react-icons";
import { AuthContext } from '../../context/AuthContext';
import { useHistory,Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';


export default function SideBar({viewState,chatSwitch,hide,socket,chats,chat,chatRoute,chatButtons}) {
    const {username,avatar,load} = useContext(UserContext);
    const auth = useContext(AuthContext)
    const history = useHistory()
    const logoutHandler = e =>{
        e.preventDefault()
        socket.emit('logout')
        auth.logout()
        history.push('/')
    }
    const getLastMessage = (chat)=>{
        if(!chats[chat]) return ''
        if(!chats[chat].last) return ''
        if(chats[chat].last.username === username) return `Ты: ${chats[chat].last.text}` 
        return `${chats[chat].last.username}: ${chats[chat].last.text}`
    }
    
    return (
        <div id="side-bar" className={viewState ? " " : "side-bar-hide"} 
        style={hide ? {zIndex:-1}:{zIndex:0}}
        >
					<div className="heading">
                        <div 
                        id="back"
                        onClick={()=>{chatSwitch()}}
                        > <IoIosArrowBack/> </div>
						<div className="app-name">TwiChat v0.8.1 Beta</div>
                        <div onClick={()=>{chatSwitch()}} className="menu">
                        {
                            chatRoute ? 
                            <IconContext.Provider value={{ color: "white", size:"20px" }}>
                            <Link to="/profile">
                                <IoIosPerson className="react-button"/>
                            </Link>
                            </IconContext.Provider>
                            :
                            <IconContext.Provider value={{ color: "white", size:"20px" }}>
                            <Link to="/chat">
                                <FaComments className="react-button"/>
                            </Link>
                            </IconContext.Provider>
                        }
                        
                        </div>
					</div>
					<div className="users" >
                        
                        <Link onClick={()=>{chatSwitch();ToBottom();}} to='/chat'>                        
                        <div 
                            className={`user `+ (chat === 'community' ? 'active' : '') }
                            >
                            <div className="user-photo">{"C"}</div>
                            <div className="user-info">
                                <div className="name">{"Community"}</div>
                                <div className="last-message">{getLastMessage('community')}</div>
                            </div>
                            
                        </div>
                        </Link>

                        {
                            chatButtons.map(({chatId,userId,username,avatar},index)=>{
                                // console.log()
                                if(!getLastMessage(chatId)) return <></>
                                return (
                                <Link key={index} onClick={()=>{chatSwitch();ToBottom();}} to={`/direct/${userId}`}>                        
                                <div 
                                    className={`user `+ (chat === chatId ? 'active' : '') }
                                    >
                                    <div className="user-photo">
                                        <img className="chat-avatar" src={getAvatarUrl(avatar,65)} alt="chatAvatar" width="65"/>
                                    </div>
                                    <div className="user-info">
                                        <div className="name">{username}</div>
                                        <div className="last-message">{getLastMessage(chatId)}</div>
                                    </div>
                                    
                                </div>
                                </Link>
                                )
                            })
                        }

                        {/* <Link onClick={()=>{chatSwitch();ToBottom();}}  to='/direct/5e4fd4eeff2bff4adca003a7'>                        
                        <div 
                            className={`user`}
                            >
                            <div className="user-photo">{"A"}</div>
                            <div className="user-info">
                                <div className="name">{"Admin"}</div>
                                <div className="last-message">{getLastMessage('community')}</div>
                            </div>
                            
                        </div>
                        </Link> */}

						
					</div>
					<div className="current-user">
                        <div className="user-container">
                            <Link to='/profile'>
                            <img className={ "avatar"+(!load ? " animated slideInRight" : ' none')} onClick={()=>{chatSwitch()}} src={getAvatarUrl(avatar,54)} alt="avatar"/>
                            </Link>
						<span className={ "username"+(!load ? " animated slideInRight" : ' none')}>{username}</span> 
                        </div>
                        <IconContext.Provider value={{ color: "white", size:"20px" }}>
                            <IoIosLogOut onClick={logoutHandler} className="react-button" />
                        </IconContext.Provider>                        
					</div>
			</div>
    )
}
