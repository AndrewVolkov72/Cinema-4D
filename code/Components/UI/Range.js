import React, {useState, useEffect} from 'react'

export default function Range(props) {
    const [value, setValue] = useState('')
    useEffect(()=>{
        setValue('')
    },[props.resetValue])
    return (
        <div className='range' id={props.id}>
            <p className='range__title'>{props.title}</p>
            <input className='range__input' type="range" value={value} min={props.min} max={props.max} onChange={e=>props.changeCategory(e.target.value, props.setFrom, setValue)} />
            <div className='range-content'>
                <div className="range-content-wrapper">
                    <span className='range__input-subtext'>от</span>
                    <input className='range__input-number'
                    min={props.min}
                    max={props.max}
                    onChange={e=>props.changeCategory(e.target.value, props.setFrom , setValue)} 
                    type="number" 
                    placeholder={props.min}
                    value={value}
                    />
                </div>
                <div className="range-content-wrapper">
                    <span className='range__input-subtext'>до</span>
                    <input className='range__input-number'
                    min={props.min}
                    max={props.max}
                    onChange={e=>props.changeCategoryMax(e.target.value, props.setTo)} 
                    type="number" 
                    placeholder={props.max}
                    />
                </div>
            </div>
        </div>
    )
}
