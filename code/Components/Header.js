import React, {useState} from 'react'
import { NavLink, Link } from 'react-router-dom'
import Search from './UI/SearchInput'
import BurgerMenu from './UI/BurgerMenu'

export default function Header() {
    const [active, setActive] = useState(false)
    const open = () => {
        setActive(!active)
        document.body.classList.toggle('active')
    }
    const heart = <svg className='header__heart svg' width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 8.86222C22 10.4087 21.4062 11.8941 20.3458 12.9929C17.9049 15.523 15.5374 18.1613 13.0053 20.5997C12.4249 21.1505 11.5042 21.1304 10.9488 20.5547L3.65376 12.9929C1.44875 10.7072 1.44875 7.01723 3.65376 4.73157C5.88044 2.42345 9.50794 2.42345 11.7346 4.73157L11.9998 5.00642L12.2648 4.73173C13.3324 3.6245 14.7864 3 16.3053 3C17.8242 3 19.2781 3.62444 20.3458 4.73157C21.4063 5.83045 22 7.31577 22 8.86222Z"/>
    </svg>
    return (
        <header className="header">
            <Link className="logo" to="/">
                <svg className='header__logo svg' strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 14C8.10457 14 9 13.1046 9 12C9 10.8954 8.10457 10 7 10C5.89543 10 5 10.8954 5 12C5 13.1046 5.89543 14 7 14Z" />
                    <path d="M17 14C18.1046 14 19 13.1046 19 12C19 10.8954 18.1046 10 17 10C15.8954 10 15 10.8954 15 12C15 13.1046 15.8954 14 17 14Z" />
                    <path d="M12 9C13.1046 9 14 8.10457 14 7C14 5.89543 13.1046 5 12 5C10.8954 5 10 5.89543 10 7C10 8.10457 10.8954 9 12 9Z" />
                    <path d="M12 19C13.1046 19 14 18.1046 14 17C14 15.8954 13.1046 15 12 15C10.8954 15 10 15.8954 10 17C10 18.1046 10.8954 19 12 19Z" />
                    <path d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12ZM2 12V22" />
                </svg>
                CINEMA 4D
            </Link>
            <div className="header-catalog">
                <NavLink className='header__link' to='/top250/1'>250 лучших фильмов</NavLink>
                <NavLink className='header__link link--flex' to='/favourites/1'>{heart} Избранное</NavLink>
                <NavLink className='header__link' to='/about'>О сайте</NavLink>
                <Search placeholder={'Введите название фильма, сериала'}/>
            </div>
            <Search className={'adaptive'} placeholder={'Введите название фильма, сериала'}/>
            <BurgerMenu className={active === false ? "burger" : 'burger active'} func={open}/>
            <div className={active === false ? "burger-menu" : 'burger-menu active'} onClick={open}>
                <div className="burger-menu-content" onClick={e=>e.stopPropagation()}>
                    <div className="burger-menu-link">
                        <Search open={open} className={'mobile'} placeholder={'Введите название'}/>
                    </div>
                    <div className="burger-menu-link">
                        <NavLink onClick={open} className='header__link' to='/'>Главная</NavLink>
                    </div>
                    <div className="burger-menu-link">
                        <NavLink onClick={open} className='header__link' to='/top250/1'>250 лучших фильмов</NavLink>
                    </div>
                    <div className="burger-menu-link">
                        <NavLink onClick={open} className='header__link' to='/favourites/1'>{heart} Избранное</NavLink>
                    </div>
                    <div className="burger-menu-link">
                        <NavLink onClick={open} className='header__link' to='/about'>О сайте</NavLink>
                    </div>
                    <div className="burger-menu-social">
                        <p>Разработал Волков Андрей</p>
                        <div className="burger-menu-social-wrapper">
                            <a className='footer__headhunter' href="https://tyumen.hh.ru/resume/ce1a7d41ff08233a6e0039ed1f49424c694e38" target="_blank">
                                hh
                            </a>
                            <a className='footer__git-link' href='https://github.com/AndrewVolkov72' target="_blank">
                                <svg className='footer__github svg' strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                                    <path d="M14.3333 19V17.137C14.3583 16.8275 14.3154 16.5163 14.2073 16.2242C14.0993 15.9321 13.9286 15.6657 13.7067 15.4428C15.8 15.2156 18 14.4431 18 10.8989C17.9998 9.99256 17.6418 9.12101 17 8.46461C17.3039 7.67171 17.2824 6.79528 16.94 6.01739C16.94 6.01739 16.1533 5.7902 14.3333 6.97811C12.8053 6.57488 11.1947 6.57488 9.66666 6.97811C7.84666 5.7902 7.05999 6.01739 7.05999 6.01739C6.71757 6.79528 6.69609 7.67171 6.99999 8.46461C6.35341 9.12588 5.99501 10.0053 5.99999 10.9183C5.99999 14.4366 8.19999 15.2091 10.2933 15.4622C10.074 15.6829 9.90483 15.9461 9.79686 16.2347C9.68889 16.5232 9.64453 16.8306 9.66666 17.137V19" />
                                    <path d="M9.66667 17.7018C7.66667 18.3335 6 17.7018 5 15.7544"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
