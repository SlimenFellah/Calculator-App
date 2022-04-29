import React from 'react'
import { ACTIONS } from './App'

function OperationDigit({operation, dispatch}) {
  return (
    <button className='btn' onClick={()=>dispatch({type : ACTIONS.CHOOSE_OPERATION, payload : {operation}})}>
        {operation}
    </button>
    )
}

export default OperationDigit