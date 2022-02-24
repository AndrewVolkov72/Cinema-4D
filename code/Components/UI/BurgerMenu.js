import React from 'react'

export default function BurgerMenu(props) {
    return (
        <div onClick={props.func} className={props.className}>
            <span className='burger__line'></span>
        </div>
    )
}
