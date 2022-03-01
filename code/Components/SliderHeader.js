import React, {useState, useEffect } from 'react'
import Slider from './Slider'

export default function SliderHeader() {
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
    const [slider, setSlider] = useState([])
    const [years] = useState(date.getFullYear())
    const [mounth] = useState(monthArr[date.getMonth()].replace(/"/g))
    
    async function getMovie() {
        const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=${years}&month=${mounth}`, {
            method: 'GET',
            headers: {
                'X-API-KEY': '2e8d2cf9-d0ab-4ed6-a24a-677f5f8b873f',
                'Content-Type': 'application/json',
            },
        })
        const sliders = await response.json()
        console.log(sliders)
        console.log(sliders.total)
        setSlider([...slider, sliders])
    }
    useEffect(() => {
        getMovie()
    }, [mounth])

    return (
        <div className='slider-header'>
            <div className="slider-title">
                <p className='slider__title'>
                    <svg className='slider__svg svg' strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 18C8 20.4148 9.79086 21 12 21C15.7587 21 17 18.5 14.5 13.5C11 18 10.5 11 11 9C9.5 12 8 14.8177 8 18Z" />
                        <path d="M12 21C17.0495 21 20 18.0956 20 13.125C20 8.15444 12 3 12 3C12 3 4 8.15444 4 13.125C4 18.0956 6.95054 21 12 21Z" />
                    </svg>
                    Популярно в этом месяце
                </p>
            </div>
            <Slider array={slider}/>
        </div>
    )
}
