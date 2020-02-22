import React from 'react'
import './Loader.css'

export default function Loader({loader}) {
    if(loader === 'main') return (
        <div className="loader-container">
            {/* Loading... */}
            <div className="loadingio-spinner-dual-ball-1bcrbgm9zs1"><div className="ldio-ws5kmlhv8h"><div></div><div></div><div></div></div></div>
        </div>
    )
    if(loader === 'messages') return (
        <div className="loader-container">
        <div className="loadingio-spinner-ripple-93sai1jh985"><div className="ldio-bn935j38u6"><div></div><div></div></div></div>
        </div>
    )
    if(loader === 'msgload') return(
        <div class="loadingio-spinner-ellipsis-ls8rjpa7b19"><div class="ldio-xetx4216ci"><div></div><div></div><div></div><div></div><div></div></div></div>
    )
    return(
        <div></div>
    )
}
