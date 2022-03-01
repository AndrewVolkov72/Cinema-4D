import React, {useState} from 'react'

export default function FilterSelect(props) {

    const [open, setOpen] = useState(false)

    const arrowDown = <svg className='svg' width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 9L12 15L18 9"/>
    </svg>
    
    function visible(name) {
        setOpen(!open)
    }

    function selectVisible(name, value) {
        props.setSelectTitle(name)
        props.changeCategoryMax(value, props.setFunc)
        setOpen(!open)
    }

    return (
        <div className='filter-select'>
            <div onClick={visible} className="filter-head">
                <p className='filter-select__title'>{props.title}</p>
                {arrowDown}
            </div>
            {open === true ? <div className="filter-select-options" >
                {props.array ? props.array.map(item=>{
                    return <div onClick={()=>selectVisible(item.genre, item.id)} key={item.id} className="filter-select-option">
                                <p className='filter-select__option-text'>{item.genre}</p>
                            </div>
                }) : null}
            </div> : null}
        </div>
    )
}
