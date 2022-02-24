import React, { useEffect, useState } from 'react'

export default function PostBigImage(props) {
    const [url, setUrl] = useState('')
    const [currentImg, setCurrentImg] = useState()

    useEffect(()=>{
        setCurrentImg(props.currentImg + 1)
    },[props.currentImg])

    useEffect(()=>{
        setUrl(props.url)
    },[props.url])

    const nextImg = ()=>{
        setUrl(props.arrayImg.items[(currentImg - 1) + 1].imageUrl)
        setCurrentImg(currentImg + 1)
    }
    const backImg = ()=>{
        setUrl(props.arrayImg.items[(currentImg - 1) - 1].imageUrl)
        setCurrentImg(currentImg - 1)
    }
    const close = <svg onClick={props.close} className="post-big-img__close" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" />
    </svg>
    return (
        <div className='post-big-img' onClick={props.close} >
            <div className="post-big-img-content" onClick={e=>e.stopPropagation()}>
                <div className="post-big-img-close">
                    {close}
                </div>
                <img className="post-big-img__img" src={url} alt="" />
                <div className="post-big-img-change">
                    <button className='post-big-img__btn' onClick={currentImg > 1 ? backImg : null}>назад</button>
                    <p className='post-big-img__current-text'><span>{currentImg}</span> из <span>{props.arrayImg.items.length}</span></p>
                    <button className='post-big-img__btn' onClick={currentImg !== props.arrayImg.items.length ? nextImg : null}>вперед</button>
                </div>
            </div>
        </div>
    )
}
