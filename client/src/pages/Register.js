import React,{useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import { Animated } from "react-animated-css";
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
    const auth = useContext(AuthContext);

    const [form, setForm] = useState({
        username:"",password:"",repPassword:""
    })
    const [warnStatus, setWarnStatus] = useState(0)
    const [warnText, setWarnText] = useState('')
    const [inputErr, setInputErr] = useState({
        username:0,password:0,repPassword:0
    })
    const {loading,request} = useHttp()
    
    const changeHandler = e =>{
        e.target.classList.remove('input-red');
        
        setWarnStatus(0);
        setForm({ ...form,[e.target.name]: e.target.value.trim() })
    }
    const registerHandler = async e =>{
        e.preventDefault()
        setInputErr({...inputErr,username:0,password:0,repPassword:0})
        if(!form.username) {
            setWarnStatus(1)
            setWarnText("Логин обязательное поле!")
            setInputErr({...inputErr,username:1})
            return;
        }
        if(form.username.includes(' ')) {
            setWarnStatus(1)
            setWarnText("Логин не дожен содержать пробелов!")
            setInputErr({...inputErr,username:1})
            return;
        }
        if(!form.password){
            setWarnStatus(1)
            setWarnText("Пароль обязательное поле!")
            setInputErr({...inputErr,password:1})
            return;
        }
        if(form.password!==form.repPassword){
            setWarnStatus(1)
            setInputErr({...inputErr,password:1,repPassword:1})
            setWarnText("Пароли не совпадают!")
            return;
        }
        try{
            const data = await request('/api/auth/register','POST', {...form})
            auth.login(data.token,data.userId,data.username)
        }catch(e){
            console.log(e.message)
            setWarnStatus(1)
            setWarnText(e.message)
            setInputErr({...inputErr,username:1,password:1,repPassword:1})
        }
    }

    const warnClass = () => {
        switch(warnStatus){
            case 0:
                return "warn-hide"
            case 1:
                return "warning animated fadeIn"
            case 2:
                return "warning"
            default:
                return ""
        }
    }
    const warnInput = (target) => {
        switch(inputErr[target]){
            case 0:
                return ""
            case 1:
                return "animated shake fast input-red"
            case 2:
                return "input-red"
            default:
                return ""
        }
    }

    return (
        <form className="fullheight">  
            <Animated style={{height:"100%"}} animationIn="fadeIn" isVisible={true}> 
                <div className="auth-container">
                    <div className="wrapper">
                    <h2>TwiChat v0.8.1</h2>
                    <span className={warnClass()} onAnimationEnd={()=>{setWarnStatus(2)}}>{warnText}</span>
                    <div className="left">
                    <label htmlFor="username">Логин</label>
                    </div>
                    <input 
                    autoComplete="login" 
                    id="username" 
                    name="username"
                    placeholder="Введите ник" 
                    type="text"
                    onChange={changeHandler}
                    className={warnInput("username")}
                    onAnimationEnd={()=>{setInputErr({...inputErr,username:2})}}

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
                    onChange={changeHandler}
                    className={warnInput("password")}
                    onAnimationEnd={()=>{setInputErr({...inputErr,password:2})}}

                    />
                    <div className="left">
                    <label htmlFor="repPassword">Подтвердите пароль</label>
                    </div>
                    <input 
                    autoComplete="repPassword" 
                    id="repPassword" 
                    name="repPassword"
                    placeholder="Подтвердите пароль" 
                    type="password"
                    onChange={changeHandler}
                    className={warnInput("repPassword")}
                    onAnimationEnd={()=>{setInputErr({...inputErr,repPassword:2})}}
                    />
                    <button onClick={registerHandler} disabled={loading}>Зарегистрироваться</button>
                    <Link to='/login'>Уже зарегистрированы?</Link>
                    </div>
                </div>            
                    
            </Animated>

        </form>   
    )
}
