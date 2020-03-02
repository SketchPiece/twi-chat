import React,{useState,useEffect, useContext} from 'react'
import Message from './Message'
import { UserContext } from '../../context/UserContext';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {ToBottom,ScrollTo} from '../../scripts/extra'
import Loader from '../Loader';

export default function Messages({setVisibleButton,messages,loading,socket,next,finishMessages,chat,RefreshChat}) {
    const [isBottom, setIsBottom] = useState(true)
    const [messCount,setMessCount] = useState(0)
    const [scrollState, setScrollState] = useState(0)
    const [nextState, setNextState] = useState(0)
    const [refresh, setRefresh] = useState(false)
    const [isScroll, setIsScroll] = useState(false)
    // const [chatStatus, setChatStatus] = useState(chat)

    let user = useContext(UserContext)
    
    useEffect(() => {
        const thread = document.getElementById("msgs")
        const scrollMax = thread.scrollHeight-thread.offsetHeight
        // const scroll = thread.scrollTop;
        // console.log(scroll,scrollMax)
        // if(scrollMax === 0) {
        //     // console.log('scroll',false,scroll,scrollMax)
        //     setIsScroll(false)
        // } else {
        //     // console.log('scroll',true,scroll,scrollMax)
        //     setIsScroll(true)
        // }
        setScrollState(scrollMax)
        setNextState(next)
        setMessCount(messages.length)
        // if(chatStatus !== chat) {
            // setChatStatus(chat)

            // ToBottom(5)
            // setTimeout((setVisibleButton)=>{
            //     // console.log('butt',false)
            //     setVisibleButton(false)
            // },105,setVisibleButton)
            // console.log(isScroll)
            // console.log(scroll,scrollMax)


            // console.log(scrollMax)
            // if(scrollMax===0) setIsScroll(false)
            // console.log(scroll,scrollMax)
        // }
        // console.log('status',chatStatus)
        // if(messages.length<25) 
        // console.log('пися1')

        if(messCount !== messages.length){
            setRefresh(true)
            // console.log('пися2')
            // if(messages[messages.length-1].username === user.username) ToBottom()
            if(isBottom) ToBottom()
            if(next>1 && next !== nextState) return ScrollTo(scrollMax-scrollState)
            // console.log('msgs')
            ToBottom()


            
            // console.log(next,scrollMax,scrollState)
            
        }
        // ToBottom()
    }, [messages,user,messCount,isBottom,next,nextState,scrollState,chat,setVisibleButton])

    

    // useEffect(() => {
    //     effect
        
    // })
    
    function scrollHandler() {
        // console.log('scroll')
        const thread = document.getElementById("msgs")
        const scrollMax = thread.scrollHeight-thread.offsetHeight
        const scroll = thread.scrollTop;

        // console.log(scroll,scrollMax)
        if(scrollMax-scrollMax*0.10<=scroll){
            if(refresh){
                // console.log('suka')
                // socket.emit('refresh_messages')
                RefreshChat(chat)

                setRefresh(false)
            }
            // console.log('set false')

            setIsScroll(false)
            setVisibleButton(false)
            setIsBottom(true)
        }else{
            setIsScroll(true)
            setRefresh(true)
            // console.log(scrollMax,scroll)
            // console.log('butt',true)

            setVisibleButton(true)
            setIsBottom(false)
        }

        if(scroll===0 && scrollMax>0){
            if(finishMessages) return

            socket.emit('load_more_messages',{next,chat})
        }
    }


    return (
        <div className="thread-container" id="msgs" onScroll={scrollHandler}>
            { loading ? (
                <Loader loader="messages" />
            ) : (
				<div className="thread" id="msgsInner">
                    {
                        !finishMessages && isScroll ? <div className='msgload'><Loader loader='msgload' /></div> : ''
                    }
                    <ReactCSSTransitionGroup
                        transitionName={{
                            enter: "animated",
                            enterActive: "zoomIn",
                            leave: "animated",
                            leaveActive:"fadeOut"
                        }}
                        transitionEnterTimeout={400}
                        transitionLeaveTimeout={400}
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
