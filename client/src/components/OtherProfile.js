import React, { useState, useEffect, useContext } from 'react'
import './OtherProfile.css'
import TextareaAutosize from 'react-textarea-autosize';
import Friend from './Friend';
import { UserContext } from '../context/UserContext';
import useKonami from 'react-use-konami';
// import { useHttp } from '../hooks/http.hook';
import { getAvatarUrl } from '../scripts/extra'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import {getTag} from '../scripts/extra'

// const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/sketchcorp/upload'
// const CLOUDINARY_UPLOAD_PRESET = 'da9k11cr'

export default function OtherProfile({socket,setEasterEgg,usersProfile}) {
    const {userId} = useContext(UserContext)
    const [profStatus, setProfStatus] = useState('')
    // const [staticStatus,setStaticStatus] = useState('')
    const [avatarStatic, setAvatarStatic] = useState(getAvatarUrl('v1581959183/levng698wjc23g8d5iua.gif',180))
    const [usernameProfile, setUsernameProfile] = useState('')
    const [tag, setTag] = useState('')
    // const { requestFormData } = useHttp()
    const history = useHistory()

    const paramUserId = useParams().id
    
    useKonami(()=>{
        // console.log("konami")
        if(usersProfile[paramUserId].tag === 'dev') setEasterEgg(true) 
    },{
        code: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
    })

    useEffect(() => {
        // console.log(usersProfile)
        // setProfStatus(status)
        // setAvatarStatic(getAvatarUrl(avatar,180))
        if(userId === paramUserId) return history.push('/profile')
        if(!usersProfile[paramUserId]) return
        if(!usersProfile[paramUserId].exist) return history.push('/profile')
        setUsernameProfile(usersProfile[paramUserId].username)
        setProfStatus(usersProfile[paramUserId].status)
        setAvatarStatic(getAvatarUrl(usersProfile[paramUserId].avatar,180))
        setTag(usersProfile[paramUserId].tag)
    }, [paramUserId,usersProfile,history,userId])

    // const getUserById = useCallback(() =>{
        
    //     console.log(paramUserId)
    // },[socket,paramUserId])

    useEffect(() => {
        socket.emit('get_other_user',{userId:paramUserId})
    }, [socket,paramUserId])

    // useEffect(() => {
        
    //     return () => {
    //         socket.off('push_other_user')
    //     };
    // }, [socket])

    // const getAvatar = () =>{
    //     if(avatar){
    //         return avatar;
    //     }else{
    //         return '/images/load.gif'
    //     }
    // }

    // const imageHandler = async e =>{
    //     // console.log(e.target.files[0])
    //     let file = e.target.files[0]
    //     let formData = new FormData()
    //     formData.append('file',file)
    //     formData.append('upload_preset',CLOUDINARY_UPLOAD_PRESET)
    //     setAvatarStatic(getAvatarUrl('v1581959183/levng698wjc23g8d5iua.gif',180))
    //     try{
    //         const {data} = await requestFormData(CLOUDINARY_URL, 'POST', formData)
    //         //console.log(data)
    //         let imageId = `v${data.version}/${data.public_id}.${data.format}`
    //         // console.log(imageId)
    //         setAvatarStatic(getAvatarUrl(imageId,180))
    //         socket.emit('update_avatar',{avatar:imageId})
    //         if(avatar === "v1581973009/w1xcn5v6tl80hw72lpts.png") return
    //         socket.emit('delete_avatar',{avatar})

    //         setAvatar(imageId)
    //         // let data = await cloudinary.uploader.upload(file)
    //         // console.log(data)
    //     } catch(e){
    //         console.log(e)
    //         alert("Ойййй... Что-то пошло не так при загрузке аватарки. Пожалуйста, нажмите Ctrl+Shift+I и сделайте скриншот консоли. Спасибо ^^ -Скетч")
    //         setAvatarStatic(getAvatarUrl(avatar,180))
    //     }
    // }
    

    return (
        <>
        <div className="other-profile-container">
            <div className="user-data">
                <div>
                    <div className="image-upload">
                        <label htmlFor="avatar-input">
                            {/* <div className="cover">Загрузить</div> */}
                            <img src={avatarStatic} alt="avatar"/>
                        </label>
                        {/* <input onChange={imageHandler} id="avatar-input" type="file" accept="image/*" /> */}
                    </div>
                </div>
                <div className="data-wrapper">
                    <div className="username">{usernameProfile} {getTag(tag)}</div>
                    <TextareaAutosize
                    maxLength="190"
                    className="status" 
                    type="text" 
                    value={profStatus} 
                    readOnly={true}
                    />
                    <div className="buttons">
                        <button disabled={true}>Написать</button>
                        <button>Добавить в друзья</button>
                    </div>
                </div>
            </div>
        </div> 
        <div className="friends-header">Друзья</div>
        <div className="friends-container" id="msgs">
            <div className="friends" id="msgsInner">
                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>


            </div>
        </div>
        <div className="friends-footer"></div>
        </>
    )
}
