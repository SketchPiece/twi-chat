import React,{useState,useEffect, useContext} from 'react'
import Message from './Message'
import { UserContext } from '../../context/UserContext';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {ToBottom,ScrollTo} from '../../scripts/extra'
import Loader from '../Loader';

export default function Messages({setVisibleButton,messages,loading,socket,next,finishMessages}) {
    const [isBottom, setIsBottom] = useState(true)
    const [messCount,setMessCount] = useState(0)
    const [scrollState, setScrollState] = useState(0)
    const [nextState, setNextState] = useState(0)

    let user = useContext(UserContext)

    // useEffect(() => {
    //     ToBottom()
    // },[])
    
    useEffect(() => {
        // console.log(messages)
        const thread = document.getElementById("msgs")
        const scrollMax = thread.scrollHeight-thread.offsetHeight
        setScrollState(scrollMax)
        setNextState(next)
        setMessCount(messages.length)
        // console.log('пися')

        if(messCount !== messages.length){
            // console.log('пися')
            // if(messages[messages.length-1].username === user.username) ToBottom()
            if(isBottom) ToBottom()
            if(next>1 && next !== nextState) return ScrollTo(scrollMax-scrollState)
            
            // console.log(next,scrollMax,scrollState)
            
        }
    }, [messages,user,messCount,isBottom,next,nextState,scrollState])

    

    // useEffect(() => {
    //     effect
        
    // })
    
    function scrollHandler() {
        const thread = document.getElementById("msgs")
        const scrollMax = thread.scrollHeight-thread.offsetHeight
        const scroll = thread.scrollTop;

        // console.log(scroll,scrollMax)
        if(scrollMax-scrollMax*0.10<scroll){
            setVisibleButton(false)
            setIsBottom(true)
        }else{
            setVisibleButton(true)
            setIsBottom(false)
        }

        // console.log(scroll)
        if(scroll===0){
            // console.log('load more')
            // alert('load more')
            socket.emit('load_more_messages',{next})
        }
        if(scrollMax === scroll){
            // setChats({})
            if(finishMessages) return
            socket.emit('refresh_messages')
        }
    }
    
    // if(loading) return 


    return (
        <div className="thread-container" id="msgs" onScroll={scrollHandler}>
            { loading ? (
                <Loader loader="messages" />
            ) : (
				<div className="thread" id="msgsInner">
                    {
                        !finishMessages ? <div className='msgload'><Loader loader='msgload' /></div> : ''
                    }
                    <ReactCSSTransitionGroup
                        transitionName={{
                            enter: "animated",
                            enterActive: "zoomIn",
                            leave: "animated",
                            leaveActive:"fadeOut"
                        }}
                        >
                    {
                        messages.map((msg,i)=>{               
                            return <Message key={msg.id} message={msg.text} me={user.userId === msg.userId ? true : false} name={msg.username} avatarId={msg.avatar} userId={msg.userId} />
                        })
                    }
                    </ReactCSSTransitionGroup>
				</div>
                )
            }

		</div>
    )
}
