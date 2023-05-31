import React from 'react'

function CounterComponent(props) {
  return (
    <div className='CounterComponent'>
        <p>{props.value}</p>
    </div>
  )
}

export default CounterComponent