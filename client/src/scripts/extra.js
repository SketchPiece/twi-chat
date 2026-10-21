
import React from 'react'
const animations = ['bounceIn','bounceInLeft','bounceInRight','bounceInUp']

function getRandom(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

export const randomAnimation = () => {
    return animations[getRandom(0,animations.length-1)]
}

export const ToBottom = (delay) => {
    let container = document.getElementById('msgs')
    // if(!container) return
    if(delay) return setTimeout((container)=>{
        container.scrollTo(0, container.scrollHeight-container.offsetHeight)
    },delay,container)
    container.scrollTo(0, container.scrollHeight-container.offsetHeight)
}

export const ScrollTo = (to) => {
    let container = document.getElementById('msgs')
    // if(!container) return
    container.scrollTo(0, to)
}

// Avatars are stored on Cloudinary. Set REACT_APP_CLOUDINARY_CLOUD_NAME in client/.env
// to use it; without it every avatar falls back to the bundled default picture.
export const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME

export const getAvatarUrl = (id,scale) =>{
    if(!id) return '/images/load.gif'
    if(!CLOUDINARY_CLOUD_NAME) return '/images/default.png'
    if(scale){
        return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,h_${scale},w_${scale}/${id}`    
    }
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${id}`
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