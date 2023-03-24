import React from 'react';
import './Cards.css';
import InnerCards from './InnerCards';

function Cards(data) {

    return (
        <>
            {
                localStorage.getItem('token') ? '' : <marquee class='plslogin'>Login, To See Your Recipes</marquee>
            }
            <div className='cards'>
                <InnerCards sendToInnerData={data} />
            </div>
        </>
    )
}

export default Cards