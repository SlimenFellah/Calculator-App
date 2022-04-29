import React from 'react'
import { ACTIONS } from './App'

function ButtonDigit({digit, dispatch}) {
  return (
    <button className='btn' onClick={()=>dispatch({type : ACTIONS.ADD_DIGIT, payload : {digit}})}>
        {digit}
    </button>
    )
}
export default ButtonDigit