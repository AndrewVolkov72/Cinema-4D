import React from 'react'
import { NavLink } from 'react-router-dom'

export default function ListPageBtn(props) {
    return (
        <NavLink className='page__number' to={props.url} onClick={()=>props.getFunc(props.currentPage)}>
            {props.number}
        </NavLink>
    )
}
