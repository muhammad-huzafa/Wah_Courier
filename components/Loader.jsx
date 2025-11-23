import React from 'react'
import { GooeyCircleLoader } from "react-loaders-kit"

const Loader = ({ message }) => {
    const loaderProps = {
        loading: true,
        size: 150,
        duration: 2.5,
        colors: ["#fe0000", "#ff3e3e", "#777777"],
    }   

    return (
        <div className='loader col'>
            <GooeyCircleLoader {...loaderProps} />
            <p>{ message }</p>
        </div>
    )
}

export default Loader