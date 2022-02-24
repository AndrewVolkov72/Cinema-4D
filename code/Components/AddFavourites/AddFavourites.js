import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Heart from './Heart'

export default function AddFavourites(props) {
    const [active, setActive] = useState(false)

    const dispatch = useDispatch()
    const favourites = useSelector(state=>state.favourites.favourites)

    // localStorage.setItem('favourites', JSON.stringify(favourites))

    function getFavourites(nameRu, nameOriginal, src, year, id, genres, countries, currentPage, ind) {
        const favouritesItem = {
            nameRu: nameRu,
            nameOriginal: nameOriginal,
            id: id,
            src: src,
            year: year,
            genres: genres,
            countries: countries,
            currentPage:currentPage,
            ind:ind
        }
        dispatch({type: 'ADD_FAVOURITES', payload: favouritesItem})
        // localStorage.setItem('favourites', JSON.stringify(favourites))
        setActive(true)
    }
    
    function removeFavourites(id) {
        dispatch({type: 'REMOVE_FAVOURITES', payload: id})
        setActive(false)
    }

    return (
        <div className={`add-favourites ${props.className}`}>
            { active === false
             ? <Heart func={()=>getFavourites(props.nameRu, props.nameOriginal, props.src, props.year, props.id, props.genres, props.countries, props.currentPage, props.ind)}/>
            : <Heart func={()=>removeFavourites(props.id)} active='active'/>}
            {active === false
             ? <p onClick={()=>getFavourites(props.nameRu, props.nameOriginal, props.src, props.year, props.id, props.genres, props.countries, props.currentPage, props.ind)} className='add-favourites__text'>Добавить в избранное </p> 
            : <p onClick={()=>removeFavourites(props.id)} className='add-favourites__text'>Убрать из избранного</p>}
        </div>
    )
}
