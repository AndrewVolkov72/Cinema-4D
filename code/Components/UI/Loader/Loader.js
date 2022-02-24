import React from 'react'

export default function Loader() {
    const loaderSvg = <svg className='svg loader' strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2V6"/>
        <path d="M12 18V22"/>
        <path d="M22 12H18"/>
        <path d="M6 12H2"/>
        <path d="M4.92896 4.92896L7.75738 7.75738"/>
        <path d="M16.2427 16.2427L19.0711 19.0711"/>
        <path d="M19.071 4.92896L16.2426 7.75738"/>
        <path d="M7.75732 16.2427L4.9289 19.0711"/>
    </svg>
    return (
        <div className="loader-wrapper margin-top">
            <p className='home__title' >Идёт загрузка...</p>
            {loaderSvg}
        </div>
    )
}
