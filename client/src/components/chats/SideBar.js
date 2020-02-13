import React, { useContext} from 'react'
// import User from './User'
import { IoIosArrowBack,IoIosLogOut,IoIosPerson } from "react-icons/io";
import { IconContext } from "react-icons";
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';


export default function SideBar({viewState,chatSwitch,hide,socket}) {
    const {username,avatar,load} = useContext(UserContext);
    const auth = useContext(AuthContext)
    const history = useHistory()
    const logoutHandler = e =>{
        e.preventDefault()
        socket.emit('logout')
        auth.logout()
        history.push('/')
    }
    // useEffect(()=>{
    //     // console.log(user)
    // },[user])
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
                        <IconContext.Provider value={{ color: "white", size:"20px" }}>
                            <IoIosPerson className="react-button"/>
                        </IconContext.Provider>
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
                                <div className="last-message">{"Последнее сообщение"}</div>
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
