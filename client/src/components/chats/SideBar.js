import React from 'react'
import User from './User'
import { IoIosArrowBack,IoIosLogOut,IoIosPerson } from "react-icons/io";

export default function SideBar({viewState,chatSwitch,hide}) {
    return (
        <div id="side-bar" className={viewState ? " " : "side-bar-hide"} 
        style={hide ? {"z-index":"0"}:{"z-index":"-1"}}
        >
					<div className="heading">
                        <div 
                        id="back"
                        onClick={()=>{chatSwitch()}}
                        > <IoIosArrowBack/> </div>
						<div className="app-name">TwiChat v0.8</div>
                        <div className="menu"><IoIosPerson/></div>
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
						
                        <User username={"MasterTime"} />
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
						<span>{"Sketch"}</span> 
                        <IoIosLogOut/>
					</div>
			</div>
    )
}
