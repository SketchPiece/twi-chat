import React, { useState } from 'react'
import {Animated} from "react-animated-css";
import { randomAnimation } from '../scripts/extra'
import { Link } from 'react-router-dom'
import '../styles/Login.css'

export default function Login() {
    const [form, setForm] = useState({
        username:"",password:""
    })
    const changeHandler = e =>{

        setForm({ ...form,[e.target.name]: e.target.value })
    }

    const loginHandler = (e)=>{
        e.preventDefault()
        console.log(form)
    }

    return (
        <form className="fullheight">  
            <Animated animationIn={randomAnimation()} isVisible={true}> 
                <div className="auth-container">
                    <div className="wrapper">
                    <h2>TwiChat v0.8</h2>
                    {/* <img width="200px" src="http://pngimg.com/uploads/hedgehog/hedgehog_PNG11.png" alt="ежиг"/> */}

                    <div className="left">
                    <label htmlFor="username">Логин</label>
                    </div>
                    <input 
                    autoComplete="login" 
                    id="username" 
                    name="username"
                    placeholder="Введите ник" 
                    type="text"
                    value={form.username}
                    onChange={changeHandler}
                    />
                    <div className="left">
                    <label htmlFor="password">Пароль</label>
                    </div>
                    <input 
                    autoComplete="password" 
                    id="password" 
                    name="password"
                    placeholder="Введите пароль" 
                    type="password"
                    value={form.password}
                    onChange={changeHandler}
                    />
                    <button onClick={loginHandler}>Войти</button>
                    <Link to='/register'>Еще не зарегистрированы?</Link>
                    </div>
                </div>            
                    
            </Animated>

        </form>      
    )
}
