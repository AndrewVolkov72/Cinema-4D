import React, {useState, useEffect} from 'react'
import FilterSelect from './UI/FilterSelect'
import Checkbox from './UI/Checkbox'
import Range from './UI/Range'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Filter() {

    const dispatch = useDispatch()

    const [genres, setGenres] = useState([])
    const [selectTitle, setSelectTitle] = useState('Выберите жанр')
    const [resetValue, setResetValue] = useState(false)

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
        setGenres([arrays])
    }
    useEffect(() => {
        getGenresAndCountries()
    }, [])

    const date = new Date()
    const [page, setPage] = useState(1)
    const [genre, setGenre] = useState(0)
    const [type, setType] = useState('ALL')
    const [ratingFrom, setRatingFrom] = useState(0)
    const [ratingTo, setRatingTo] = useState(10)
    const [yearFrom, setYearFrom] = useState(1888)
    const [yearTo, setYearTo] = useState(date.getFullYear())
    const [filtersArr, setFiltersArr] = useState([])
    
    let navigate = useNavigate();
    async function handleSubmit(event) {
        event.preventDefault();
        navigate(`/list/1`, { replace: true });
        getFilters(filtersArr)
    }

    function getFilters() {
        const filtersSettings = {
            page: page,
            genre: genre,
            type: type,
            ratingFrom: Number(ratingFrom),
            ratingTo: Number(ratingTo),
            yearFrom: Number(yearFrom),
            yearTo: Number(yearTo)
        }
        dispatch({type: 'ADD_FILTERS', payload: filtersSettings})
    }

    function changeCategory(value, setFunc, setValue) {
        setFunc(value)
        setValue(value)
    }
    function changeCategoryMax(value, setFunc) {
        setFunc(value)
    }
    const resetFilters = () => {
        setSelectTitle('Выберите жанр')
        setGenre(0)
        setType('ALL')
        setRatingFrom(0)
        setRatingTo(10)
        setYearFrom(1888)
        setYearTo(date.getFullYear())
        setResetValue(!resetValue)
    }
    return (
        <>
        <div className='filter'>
            {genres[0] ? <FilterSelect title={selectTitle} 
                        setSelectTitle={setSelectTitle}
                        array={genres[0].genres}
                        changeCategoryMax={changeCategoryMax}
                        setFunc={setGenre}
             /> : null}
            <div className="filter-categoty">
                <Checkbox text='Все' group='films' value={'ALL'} changeCategoryMax={changeCategoryMax} setFunc={setType}/>
                <Checkbox text='Фильмы' group='films' value={'FILM'} changeCategoryMax={changeCategoryMax} setFunc={setType}/>
                <Checkbox text='Сериалы' group='films' value={'TV_SHOW'} changeCategoryMax={changeCategoryMax} setFunc={setType}/>
            </div>
            <Range from={yearFrom}
                to={yearTo}
                changeCategory={changeCategory}
                changeCategoryMax={changeCategoryMax}
                setFrom={setYearFrom}
                setTo={setYearTo}
                title={'Год производства'}
                id={'years'}
                min={1888}
                max={date.getFullYear()}
                resetValue={resetValue}
                />
            <Range from={ratingFrom}
                to={ratingTo}
                changeCategory={changeCategory}
                changeCategoryMax={changeCategoryMax}
                setFrom={setRatingFrom}
                setTo={setRatingTo}
                title={'Рейтинг'}
                id={'rating'}
                min={0}
                max={10}
                resetValue={resetValue}
                />
            <div className="filter-btn-group">
                <button onClick={genre !== 0 ? handleSubmit : null} className='filter__btn btn-search'>Поиск</button>
                <button onClick={resetFilters} className='filter__btn'>Сброс</button>
            </div>
        </div>
        </>
    )
}
