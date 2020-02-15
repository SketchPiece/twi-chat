import React, { useContext} from 'react'
// import User from './User'
import { IoIosArrowBack,IoIosLogOut,IoIosPerson } from "react-icons/io";
import { FaComments } from 'react-icons/fa'

import { IconContext } from "react-icons";
import { AuthContext } from '../../context/AuthContext';
import { useHistory,Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';


export default function SideBar({viewState,chatSwitch,hide,socket,chats,chatRoute}) {
    const {username,avatar,load} = useContext(UserContext);
    const auth = useContext(AuthContext)
    const history = useHistory()
    // if(!chats[chat]) chats[chat] = {}
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
    // useEffect(()=>{
    //     // console.log(user)
    // },[user])

    // const noop = () =>{}
    
    return (
        <div id="side-bar" className={viewState ? " " : "side-bar-hide"} 
        style={hide ? {zIndex:-1}:{zIndex:0}}
        >
					<div className="heading">
                        <div 
                        id="back"
                        onClick={()=>{chatSwitch()}}
                        > <IoIosArrowBack/> </div>
						<div className="app-name">TwiChat v0.8</div>
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
					{/* <div className="search">
						<i className="search-icon"></i>
						<input placeholder="Search" type="text"/>
						<div className="plus"></div>
					</div> */}
					<div 
						className="users" 
						// ref='users' 
						// onClick={(e)=>{ (e.target === this.refs.user) && setActiveChat(null) }}
                        >
                        
                        <div 
                            // key={chat.id} 
                            className={`user active`}
                            // onClick={ ()=>{ setActiveChat(chat) } }
                            >
                            <div className="user-photo">{"C"}</div>
                            <div className="user-info">
                                <div className="name">{"Community"}</div>
                                <div className="last-message">{getLastMessage('community')}</div>
                            </div>
                            
                        </div>
						
                        {/* <User username={"MasterTime"} /> */}
                        {/* <User username={"MasterTime"} />
                        <User username={"MasterTime"} />
                        <User username={"MasterTime"} />
                        <User username={"MasterTime"} />
                        <User username={"MasterTime"} />
                        <User username={"MasterTime"} />
                        <User username={"MasterTime"} />
                        <User username={"MasterTime"} />
                        <User username={"MasterTime"} /> */}
						
					</div>
					<div className="current-user">
                        <div className="user-container">
                        <img className={ "avatar"+(!load ? " animated slideInRight" : ' none')} src={avatar} alt="avatar"/>
						<span className={ "username"+(!load ? " animated slideInRight" : ' none')}>{username}</span> 
                        </div>
                        <IconContext.Provider value={{ color: "white", size:"20px" }}>
                            <IoIosLogOut onClick={logoutHandler} className="react-button" />
                        </IconContext.Provider>                        
					</div>
			</div>
    )
}
