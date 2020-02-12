import React,{useState} from 'react'
import { Animated } from 'react-animated-css';
import { IoIosArrowDown } from "react-icons/io";
import { IconContext } from "react-icons";

export default function MessageInput({visibleButton}) {
    const [type,setType] = useState("");

    // const [scroll, setScroll] = useState(0);

    const scrollDownHandler = () =>{
        const thread = document.getElementById("msgs")
        thread.scrollTo({
            top:thread.scrollHeight,
            behavior: "smooth"
        })
        // setVisibleButton(false)
    }

    // thread.addEventListener('scroll', ()=>{console.log("scroll")});

    // function updateScroll() {
    //     const thread = document.getElementById("msgs")
    //     const scrollMax = thread.scrollHeight-thread.offsetHeight
    //     setScroll(thread.scrollTop);
    //     console.log(scrollMax-scrollMax*0.10,scroll)
    //     console.log(scrollMax-scrollMax*0.10<scroll)
    //     if(scrollMax-scrollMax*0.10<scroll){
    //         console.log('set true')
    //         setVisibleButton(false)
    //     }else{
    //         console.log("set true")
    //         setVisibleButton(true) 
    //     }
    //     // console.log("Visible",visibleButton)
    //     // console.log(scrollMax-scrollMax*0.10,scrollMax*0.10,scroll)
    //     // console.log(scroll,thread.scrollHeight)
    //     // console.log(, thread.scrollTop,)
        
    // }

    // useLayoutEffect(() => {
    //     const thread = document.getElementById("msgs")
    //     const scrollMax = thread.scrollHeight-thread.offsetHeight

        
    //     thread.addEventListener('scroll', updateScroll);

    //     console.log(scrollMax-scrollMax*0.10,scroll)

    //     updateScroll();
    //     return () => thread.removeEventListener('scroll', updateScroll);
    // }, [scroll,setScroll,setVisibleButton]);

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
                            value = { type }
                            autoComplete = 'off'
                            placeholder = "Напиши что то интересное"
                            // onKeyUp = { e => { e.keyCode !== 13 && this.sendTyping() } }
                            onChange = {
                                ({target})=>{
                                	setType(target.value)
                                }
                            }
                            />
                        <button
                            disabled = {false} 
                            // { message.length < 1 }
                            type = "submit"
                            className = "send"

                        > ➤ </button>
                    </form>

            </div>
        </div>

    )
}
