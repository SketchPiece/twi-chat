import React,{useState, useContext, useEffect} from 'react'
import { Animated } from 'react-animated-css';
import { IoIosArrowDown } from "react-icons/io";
import { IconContext } from "react-icons";
import { UserContext } from '../../context/UserContext';

export default function MessageInput({visibleButton,socket,chat}) {
    const [inputText,setInputText] = useState("");
    const {username,userId} = useContext(UserContext)
    // const [scroll, setScroll] = useState(0);

    const pressHandler = (e) =>{
        // console.log()
        // console.log(e.key==="Enter" && e.shiftKey)
        if(!(e.key==="Enter" && e.shiftKey)){
            if(e.key==="Enter"){
                e.preventDefault()
                sendMessage(inputText)
                // sendMessage(inputText)
                // console.log("nonshift")
            }
        } 
    }

    const sendButtonHandler = (e)=>{
        e.preventDefault()
        sendMessage(inputText)
    }

    const sendMessage = (text) => {
        // console.log(text)
        setInputText('')
        socket.emit('send_message',{text,username,userId,chat})
        console.log('send')
    }

    const scrollDownHandler = () =>{
        const thread = document.getElementById("msgs")
        thread.scrollTo({
            top:thread.scrollHeight,
            behavior: "smooth"
        })
        // setVisibleButton(false)
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
            
            {/* </Animated> */}
            
            <div className="typing-user animated infinite pulse">
                    {/* <span>{'Sketch кастует...'}</span>  */}
            </div>
            <div className="message-input">
                
                    <form 
                        onSubmit={ (e)=>{ e.preventDefault() } }
                        className="message-form">

                        <textarea 
                            id = "message"
                            autoFocus = {true}
                            // ref = {"messageinput"}
                            type = "text"
                            className = "form-control"
                            value = { inputText }
                            autoComplete = 'off'
                            placeholder = "Напиши что то интересное"
                            // onKeyUp = { e => { e.keyCode !== 13 && this.sendTyping() } }
                            onChange = {
                                ({target})=>{
                                	setInputText(target.value)
                                }
                            }
                            onKeyPress={pressHandler}
                            />
                        <button
                            // disabled = {false} 
                            // { message.length < 1 }
                            type = "submit"
                            className = "send"
                            onClick={sendButtonHandler}
                        > ➤ </button>
                    </form>

            </div>
        </div>

    )
}
