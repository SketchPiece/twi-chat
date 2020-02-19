import React, { useState, useContext, useEffect } from 'react'
import './Profile.css'
import TextareaAutosize from 'react-textarea-autosize';
import Friend from './Friend';
import { UserContext } from '../context/UserContext';
import useKonami from 'react-use-konami';
import { useHttp } from '../hooks/http.hook';
import { getAvatarUrl } from '../scripts/extra'
import {getTag} from '../scripts/extra'
import FriendRequest from './FriendRequest';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/sketchcorp/upload'
const CLOUDINARY_UPLOAD_PRESET = 'da9k11cr'

export default function Profile({socket,setStatus,setAvatar,setEasterEgg,friends,requests}) {
    const {username,avatar,status,tag,userId} = useContext(UserContext)
    const [profStatus, setProfStatus] = useState('')
    const [staticStatus,setStaticStatus] = useState('')
    const [avatarStatic, setAvatarStatic] = useState(getAvatarUrl('v1581959183/levng698wjc23g8d5iua.gif',180))
    const { requestFormData } = useHttp()
    // const paramUserId = useParams().id
    
    useKonami(()=>{
        // console.log("konami")
        if(tag === 'dev') setEasterEgg(true) 
    },{
        code: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
    })

    useEffect(() => {
        setProfStatus(status)
        setStaticStatus(status)
        setAvatarStatic(getAvatarUrl(avatar,180))
    }, [status,avatar])

    useEffect(() => {
        socket.emit('get_friend_requests')
        socket.emit('get_friends')

    }, [socket,userId])

    const requestHandler = (userId,isAccept)=>{
        socket.emit('request_handler',{userId,accept:isAccept})
    }

    const pressHandler = (e) =>{
        if(e.key==="Enter") {
            setStaticStatus(e.target.value)
            setStatus(e.target.value)
            socket.emit('update_status',{status:e.target.value})
            e.target.blur()
        }
    }

    const imageHandler = async e =>{
        let file = e.target.files[0]
        let formData = new FormData()
        formData.append('file',file)
        formData.append('upload_preset',CLOUDINARY_UPLOAD_PRESET)
        setAvatarStatic(getAvatarUrl('v1581959183/levng698wjc23g8d5iua.gif',180))
        try{
            const {data} = await requestFormData(CLOUDINARY_URL, 'POST', formData)
            let imageId = `v${data.version}/${data.public_id}.${data.format}`
            setAvatarStatic(getAvatarUrl(imageId,180))
            socket.emit('update_avatar',{avatar:imageId})
            setAvatar(imageId)
            if(avatar === "v1581973009/w1xcn5v6tl80hw72lpts.png") return
            socket.emit('delete_avatar',{avatar})
        } catch(e){
            console.log(e)
            alert("Ойййй... Что-то пошло не так при загрузке аватарки. Пожалуйста, нажмите Ctrl+Shift+I и сделайте скриншот консоли. Спасибо ^^ -Скетч")
            setAvatarStatic(getAvatarUrl(avatar,180))
        }
    }

    return (
        <>
        <div className="profile-container">
            <div className="user-data">
                <div>
                    <div className="image-upload">
                        <label htmlFor="avatar-input">
                            <div className="cover">Загрузить</div>
                            <img src={avatarStatic} alt="avatar"/>
                        </label>
                        <input onChange={imageHandler} id="avatar-input" type="file" accept="image/*" />
                    </div>
                </div>
                <div className="data-wrapper">
                <div className="username">{username} {getTag(tag)}</div>
                        <TextareaAutosize
                        maxLength="190"
                        
                        className="status" 
                        type="text" 
                        value={profStatus} 
                        onChange={({target})=>{
                            setProfStatus(target.value)
                        }}
                        onBlur={({target})=>{
                            target.value = staticStatus
                        }}
                        onKeyPress={pressHandler}
                        />
                </div>
            </div>
            <div className="requests-container">
                {
                    requests.map(({username,userId})=>{
                        return <FriendRequest username={username} userId={userId} requestHandler={requestHandler} />
                    })
                }
            </div>
        </div> 
        <div className="friends-header">Друзья</div>
        <div className="friends-container" id="msgs">
            <div className="friends" id="msgsInner">
                {
                    friends.map(({username,userId,avatar})=>{
                        return <Friend username={username} userId={userId} avatar={avatar} />
                    })
                }
            </div>
        </div>
        <div className="friends-footer"></div>
        </>
    )
}
