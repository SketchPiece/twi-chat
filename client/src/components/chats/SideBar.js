import React, { useContext} from 'react'
import { IoIosArrowBack,IoIosLogOut,IoIosPerson } from "react-icons/io";
import { FaComments } from 'react-icons/fa'
import {getAvatarUrl} from '../../scripts/extra'

import { IconContext } from "react-icons";
import { AuthContext } from '../../context/AuthContext';
import { useHistory,Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';


export default function SideBar({viewState,chatSwitch,hide,socket,chats,chatRoute}) {
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
						<div className="app-name">TwiChat v0.8 Beta</div>
                        <div className="menu">
                        {
                            chatRoute ? 
                            <IconContext.Provider value={{ color: "white", size:"20px" }}>
                            <Link onClick={()=>{chatSwitch()}} to="/profile">
                                <IoIosPerson className="react-button"/>
                            </Link>
                            </IconContext.Provider>
                            :
                            <IconContext.Provider value={{ color: "white", size:"20px" }}>
                            <Link onClick={()=>{chatSwitch()}} to="/chat">
                                <FaComments className="react-button"/>
                            </Link>
                            </IconContext.Provider>
                        }
                        
                        </div>
					</div>
					<div 
						className="users" 
                        >
                        
                        <div 
                            className={`user active`}
                            >
                            <div className="user-photo">{"C"}</div>
                            <div className="user-info">
                                <div className="name">{"Community"}</div>
                                <div className="last-message">{getLastMessage('community')}</div>
                            </div>
                            
                        </div>
						
					</div>
					<div className="current-user">
                        <div className="user-container">
                            <Link to='/profile'>
                            <img className={ "avatar"+(!load ? " animated slideInRight" : ' none')} src={getAvatarUrl(avatar,54)} alt="avatar"/>
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
