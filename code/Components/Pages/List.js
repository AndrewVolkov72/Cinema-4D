import React, {useState, useEffect} from 'react'
import ListItem from '../ListItem'
import ListPageBtn from '../UI/ListPageBtn'
import {  useSelector } from 'react-redux'
import Loader from '../UI/Loader/Loader'
import NavListBtn from '../UI/NavListBtn'

export default function List() {
    const filters = useSelector(state=>state.filters.filters)
    const filtersData = filters[0]

    const [genres, setGenres] = useState([])

    async function getGenresAndCountries() {
        const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/filters`, {
            method: 'GET',
            headers: {
                'X-API-KEY': '2e8d2cf9-d0ab-4ed6-a24a-677f5f8b873f',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            },
        })
        const arrays = await response.json()
        console.log(arrays)
        setGenres([arrays.genres])
        setCurrentPage(filtersData.page)
    }
    useEffect(()=>{
        getGenresAndCountries()
    },[])
    
    const [filmsList, setFilmsList] = useState([])
    const [pages, setPages] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [filmsLoading, setFilmsLoading] = useState(false)
    const [title, setTitle] = useState("")

    async function getFilters(page) {
        setLoading(true)
        const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-filters?genre=${filtersData.genre}&type=${filtersData.type.replace(/"/g)}&ratingFrom=${filtersData.ratingFrom}&ratingTo=${filtersData.ratingTo}&yearFrom=${filtersData.yearFrom}&yearTo=${filtersData.yearTo}&page=${page}`, {
            method: 'GET',
            headers: {
                'X-API-KEY': '2e8d2cf9-d0ab-4ed6-a24a-677f5f8b873f',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            },
        })
        const arrays = await response.json()
        console.log(arrays)
        setFilmsList([arrays])
        setFilmsLoading(true)
        setLoading(false)
    }
    useEffect(()=>{
        getFilters(currentPage)
    },[filmsLoading === true])

    useEffect(()=>{
        if(genres[0]){
            getTitleGenres()
        }
    },[genres])
    function getTitleGenres() {
        let genresName = genres[0].filter((item)=>item.id === filtersData.genre)
        setTitle(genresName[0].genre)
    }

    useEffect(() => {
        setTotalPage( filmsList[0] ? filmsList[0].pagesCount : totalPage)
    }, [filmsList[0]])

    useEffect(() => {
        getPages()
    }, [totalPage])

    function getPages(){
        let pageArr = []
        for(let i=0; i < totalPage; i++) {
            pageArr.push(i + 1)
        }
        setPages(pageArr)
    }

    const paginate = number =>{
        setCurrentPage(number)
        getFilters(number)
    }
    return (
        <div>
            {loading 
            ? <Loader/> 
            : <div className='container'>
                <div className="list-nav">
                    {filmsList.length > 0 ? <h2 className='list__title'>По запросу "{title}"  { filmsList[0].films.length === 0 ? 'ничего не найдено' : 'найдено'} :</h2> : null}
                    {totalPage > 1 ? <NavListBtn
                        url={`/list`}
                        func={paginate}
                        currentPage={currentPage}
                        totalPage={totalPage}
                    /> : null}
                </div>
                {filmsList.length > 0 ? filmsList[0].films.map((item,i)=>{
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
                    currentPage={currentPage}/>
                }) : null}
                <div className="page">
                {/* {pages.length > 8
                ?
                <>
                {currentPage > 1
                ? <ListPageBtn url={`/list/${pages[0]}`} getFunc={paginate} currentPage={pages[0]} key={pages[0]} number={pages[0]}/>
                : null}
                {currentPage > 2
                ? <ListPageBtn url={`/list/${pages[currentPage - 2]}`} getFunc={paginate} currentPage={pages[currentPage - 2]} key={pages[currentPage - 2]} number={pages[currentPage - 2]}/>
                : null}
                <ListPageBtn url={`/list/${pages[currentPage - 1]}`} getFunc={paginate} currentPage={pages[currentPage - 1]} key={pages[currentPage - 1]} number={pages[currentPage - 1]}/>
                {currentPage < pages.length - 1
                ? <ListPageBtn url={`/list/${pages[currentPage]}`} getFunc={paginate} currentPage={pages[currentPage]} key={pages[currentPage]} number={pages[currentPage]}/>
                : null}
                {currentPage !== pages.length
                ? <ListPageBtn url={`/list/${pages.length}`} getFunc={paginate} currentPage={pages.length} key={pages.length} number={pages.length}/>
                : null }
                </> 
                : pages.map(item=>{
                    return <ListPageBtn url={`/list/${item}`} getFunc={paginate} currentPage={item} key={item} number={item}/>
                })} */}
                    {pages !== [] ? pages.map(item=>{
                        return <ListPageBtn url={`/list/${item}`} currentPage={item} getFunc={paginate} key={item} number={item}/>
                    }) : null}
                </div>
            </div>}
        </div>
    )
}