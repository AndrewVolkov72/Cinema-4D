import React from 'react'
import { Link } from 'react-router-dom'
import Heart from './AddFavourites/Heart'

export default function FavouritesItem(props) {
    return (
        <>
        <hr className='list-item__hr' />
            <div className='list-item'>
                <Link className='list-item__link-img' to={`/post/${props.id}`}>
                    <img className='list-item__img' src={props.src} alt="" />
                </Link>
                <div className="list-item-content">
                    <p className='list-item__number'>{props.currentPage > 1 ? (props.ind + 1) + ((props.currentPage * props.itemOnPage) - props.itemOnPage) : props.ind + 1}</p>
                    <div className="list-item-wrapper">
                    <Link to={`/post/${props.id}`}>
                        <div className="list-item-info">
                            { props.nameRu !== undefined ? <p className='list-item__title'>{props.nameRu}</p> : null}
                           {  props.nameEn !== undefined ? <p className='list-item__text'>{props.nameEn === null ? null : props.nameEn + ','} <span>{props.year}</span></p> : null}
                            <p className='list-item__desctext'>{props.countries.map(item=><span className='list-item__subtext' key={item.country}>{item.country}</span>)}</p>
                            <p className='list-item__desctext'>{props.genres.map(item=><span className='list-item__subtext' key={item.genre}>{item.genre}</span>)}</p>
                        </div>
                    </Link>
                    </div>
                    <div className="list-item-favourites">
                        <div className="add-favourites">
                            <Heart func={()=>props.funcRemove(props.id)} active={`active ${props.classNameFavouritesHeart}`}/>
                            <p className={`add-favourites__text ${props.classNameFavourites}`} onClick={()=>props.funcRemove(props.id)}>Убрать из избранного</p>
                        </div>
                    </div>
                </div>
            </div>
        
        </>
    )
}