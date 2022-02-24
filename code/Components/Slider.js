import React, { useRef } from 'react'
import Slide from './Slide'

export default function Slider(props) {
    const sliderWidth = useRef()
    let position = 0
    const widthItem = 240

    const sliderLeft = () => {
        const widthTrack = sliderWidth.current.offsetWidth
        const AllSliderItems = sliderWidth.current.childNodes.length
        const quantityItemsTrack =  Math.floor(widthTrack / widthItem)
        const quantityNextSlide = Math.floor(AllSliderItems / quantityItemsTrack)
        const maxPositionWidth = quantityNextSlide * widthTrack

        position += widthTrack
        console.log(position)
        console.log(-maxPositionWidth)

        sliderWidth.current.childNodes.forEach(item=>{
            item.style = `transform: translateX(${position + 'px'})`
        })
        if (position > 0) {
            position = -maxPositionWidth
            sliderWidth.current.childNodes.forEach(item=>{
                item.style = `transform: translateX(${-maxPositionWidth + 'px'})`
            })
        }
    }
    
    const sliderRight = () => {
        const widthTrack = sliderWidth.current.offsetWidth
        const AllSliderItems = sliderWidth.current.childNodes.length
        const quantityItemsTrack =  Math.floor(widthTrack / widthItem)
        const quantityNextSlide = Math.floor(AllSliderItems / quantityItemsTrack)
        const maxPositionWidth = quantityNextSlide * widthTrack

        console.log(position)
        console.log(-maxPositionWidth)

        position += (-widthTrack)

        if( position < -maxPositionWidth  ){
            position = 0
            sliderWidth.current.childNodes.forEach(item=>{
                item.style = `transform: translateX(${position + 'px'})`
            })
        }
        
        sliderWidth.current.childNodes.forEach(item=>{
            item.style = `transform: translateX(${position + 'px'})`
        })
    }

    return (
        <div className='slider'>
            <svg onClick={sliderLeft} className='slider__btn btn--left svg' strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 12H8M8 12L11.5 15.5M8 12L11.5 8.5"/>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
            </svg>
            <svg onClick={sliderRight} className='slider__btn btn--right svg' strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 12H8M8 12L11.5 15.5M8 12L11.5 8.5"/>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
            </svg>
            <div className="slider-content">
                <div className="slider-wrapper" ref={sliderWidth}>
                    {props.array[0] ? props.array[0].items.map(item=>{
                        return <Slide key={item.kinopoiskId || item.filmId } id={item.kinopoiskId || item.filmId} name={item.nameRu} year={item.year} src={item.posterUrlPreview}/>
                    }) : null}
                </div>
            </div>
        </div>
    )
}
