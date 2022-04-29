import { useReducer } from 'react';
import './App.css';
import ButtonDigit from './ButtonDigit';
import OperationDigit from './OperationDigit'

export const ACTIONS = {
  ADD_DIGIT : 'add_digit',
  CLEAR : 'clear',
  DELETE_DIGIT : 'delete_digit',
  CHOOSE_OPERATION : 'choose_operation',
  EVALUATE : 'evaluate'
}

function reducerf (state, action) {
  switch (action.type) {
    case ACTIONS.ADD_DIGIT :
      if (state.overwrite == true) {
        return {...state, currentOperand : action.payload.digit, overwrite : false}
      }
      if(action.payload.digit === '0' && state.currentOperand === '0') {
        return state
      }
      if(action.payload.digit === '.' && state.currentOperand.includes('.')) {
        return state
      }  
      return {...state, currentOperand :`${state.currentOperand || ""}${action.payload.digit}`}
    case ACTIONS.CLEAR : 
      return {}
    case ACTIONS.CHOOSE_OPERATION :
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }
      if (state.currentOperand == null) {
        return{
          ...state,operation : action.payload.operation
        } }
      if (state.previousOperand ==null) {
        return {
          ...state,operation : action.payload.operation,
          previousOperand : state.currentOperand,
          currentOperand : null
        }
      }
      return {...state, currentOperand : null,operation : action.payload.operation, previousOperand :evaluate(state)}
    case ACTIONS.DELETE_DIGIT :
      if (state.overwrite == true ) { return {...state, overwrite : false, currentOperand : null}}
      if (state.currentOperand == null) return state
      if (state.currentOperand.length == 1) return {...state, currentOperand :  null } 
      return{...state, currentOperand : state.currentOperand.slice(0,-1)}
    
    case ACTIONS.EVALUATE : 
      if(state.currentOperand == null || state.previousOperand == null || state.operation == null) {
        return state
      }
      else {
        return {...state, currentOperand: evaluate(state), previousOperand : null, operation : null, overwrite : true}
      }
  
  }
}

function evaluate({currentOperand, previousOperand,operation}) {
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) { 
    return ''
  }
  let computation
  switch (operation){
    case '+' :
      computation = prev + current
      break
    case '-' : 
      computation = prev - current
      break
    case '/' : 
      computation = prev / current
      break
    case '*' : 
      computation = prev * current
      break
  }
  return computation.toString()
}

function App() {

  const [{currentOperand, previousOperand, operation,overwrite}, dispatch] = useReducer(reducerf,{})
  return (<>
  <div className='head'><h1 >Calculator APP</h1></div>
    
    <div className='calculator-grid'>
      <div className='output'>
        <div className='previous-operand'>{previousOperand}{operation}</div>
        <div className='current-operand'>{currentOperand}</div>
      </div>
      <button className='span-two' onClick={()=> {dispatch({type : ACTIONS.CLEAR})}}>AC</button>
      <button onClick={()=> {dispatch({type : ACTIONS.DELETE_DIGIT})}}>DEL</button>
      <OperationDigit dispatch={dispatch} operation='/'/>
      <ButtonDigit dispatch={dispatch} digit='1'/>
      <ButtonDigit dispatch={dispatch} digit='2'/>
      <ButtonDigit dispatch={dispatch} digit='3'/>
      <OperationDigit dispatch={dispatch} operation='*'/>
      <ButtonDigit dispatch={dispatch} digit='4'/>
      <ButtonDigit dispatch={dispatch} digit='5'/>
      <ButtonDigit dispatch={dispatch} digit='6'/>
      <OperationDigit dispatch={dispatch} operation='+'/>
      <ButtonDigit dispatch={dispatch} digit='7'/>
      <ButtonDigit dispatch={dispatch} digit='8'/>
      <ButtonDigit dispatch={dispatch} digit='9'/>
      <OperationDigit dispatch={dispatch} operation='-'/>
      <ButtonDigit dispatch={dispatch} digit='.'/>
      <ButtonDigit dispatch={dispatch} digit='0'/>
      <button className='span-two' onClick={() => {dispatch({type : ACTIONS.EVALUATE})
      }}>=</button>
    </div>
    <div className='signature'><h3 >Made with ♥ by Slimene Fellah</h3></div>

    </>
  );
}

export default App;
