import React,{useState} from 'react'

export default function MessageInput() {
    const [type,setType] = useState("");
    return (
        <div>
            <div className="typing-user">
                {'Sketch кастует...'}
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
                            autoComplete = {'off'}
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
