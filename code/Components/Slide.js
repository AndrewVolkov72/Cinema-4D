import React from 'react'
import { Link } from 'react-router-dom'

export default function Slide(props) { 
    return (
            <div className={`slider__item ${props.classSlide}`}>
                <Link to={`/post/${props.id}`}>
                    <img className={`slider-item__img ${props.classImg}`} src={props.src} alt={props.name} />
                </Link>
                <p className='slider-item__name'>{props.name.length > 17 ? props.name.slice(0,16) + '...' : props.name}</p>
                <p className='slider-item__year'>{props.year}</p>
            </div>
    )
}
