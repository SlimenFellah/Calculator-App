import React, { useReducer, useState } from 'react'


function reducerf(state,action) {
    switch(action.type){
        case 'addname' : 
            return [...state, action.payload.name]
        case 'removenames' :
            return []
    }

}

function ReducerClass() {
    

    const [state ,dispatch] = useReducer(reducerf, [])
    const [name,setName] = useState('')

    function addName(name){
        dispatch({type : 'addname', payload : {name : name}})
        setName('')
    }
    
    function removeNames(){
        dispatch({type :'removenames'})
    }

    return (<>
        <div>ReducerClass</div>
        <input type='text' placeholder='entre your name' value={name} onChange={(e)=>setName(e.target.value)}/>
        <button onClick={() => addName(name)}>Add Name</button>
        <button onClick={removeNames}>Remove all names</button>
        <div>
            {state.map(name => {return <h1>{name}</h1>})}
        </div>

    </>)
}

export default ReducerClass