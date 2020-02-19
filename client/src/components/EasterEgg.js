import React, { useState, useEffect } from 'react'
import { useTimeout } from '../hooks/timeout.hook'

export default function EasterEgg() {
    const [start, setStart] = useState(false)
    const sound  = new Audio('/sounds/lightOff.mp3')

    useTimeout(()=>{
        setStart(true)
    },3*1000,{ persistRenders: false })

    useEffect(() => {
        sound.play()
    }, [sound])
    if(start) return (
        <div className="easter-egg">
                <video autoPlay={true} src="/videos/dark.mp4"></video>
        </div>
    )
    return (
        <div className="easter-egg">
            <div></div>
            
            
        </div>
    )
}
