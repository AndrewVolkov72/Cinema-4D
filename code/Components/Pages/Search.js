import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'
import ListItem from '../ListItem'
import ListPageBtn from '../UI/ListPageBtn'
import Loader from '../UI/Loader/Loader'
import NavListBtn from '../UI/NavListBtn'

export default function Search() {
    const [loading, setLoading] = useState(false)
    
    const {keyword} = useParams()
    const [cinema, setCinema] = useState([])
    const [page, setPage] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    
    async function getFilm( currentPage) {
        setLoading(true)
        const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${keyword}&page=${currentPage}`, {
            method: 'GET',
            headers: {
                'X-API-KEY': '2e8d2cf9-d0ab-4ed6-a24a-677f5f8b873f',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            },
        })

        const film = await response.json()
        console.log(film)
        setCinema([film])
        setCurrentPage(currentPage)
        setLoading(false)
    }

    useEffect(() => {
        getFilm(currentPage)
    }, [keyword])

    useEffect(() => {
        setTotalPage(Math.ceil(cinema[0] ? (cinema[0].searchFilmsCountResult / 20) : null))
    }, [cinema])

    useEffect(() => {
        getPages()
    }, [totalPage])

    function getPages(){
        let pageArr = []
        if(totalPage > 20) {
            setTotalPage(20)
        } 
        for(let i=0; i < totalPage; i++) {
            pageArr.push(i + 1)
        }
        setPage(pageArr)
    }

    return (
        <>
            {loading === true 
            ? <Loader/>
            :<div className='list container'>
                <div className="list-nav">
                    <h2 className='list__title'>По запросу "{keyword}" найденно: <span>{ cinema[0] ? cinema[0].searchFilmsCountResult : 0} фильмов</span></h2>
                    {totalPage > 1 ? <NavListBtn
                    url={`/search/${keyword}`}
                    func={getFilm}
                    currentPage={currentPage}
                    totalPage={totalPage}
                    /> : null}
                </div>
                {cinema[0] ? cinema[0].films.map((item,i)=>{
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
                {page.length > 8
                ?
                <div className='page-paginate'>
                {currentPage > 1
                ? <ListPageBtn getFilm={getFilm} url={`/search/${keyword}/${page[0]}`} getFunc={getFilm} currentPage={page[0]} key={page[0]} number={page[0]}/>
                : null}
                {currentPage > 2
                ? <ListPageBtn getFilm={getFilm} url={`/search/${keyword}/${page[currentPage - 2]}`} getFunc={getFilm} currentPage={page[currentPage - 2]} key={page[currentPage - 2]} number={page[currentPage - 2]}/>
                : null}
                <ListPageBtn getFilm={getFilm} url={`/search/${keyword}/${page[currentPage - 1]}`} getFunc={getFilm} currentPage={page[currentPage - 1]} key={page[currentPage - 1]} number={page[currentPage - 1]}/>
                {currentPage < page.length - 1
                ? <ListPageBtn getFilm={getFilm} url={`/search/${keyword}/${page[currentPage]}`} getFunc={getFilm} currentPage={page[currentPage]} key={page[currentPage]} number={page[currentPage]}/>
                : null}
                {currentPage !== page.length
                ? <ListPageBtn getFilm={getFilm} url={`/search/${keyword}/${page.length}`} getFunc={getFilm} currentPage={page.length} key={page.length} number={page.length}/>
                : null }
                </div> 
                : null}
                <div className="page-desc">
                {page.map(item=>{
                    return <ListPageBtn getFilm={getFilm} url={`/search/${keyword}/${item}`} getFunc={getFilm} currentPage={item} key={item} number={item}/>
                })}
                </div>
                </div>
            </div>}
        </>
    )
}
