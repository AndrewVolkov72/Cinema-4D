import React,{useState, useEffect} from 'react'
import Filter from '../Filter'
import Slide from '../Slide'
import Loader from '../UI/Loader/Loader'

export default function Home() {
    const [showFilters, setShowFilters] = useState(false)

    const [films, setFilms] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [pages, setPages] = useState(1)

    const date = new Date()
    const monthArr= [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    const [years, setYears] = useState(date.getFullYear())
    const [mounth, setMounth] = useState(monthArr[date.getMonth()].replace(/"/g))
    
    async function getFilms(currentPage) {
        setLoading(true)
        const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=${years}&month=${mounth}&page=${currentPage}`, {
            method: 'GET',
            headers: {
                'X-API-KEY': '2e8d2cf9-d0ab-4ed6-a24a-677f5f8b873f',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            },
        })
        const film = await response.json()
        console.log(film)
        setTotalPage(film.total)
        setFilms([...films,film])
        setLoading(false)
    }

    useEffect(() => {
        getFilms(currentPage)
    }, [currentPage])

    useEffect(() => {
        setPages(Math.ceil(totalPage / 10))
    }, [totalPage])

    const scroll = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
    }
    return (
        <div className="container">
            <div className="home-title">
                <p className='home__title-films'>Фильмы, на любой вкус и цвет</p>
                <div className="home-btn-show">
                <button onClick={()=>setShowFilters(!showFilters)} className='home__btn-show'>{ showFilters === false ? 'показать фильтры' : 'закрыть фильтры'}</button>
                </div>
            </div>
           {showFilters === true ? <Filter/> : null}
            {loading === true 
            ? <Loader/>
            : <div className="home">
                <div className="home-content">
                    {films !== [] ? films.map(item=>{
                        return item.releases.map((film, i)=>{
                            return <Slide classImg={'home--img'} classSlide={'home--slide'} key={film.filmId + i + film.nameRu + film.nameEn} id={film.filmId} src={film.posterUrl} name={film.nameRu !== '' ? film.nameRu : film.nameEn} year={film.year}/>
                        })
                    }): null}
                </div>
                {currentPage !== pages
                ? <div className="home-btn-group">
                    <hr className='list-item__hr' />
                    <button onClick={()=>setCurrentPage(currentPage < pages ? currentPage + 1 : pages)} className='home__btn-more'>Загрузить ещё</button>
                    <hr className='list-item__hr' />
                </div>
                : <div className="home-btn-group">
                    <hr className='list-item__hr' />
                    <button onClick={scroll} className='home__btn-more'>Наверх</button>
                    <hr className='list-item__hr' />
                </div>}
            </div>}
        </div>
    )
}
