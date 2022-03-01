import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FavouritesItem from '../FavouritesItem'
import ListPageBtn from '../UI/ListPageBtn'
import NavListBtn from '../UI/NavListBtn'

export default function Favourites() {
    const [pages, setPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState([])
    const [itemsOnPage] = useState(10)
    
    const dispatch = useDispatch()
    const favourites = useSelector(state=>state.favourites.favourites)

    function removeFavourites(id) {
        dispatch({type: 'REMOVE_FAVOURITES', payload: id})
    }

    let lastPage = currentPage * itemsOnPage /* текущая страница * на кол-во показов на странице */
    let firstPage = lastPage - itemsOnPage /* ласт пейдж - кол-во показов */
    let favouritesItemsOnPage = favourites.slice(firstPage, lastPage)
    
    useEffect(() => {
        setPages(Math.ceil(favourites.length / itemsOnPage))
    }, [favourites])

    useEffect(() => {
        getPages()
    }, [pages])

    function getPages(){
        let pageArr = []
        for(let i=0; i < pages; i++) {
            pageArr.push(i + 1)
        }
        setTotalPages(pageArr)
    }

    const paginate = number =>{
        setCurrentPage(number)
    }
    
    const heart = <svg className='favourites__heart svg' width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 8.86222C22 10.4087 21.4062 11.8941 20.3458 12.9929C17.9049 15.523 15.5374 18.1613 13.0053 20.5997C12.4249 21.1505 11.5042 21.1304 10.9488 20.5547L3.65376 12.9929C1.44875 10.7072 1.44875 7.01723 3.65376 4.73157C5.88044 2.42345 9.50794 2.42345 11.7346 4.73157L11.9998 5.00642L12.2648 4.73173C13.3324 3.6245 14.7864 3 16.3053 3C17.8242 3 19.2781 3.62444 20.3458 4.73157C21.4063 5.83045 22 7.31577 22 8.86222Z"/>
    </svg>
    return (
        <div className='container'>
            {favourites.length === 0 
            ?   <div className="favourites-header">
                    <h2 className='favourites__title'>В избранном сейчас пусто</h2>
                    <p className='favourites__subtitle'>Вероятней всего, вы не добавили ещё любимое произведение</p>
                    <p className='favourites__subtitle'>Для того, чтобы что-то сохранить в избранном, нажмите на {heart}</p>
                </div>
            : <div className="favourites-title">
                <h2 className='favourites__text'>Избранное</h2>
                <NavListBtn
                url={`/favourites`}
                func={paginate}
                currentPage={currentPage}
                totalPage={pages}
            />
            </div> }
            { favourites.length !== 0 ? favouritesItemsOnPage.map((item,i)=>{
                return <FavouritesItem
                key={item.id}
                currentPage={currentPage}
                id={item.id}
                ind={i} 
                nameRu={item.nameRu} 
                nameEn={item.nameOriginal} 
                year={item.year}
                src={item.src}
                genres={item.genres}
                countries={item.countries}
                funcRemove={removeFavourites}
                itemOnPage={itemsOnPage}
                classNameFavourites={`adaptive`}
                classNameFavouritesHeart={`adaptive`}
                />
            }) : null}
            <div className="page">
            {/* {totalPages.length > 0
                ?
                <>
                {currentPage > 1
                ? <ListPageBtn url={`/favourites/${totalPages[0]}`} getFunc={paginate} currentPage={totalPages[0]} key={totalPages[0]} number={totalPages[0]}/>
                : null}
                {currentPage > 2
                ? <ListPageBtn url={`/favourites/${totalPages[currentPage - 2]}`} getFunc={paginate} currentPage={totalPages[currentPage - 2]} key={totalPages[currentPage - 2]} number={totalPages[currentPage - 2]}/>
                : null}
                <ListPageBtn rl={`/favourites/${totalPages[currentPage - 1]}`} getFunc={paginate} currentPage={totalPages[currentPage - 1]} key={totalPages[currentPage - 1]} number={totalPages[currentPage - 1]}/>
                {currentPage < totalPages.length - 1
                ? <ListPageBtn url={`/favourites/${totalPages[currentPage]}`} getFunc={paginate} currentPage={totalPages[currentPage]} key={totalPages[currentPage]} number={totalPages[currentPage]}/>
                : null}
                {currentPage !== totalPages.length
                ? <ListPageBtn url={`/favourites/${totalPages.length}`} getFunc={paginate} currentPage={totalPages.length} key={totalPages.length} number={totalPages.length}/>
                : null }
                </> 
                : null} */}
                {pages ? totalPages.map(item=>{
                    return <ListPageBtn key={item} url={`/favourites/${item}`} getFunc={paginate} currentPage={item} number={item}/>
                }) : null}
            </div>
        </div>
    )
}
