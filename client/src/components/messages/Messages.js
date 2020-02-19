import React,{useState,useEffect, useContext} from 'react'
import Message from './Message'
import { UserContext } from '../../context/UserContext';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {ToBottom} from '../../scripts/extra'
import Loader from '../Loader';

export default function Messages({setVisibleButton,messages,loading}) {
    const [isBottom, setIsBottom] = useState(true)
    const [messCount,setMessCount] = useState(0)

    let user = useContext(UserContext)

    useEffect(() => {
        ToBottom()
    },[])
    
    useEffect(() => {
        if(messCount !== messages.length){
            setMessCount(messages.length)
            if(messages[messages.length-1].username === user.username) ToBottom()
            if(isBottom) ToBottom()
        }
    }, [messages,user,messCount,isBottom])

    // useEffect(() => {
    //     effect
        
    // })
    
    function scrollHandler() {
        const thread = document.getElementById("msgs")
        const scrollMax = thread.scrollHeight-thread.offsetHeight
        const scroll = thread.scrollTop;
        if(scrollMax-scrollMax*0.10<scroll){
            setVisibleButton(false)
            setIsBottom(true)
        }else{
            setVisibleButton(true)
            setIsBottom(false)
        }
    }
    

    return (

        <div className="thread-container" id="msgs" onScroll={scrollHandler}>
            { loading ? (
                <Loader loader="messages" />
            ) : (
				<div className="thread" id="msgsInner">
                    <ReactCSSTransitionGroup
                        transitionName={{
                            enter: "animated",
                            enterActive: "zoomIn",
                            leave: "animated",
                        }}
                        >
                    {
                        messages.map((msg, index)=>{               
                            return <Message className="fast" key={index} message={msg.text} me={user.userId === msg.userId ? true : false} name={msg.username} avatarId={msg.avatar} userId={msg.userId} />
                        })
                    }
                    </ReactCSSTransitionGroup>
				</div>
                )
            }

			</div>
    )
}
