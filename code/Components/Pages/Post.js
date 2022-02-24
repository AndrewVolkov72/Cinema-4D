import React, {useState, useEffect } from 'react'
import { useParams } from 'react-router'
import Slider from '../Slider'
import PostBigImage from '../PostBigImage'
import AddFavourites from '../AddFavourites/AddFavourites'
import Loader from '../UI/Loader/Loader'


export default function Post() {
    const {id} = useParams()

    const [loading, setLoading] = useState(false)

    const [post, setPost] = useState([])
    const [similars, setSimilars] = useState([])
    const [images, setImage] = useState([])
    const [newImages, setNewImage] = useState([])
    const [quantity, setQuantity] = useState(4)

    const [hiddenFoto, setHiddenFoto] = useState(false)
    const [hiddenSimilar, setHiddenSimilar] = useState(false)

    const [getBigImg, setGetBigImg] = useState(false)
    const [getUrlBigImg, setGetUrlBigImg] = useState('')
    const [currentBigImg, setCurrentBigImg] = useState(0)

    const [trailers, setTrailers] = useState([])

    async function getMovie() {
        setLoading(true)
        const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
            method: 'GET',
            headers: {
                'X-API-KEY': '2e8d2cf9-d0ab-4ed6-a24a-677f5f8b873f',
                'Content-Type': 'application/json',
            },
        })
        const item = await response.json()
        console.log(item)
        setPost({ item})
        setLoading(false)
    }
    async function getImages() {
        const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/images`, {
            method: 'GET',
            headers: {
                'X-API-KEY': '2e8d2cf9-d0ab-4ed6-a24a-677f5f8b873f',
                'Content-Type': 'application/json',
            },
        })
        const image = await response.json()
        console.log(image)
        setImage(image)
    }
    async function getSimilars() {
        const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/similars`, {
            method: 'GET',
            headers: {
                'X-API-KEY': '2e8d2cf9-d0ab-4ed6-a24a-677f5f8b873f',
                'Content-Type': 'application/json',
            },
        })
        const similar = await response.json()
        console.log(similar)
        setSimilars([ similar])
    }
    async function getTrailer() {
        const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/videos`, {
            method: 'GET',
            headers: {
                'X-API-KEY': '2e8d2cf9-d0ab-4ed6-a24a-677f5f8b873f',
                'Content-Type': 'application/json',
            },
        })
        const trailer = await response.json()
        console.log(trailer)
        setTrailers(trailer)
    }
    
    useEffect(() => {
        getMovie()
        getImages()
        getSimilars()
        getTrailer()
        setHiddenFoto(false)
        setHiddenSimilar(false)
    }, [id])

    useEffect(() => {
        getNewImage(quantity)
        if(images.total === 0 ) {
            setHiddenFoto(true)
        } else {
            setHiddenFoto(false)
        }
    }, [images.items])

    function getNewImage(quantity) {
        if(images.items ){
            setNewImage([images.items.slice(0,quantity)])
        }
    }

    useEffect(() => {
        if(similars[0]) {
            if(similars[0].total === 0){
                setHiddenSimilar(true)
            } 
        } else {
            setHiddenSimilar(false)
        }
    }, [similars[0]])

    const showBigImage = (url,i) =>{
        setGetBigImg(true)
        setGetUrlBigImg(url)
        setCurrentBigImg(i)
    }
    const closeBigImage = () =>{
        setGetBigImg(false)
    }
    const starSvg = <svg className='star-svg svg' width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z"/>
    </svg>
    return (
        <>
        {loading === true
        ? <Loader/>
        : <div className="container">
        {post.item ? <div className="post">
                <div className="post-wrapper">
                <aside className='post-aside'>
                    <img className='post__img' src={post.item.posterUrl} alt="" />
                    <img className='post__bg-img' src={post.item.posterUrl} alt="" />
                </aside>
                <div className="post-content">
                    <div className="post-name">
                        <p className='post__name'>{ post.item.nameRu !== null ? post.item.nameRu : null} {post.item.nameRu !== null ? `(${post.item.year})` : null}</p>
                        <p className='post__original-name'>{post.item.nameOriginal}</p>
                    </div>
                    {post.item.shortDescription ? <div className="post_short-desc">
                        <p className='post__short-desc'>{post.item.shortDescription}</p>
                    </div> : null}
                    {post.item.ratingImdb === null ? null : <div className='post-rating'> 
                        <p className='post__raiting'>Ретинг IMDb</p>
                        <p className='post__rating-number'>{starSvg} {post.item.ratingImdb} / 10</p>
                    </div>}
                    <AddFavourites 
                        nameRu={post.item.nameRu}
                        nameOriginal={post.item.nameOriginal}
                        src={post.item.posterUrl}
                        year={post.item.year} 
                        id={id}
                        genres={post.item.genres}
                        countries={post.item.countries}
                        currentPage={1}
                        ind={1}
                    />
                    {post.item.webUrl !== null ? <div className="post-kinopoisk">
                        <a className='post__kinopoisk' href={post.item.webUrl} target='_blank'>Смотреть на Кинопоиске</a>
                    </div> : null}
                    <p className='post__subtitle'>О Фильме</p>
                    <div className="post-about">
                        <div className='post__text grid-rows'>
                            <p>Год производства</p>
                            <p>{post.item.year}</p>
                        </div>
                        {post.item.countries.length !== 0 ? <div className="grid-rows">
                            <p className='post__text'>Страна</p>
                            <div className='post-subtext'>
                                {post.item.countries.map(text=><p className='post__subtext' key={text.country}>{text.country}</p>)}
                            </div>
                        </div> : null}
                        <div className="grid-rows">
                            <p className='post__text'>Жанр</p>
                            <div className="post-subtext">
                                {post.item.genres.map(text=><p className='post__subtext' key={text.genre}>{text.genre}</p>)}
                            </div>
                        </div>
                        {post.item.slogan ? <div className="grid-rows">
                            <p className='post__text'>Слоган</p>
                            <p className='post__slogan'>"{post.item.slogan}"</p>
                        </div>  : null}
                        { post.item.filmLength != null ?<div className="grid-rows">
                            <p>Время</p>
                            <p>{Math.trunc(post.item.filmLength / 60) === 0 ? null : Math.trunc(post.item.filmLength / 60) + 'ч.'} { Math.trunc(post.item.filmLength / 60) === 0 ? null : post.item.filmLength % 60 + ' мин. ' + '/' } {post.item.filmLength} мин.</p>
                        </div> : null}
                    </div>
                    {post.item.description ? <p className='post__subtitle-desc'>Описание</p> : null}
                    {post.item.description ? <p className='post__desc'>{post.item.description}</p> : null}
                </div>
                </div>
                {hiddenFoto === false ? <div className="post-image">
                    {newImages[0] ? <div className="post-image-title">
                        <p className='post-image__title'>Изображения</p>
                        {newImages[0].length === images.items.length 
                        ? 
                        <div>
                            {images.total > quantity ? <button onClick={()=>getNewImage(quantity)} className='post-image__show-more'>скрыть всё</button> : null}
                        </div>
                        : 
                        <button onClick={()=>getNewImage(newImages[0].length + quantity)} className='post-image__show-more'>показать ещё</button>}
                    </div> : null}
                    {getBigImg === true
                    ? <PostBigImage
                        arrayImg={images}
                        currentImg={currentBigImg}
                        url={getUrlBigImg}
                        close={closeBigImage}
                        /> 
                    : null}
                    <div className="post-image-content">
                        {newImages[0] ? newImages[0].map((img,i)=><img onClick={()=>showBigImage(img.imageUrl, i)} className='post-image__img' key={img.imageUrl} src={img.imageUrl} alt="" />): null} 
                    </div>
                </div> : null}
                {hiddenSimilar === false ? <div className="similars">
                    <p className='similars__title'>Похожие фильмы</p>
                    <Slider array={similars} />
                </div> : null}
            </div> : null}
        </div>}
        </>
    )
}
