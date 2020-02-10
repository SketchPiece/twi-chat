import React, { useState } from 'react'
import {Animated} from "react-animated-css";
import '../styles/Login.css'
import '../styles/animate.css'

const animations = ['bounceIn','bounceInLeft','bounceInRight','bounceInUp','flipInX','flipInY','lightSpeedIn']

function getRandom(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

const randomAnimation = () => {
    return animations[getRandom(0,animations.length-1)]
}

export default function Login() {//animated bounceInDown
    const [visible, setVisible] = useState(true)
    const clickHandler = e =>{
        e.preventDefault()
        // console.log('click')
        setVisible(!visible)
    }

    return (
        <form className="fullheight">  
            <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={visible}> 
                <div className="auth-container">
                    <h2>TwiChat v0.8</h2>
                    <input placeholder="Введите ник" type="text"/>
                    <input placeholder="Ввудите пароль" type="password"/>
                        <button onClick={clickHandler} >Войти</button>
                    <a href="#">Еще не зарегистрированы?</a>
                </div>            
                    
            </Animated>

        </form>
        
    )
}
