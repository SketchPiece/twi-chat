import React from 'react'
import {Link} from 'react-router-dom'
import { getAvatarUrl } from '../scripts/extra'

export default function Friend({username,userId,avatar}) {
    return (
        <div className="friend-container">
            <div>
                <Link to={`/profile/${userId}`}>
                    {/* Пофиксить гифки аватарок!! */}
                    <img className="avatar" src={getAvatarUrl(avatar,65)} alt="friend-avatar"/>
                </Link>
            </div>
            <div className="username">{username}</div>
        </div>
    )
}
