import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavListBtn(props) {
    return (
        <div className="favourites-btn-group">
            <NavLink to={`${props.url}/${props.currentPage}`} onClick={()=>props.func(props.currentPage > 1 ? props.currentPage - 1 : 1)} className='favourites__btn'>Назад</NavLink>
            <NavLink to={`${props.url}/${props.currentPage}`} onClick={()=>props.func(props.currentPage < props.totalPage ? props.currentPage + 1 : props.totalPage)}className='favourites__btn'>Вперёд</NavLink>
        </div>
    )
}
