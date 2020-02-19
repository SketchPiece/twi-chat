import React,{useState, useContext,useEffect} from 'react'
import { Animated } from 'react-animated-css';
import { IoIosArrowDown } from "react-icons/io";
import { IconContext } from "react-icons";
import { UserContext } from '../../context/UserContext';
import { useTimer } from 'react-timer-hook';

export default function MessageInput({visibleButton,socket,chat,typing,load}) {
    const [inputText,setInputText] = useState("");
    const [type, setType] = useState('')
    const {username,userId,avatar} = useContext(UserContext)


    const time = new Date()
    const timer = time.setSeconds(time.getSeconds() + 3);
    const {restart,pause} = useTimer({ timer, onExpire: () => {
        socket.emit('send_typing_off',{username,chat})
    } })

    useEffect(()=>{
        if(!typing[chat]) return setType('')
        
        if(typing[chat].length<=0){
            setType('')
        }
        else if(typing[chat].length===1){
            setType(`${typing[chat][0]} кастует...`);
        }
        else if(typing[chat].length===2){
            setType(`${typing[chat][0]} и ${typing[chat][1]} кастуют...`);
        }
        else if(typing[chat].length===3){
            setType(`${typing[chat][0]}, ${typing[chat][1]} и ${typing[chat][2]} кастуют...`);
        }
        else{
            setType(`Кастуется мегазаклинание...`);
        }
    },[typing,chat])

    const keyUpHandler = (e) => {
        if(load) return

        if(e.key==="Enter") return;
        socket.emit('send_typing_on',{username,chat})
        const time = new Date()
        const timer = time.setSeconds(time.getSeconds() + 3);
        restart(timer)

    }

    const keyDownHandler = (e) =>{
        if(!(e.key==="Enter" && e.shiftKey)){
            if(e.key==="Enter"){
                e.preventDefault()
                if(load) return
                sendMessage(inputText)
            }
        }
    }

    const sendButtonHandler = (e)=>{
        e.preventDefault()
        sendMessage(inputText)
    }

    const sendMessage = (text) => {
        pause()
        socket.emit('send_typing_off',{username,chat})
        if(!text) return 
        setInputText('')
        socket.emit('send_message',{text,username,userId,avatar,chat})
    }

    const scrollDownHandler = () =>{
        const thread = document.getElementById("msgs")
        thread.scrollTo({
            top:thread.scrollHeight,
            behavior: "smooth"
        })
    }

    return (
        <div>
            <div className="scrollContainer">
                <Animated animationIn="bounceIn" animationOut="zoomOutDown" animationOutDuration={400} animationInDuration={400} isVisible={visibleButton} animateOnMount={false}>
                <button id="scrollBottom" onClick={scrollDownHandler}>
                    <IconContext.Provider value={{ color: "white", size:"26px" }}>
                        <IoIosArrowDown/> 
                    </IconContext.Provider> 
                </button>
                </Animated>
            </div>
            
            <div className="typing-user animated infinite pulse">
                    <span>{type}</span> 
            </div>
            <div className="message-input">
                
                    <form 
                        onSubmit={ (e)=>{ e.preventDefault() } }
                        className="message-form">

                        <textarea 
                            id = "message"
                            autoFocus = {true}
                            type = "text"
                            className = "form-control"
                            value = { inputText }
                            autoComplete = 'off'
                            placeholder = "Напиши что-то интересное"
                            onChange = {
                                ({target})=>{
                                	setInputText(target.value)
                                }
                            }
                            onKeyDown={keyDownHandler}
                            onKeyUp={keyUpHandler}
                            />
                        <button
                            disabled = {load} 
                            type = "submit"
                            className = "send"
                            onClick={sendButtonHandler}
                        > ➤ </button>
                    </form>

            </div>
        </div>

    )
}
