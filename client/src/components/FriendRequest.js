import React from 'react'

export default function FriendRequest({username,userId,requestHandler}) {
    const acceptHandler = () =>{
        requestHandler(userId,true)
    }

    const rejectHandler = () =>{
        requestHandler(userId,false)
    }

    return (
        <div className="request">
            <span>Пользователь {username} хочет добавить вас в друзья</span>
            <div className="buttons">
                <button onClick={acceptHandler} className="accept">Подтвердить</button>
                <button onClick={rejectHandler} className="cansel">Отклонить</button>
            </div>
        </div>
    )
}
