import React, {useState, useEffect} from 'react'
import ListItem from '../ListItem'
import ListPageBtn from '../UI/ListPageBtn'
import Loader from '../UI/Loader/Loader'
import NavListBtn from '../UI/NavListBtn'

export default function Top250() {
    const [loading, setLoading] = useState(false)
    const [films, setFilms] = useState([])
    const [page, setPage] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    
    async function getBestFilm( currentPage) {
        setLoading(true)
        const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${currentPage}`, {
            method: 'GET',
            headers: {
                'X-API-KEY': '2e8d2cf9-d0ab-4ed6-a24a-677f5f8b873f',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            },
        })
        const film = await response.json()
        console.log(film)
        setFilms([film])
        setCurrentPage(currentPage)
        setLoading(false)
    }

    useEffect(() => {
        getBestFilm( currentPage)
    }, [currentPage])

    useEffect(() => {
        setTotalPage(Math.ceil(films[0] ? films[0].pagesCount : null))
    }, [films])

    useEffect(() => {
        getPages()
    }, [totalPage])

    function getPages(){
        let pageArr = []
        for(let i=0; i < totalPage; i++) {
            pageArr.push(i + 1)
        }
        setPage(pageArr)
    }

    const trophy = <svg className='top__trophy svg' strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.74534 4H17.3132C17.3132 4 16.4326 17.2571 12.0293 17.2571C9.87826 17.2571 8.56786 14.0935 7.79011 10.8571C6.97574 7.46844 6.74534 4 6.74534 4Z"/>
    <path d="M17.3132 4C17.3132 4 18.2344 3.01733 19 2.99999C20.5 2.96603 20.7773 4 20.7773 4C21.0709 4.60953 21.3057 6.19429 19.8967 7.65715C18.4876 9.12 16.9103 10.4 16.2684 10.8571"/>
    <path d="M6.74527 4.00001C6.74527 4.00001 5.78547 3.00614 4.99995 3.00001C3.49995 2.9883 3.22264 4.00001 3.22264 4.00001C2.92908 4.60953 2.69424 6.19429 4.1033 7.65715C5.51235 9.12001 7.14823 10.4 7.79004 10.8572"/>
    <path d="M8.50662 20C8.50662 18.1714 12.0292 17.2571 12.0292 17.2571C12.0292 17.2571 15.5519 18.1714 15.5519 20H8.50662Z"/>
    </svg>

    const paginate = number =>{
        setCurrentPage(number)
    }
    return (
        <>
        {loading === true
        ? <Loader/> 
        : <div className='list container'>
            <div className="list-title">
            <h2 className='list__title'>Топ 250 фильмов по версии Кинопоиска {trophy}</h2>
            <NavListBtn
                url={`/top250`}
                func={paginate}
                currentPage={currentPage}
                totalPage={totalPage}
            />
            </div>
            {films[0] ? films[0].films.map((item,i)=>{
                return <ListItem 
                key={item.filmId}
                id={item.filmId}
                ind={i} 
                nameRu={item.nameRu} 
                nameEn={item.nameEn} 
                year={item.year}
                src={item.posterUrl}
                genres={item.genres}
                countries={item.countries}
                currentPage={currentPage}
                />
            }) : null}
            <div className="page">
                {page.length > 0
                ?
                <div className='page-paginate'>
                {currentPage > 1
                ? <ListPageBtn getFilm={getBestFilm} url={`/top250/${page[0]}`} getFunc={getBestFilm} currentPage={page[0]} key={page[0]} number={page[0]}/>
                : null}
                {currentPage > 2
                ? <ListPageBtn getFilm={getBestFilm} url={`/top250/${page[currentPage - 2]}`} getFunc={getBestFilm} currentPage={page[currentPage - 2]} key={page[currentPage - 2]} number={page[currentPage - 2]}/>
                : null}
                <ListPageBtn getFilm={getBestFilm} url={`/top250/${page[currentPage - 1]}`} getFunc={getBestFilm} currentPage={page[currentPage - 1]} key={page[currentPage - 1]} number={page[currentPage - 1]}/>
                {currentPage < page.length - 1
                ? <ListPageBtn getFilm={getBestFilm} url={`/top250/${page[currentPage]}`} getFunc={getBestFilm} currentPage={page[currentPage]} key={page[currentPage]} number={page[currentPage]}/>
                : null}
                {currentPage !== page.length
                ? <ListPageBtn getFilm={getBestFilm} url={`/top250/${page.length}`} getFunc={getBestFilm} currentPage={page.length} key={page.length} number={page.length}/>
                : null }
                </div> 
                : null}
                <div className="page-desc">
                {page !== [] ?
                 page.map(item=>{
                    return <ListPageBtn getFilm={getBestFilm} url={`/top250/${item}`} getFunc={getBestFilm} currentPage={item} key={item} number={item}/>
                }) : null}
                </div>
            </div>
        </div>}
        </>
    )
}
