import React, { useState, useEffect, useContext } from 'react'
import './OtherProfile.css'
import TextareaAutosize from 'react-textarea-autosize';
import Friend from './Friend';
import { UserContext } from '../context/UserContext';
import useKonami from 'react-use-konami';
import { getAvatarUrl } from '../scripts/extra'
import { useParams } from 'react-router-dom'
import { useHistory,Link } from 'react-router-dom';
import {getTag} from '../scripts/extra'

export default function OtherProfile({socket,setEasterEgg,usersProfile}) {
    const {userId} = useContext(UserContext)
    const [load, setLoad] = useState(true)
    const [profStatus, setProfStatus] = useState('')
    const [avatarStatic, setAvatarStatic] = useState(getAvatarUrl(null,180))
    const [usernameProfile, setUsernameProfile] = useState('')
    const [tag, setTag] = useState('')
    const [friends, setFriends] = useState([])
    const [isFriend, setIsFriend] = useState(false)
    const history = useHistory()

    const paramUserId = useParams().id
    
    useKonami(()=>{
        if(usersProfile[paramUserId].tag === 'dev') setEasterEgg(true) 
    },{
        code: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
    })

    useEffect(() => {
        if(userId === paramUserId) return history.push('/profile')
        if(!usersProfile[paramUserId]) return
        if(!usersProfile[paramUserId].exist) return history.push('/profile')
        for(let i = 0; i < usersProfile[paramUserId].friends.length;i++){
            if(usersProfile[paramUserId].friends[i].userId===userId) setIsFriend(true)
        }
        setLoad(false)
        setUsernameProfile(usersProfile[paramUserId].username)
        setProfStatus(usersProfile[paramUserId].status)
        setAvatarStatic(getAvatarUrl(usersProfile[paramUserId].avatar,180))
        setTag(usersProfile[paramUserId].tag)
        setFriends(usersProfile[paramUserId].friends)
        
    }, [paramUserId,usersProfile,history,userId])

    useEffect(() => {
        socket.emit('get_other_user',{userId:paramUserId})
    }, [socket,paramUserId])

    const addFriendHandler = () => {
        socket.emit('add_friend',{friendId:paramUserId})
        alert("Запрос в друзья отправлен!")
    }

    const deleteFriendHandler = () =>{
        setIsFriend(false)
        socket.emit('delete_friend',{friendId:paramUserId})
        socket.emit('get_other_user',{userId:paramUserId})
    }

    return (
        <>
        <div className="other-profile-container">
            <div className="user-data">
                <div>
                    <div className="image-upload">
                        <label htmlFor="avatar-input">
                            <img src={avatarStatic} alt="avatar"/>
                        </label>
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
                        <Link to={`/direct/${paramUserId}`}>
                        <button disabled={load}>Написать</button>                        
                        </Link>
                        {
                            !isFriend ?
                            <button disabled={load} onClick={addFriendHandler}>Добавить в друзья</button>
                            :
                            <button disabled={load} onClick={deleteFriendHandler}>Удалить из друзей</button>
                        }
                    </div>
                </div>
            </div>
        </div> 
        <div className="friends-header">Друзья</div>
        <div className="friends-container" id="msgs">
            <div className="friends" id="msgsInner">
                {
                    friends.map(({username,userId,avatar},index)=>{
                        return <Friend key={index} username={username} userId={userId} avatar={avatar} />
                    })
                }
            </div>
        </div>
        <div className="friends-footer"></div>
        </>
    )
}
