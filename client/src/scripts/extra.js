
import React from 'react'
const animations = ['bounceIn','bounceInLeft','bounceInRight','bounceInUp']

function getRandom(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

export const randomAnimation = () => {
    return animations[getRandom(0,animations.length-1)]
}

export const ToBottom = () => {
    let container = document.getElementById('msgs');
    container.scrollTo(0, container.scrollHeight-container.offsetHeight);
}

export const getAvatarUrl = (id,scale) =>{
    if(!id) return '/images/load.gif'
    if(scale){
        return `https://res.cloudinary.com/sketchcorp/image/upload/c_fill,h_${scale},w_${scale}/${id}`    
    }
    return `https://res.cloudinary.com/sketchcorp/image/upload/${id}`
}

export const getTag = (tag) => {
    switch(tag){
        case 'dev':
            return <div className="tag dev">Dev</div>
        case '+':
            return <div className="tag confirmed">✔</div>
        default:
            return ''
    }
}