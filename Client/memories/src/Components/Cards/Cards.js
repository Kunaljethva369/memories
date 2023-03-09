import React from 'react';
import './Cards.css';
import InnerCards from './InnerCards';

function Cards(data) {

    return (
        <>
            <div className='cards'>
                <InnerCards sendToInnerData={data}/>
            </div>
        </>
    )
}

export default Cards