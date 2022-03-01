import React from 'react'

export default function Checkbox(props) {
    return (
        <label className='checkbox'>
            <input className='checkbox-real' type="radio" name={props.group} />
            <span onClick={()=>props.changeCategoryMax(props.value, props.setFunc)} className='checkbox-fake'></span>
            <span onClick={()=>props.changeCategoryMax(props.value, props.setFunc)} className='checkbox-text'>{props.text}</span>
        </label>
    )
}
