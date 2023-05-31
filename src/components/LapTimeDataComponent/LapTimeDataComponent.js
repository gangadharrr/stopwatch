import React from 'react'

function LapTimeDataComponent(props) {
    const dataSet=[]
    for (let row of props.data) {
        const rows = [];
        for (let item of row) {
            rows.push(<p>{item}</p>);
        }
        dataSet.push(<div className='row'>{rows}</div>);
    }
    return (
        <React.Fragment>
            {dataSet}
        </React.Fragment>
    )
}

export default LapTimeDataComponent