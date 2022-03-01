import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import AddFavourites from './AddFavourites/AddFavourites'

export default function ListItem(props) {
    const [favourites, setFavourites] = useState(false)
    return (
        <>
        <hr className='list-item__hr' />
            <div className='list-item'>
                <Link className='list-item__link-img' to={`/post/${props.id}`}>
                    <img className='list-item__img' src={props.src} alt="" />
                </Link>
                <div className="list-item-content">
                    <p className='list-item__number'>{props.currentPage > 1 ? (props.ind + 1) + ((props.currentPage * 20) - 20) : props.ind + 1}</p>
                    <div className="list-item-wrapper">
                    <Link to={`/post/${props.id}`}>
                        <div className="list-item-info">
                            {props.nameRu !== undefined ? <p className='list-item__title'>{props.nameRu}</p> : null}
                            {props.nameEn !== undefined ? <p className='list-item__text'>{props.nameEn === null ? null : props.nameEn + ','} <span>{props.year}</span></p> : null}
                            <p className='list-item__desctext'>{props.countries.map(item=><span className='list-item__subtext' key={item.country}>{item.country}</span>)}</p>
                            <p className='list-item__desctext'>{props.genres.map(item=><span className='list-item__subtext' key={item.genre}>{item.genre}</span>)}</p>
                        </div>
                    </Link>
                    </div>
                    <div className="list-item-favourites">
                        <AddFavourites 
                            nameRu={props.nameRu}
                            nameOriginal={props.nameEn}
                            src={props.src}
                            year={props.year} 
                            id={props.id}
                            genres={props.genres}
                            countries={props.countries}
                            currentPage={props.currentPage}
                            ind={props.ind}
                            active={true}
                            className={'mobile'}
                        />
                    </div>
                </div>
            </div>
        
        </>
    )
}
