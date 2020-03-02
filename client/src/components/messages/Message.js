import React, { useState, useEffect } from 'react'
import {getAvatarUrl} from '../../scripts/extra'
import {Link} from 'react-router-dom'

export default function Message({message,me,name,avatarId,userId}) {
    const [incomeFormat, setIncomeFormat] = useState('png')
    const [hover, setHover] = useState(false)
    

    useEffect(() => {
        let format = avatarId.split('/')[1].split('.')[1]
        setIncomeFormat(format)
    }, [avatarId])
    const mouseEnterHandler = () =>{
        setHover(true)
    }
    const mouseLeaveHandler = () =>{
        setHover(false)
    }

    const generateAvatar = (avatarId) =>{
        if(incomeFormat === 'gif' && hover){
            return getAvatarUrl(avatarId,69)
        } else{
            return getAvatarUrl(`${avatarId.split('.')[0]}.png`,69)
        }
        
    }
    return (
        <div onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} className={`message-container` + (me ? ' me':' ')}>
            <div className="avatarFront">
                <Link to={(me ? `/profile`:`/profile/${userId}`)}>
                    <img src={generateAvatar(avatarId)} alt="avatar"/>
                </Link>
            </div>
            <div className="data">
                <div className="message">{message}</div>
                <div className="name">{name}</div>
            </div>
        </div>
    )
}
