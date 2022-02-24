import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router'

export default function Search(props) {

    const [keyword, setKeyword] = useState('')
   
    let navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()
        navigate(`/search/${keyword}/1`, { replace: true });
        setKeyword('')
        if(props.open) {
            return props.open()
        }
    }
    
    function onKeyDown(event) {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
            handleSubmit(event)
        }
    }
    return (
        <div className={`header-input ${props.className}`}>
            <button onClick={ keyword === '' ? null : handleSubmit} className='header-input__btn'>
                <svg className='header__search' strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.5 15.5L19 19" />
                    <path d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z" />
                </svg>
            </button>
            <input 
                value={keyword} 
                onChange={e=>setKeyword(e.target.value)}
                onKeyDown={keyword === '' ? null : onKeyDown}
                className='header__input' 
                type="text" 
                placeholder={props.placeholder}
            />
            {keyword !== '' ? <svg onClick={()=>setKeyword('')} className="header-input__close svg" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" />
            </svg> : null}
        </div>
    )
}
