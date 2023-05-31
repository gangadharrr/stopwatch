import React from 'react'

function ButtonComponent(props) {
  return (
    <React.Fragment>
        <button class="ButtonComponent"  disabled={props.disabled} onClick={props.onClick}>{props.value}</button>
    </React.Fragment>
  )
}

export default ButtonComponent