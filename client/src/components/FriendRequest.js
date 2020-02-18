import React from 'react'

export default function FriendRequest() {
    return (
        <div className="request">
            <span>Пользователь Andrey хочет добавить вас в друзья</span>
            <div className="buttons">
                <button className="accept">Подтвердить</button>
                <button className="cansel">Отклонить</button>
            </div>
        </div>
    )
}
