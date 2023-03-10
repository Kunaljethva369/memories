import React from 'react';

function InnerCards(data) {
    return (
        <>
            {

                data.sendToInnerData.props?.length > 0 ? data.sendToInnerData.props.map((el, key) => {
                    return (
                        <>
                            <div className="card mt-5" key={key}>
                                <img className="card-img" src={`${el.image}`} alt="Card image cap" />
                                <div className="card-body">
                                    <h6 className="card-subtitle mb-2 text-muted">{el.subTitle}</h6>
                                    <h5 className="card-title">{el.title}</h5>
                                    <p className="card-text">{el.message}</p>
                                    <div className='d-flex justify-content-between'>
                                        <button className="card-link">Like</button>
                                        <button className="card-link del">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }) : <h1 className='nomemories'>No Memories, Create Here</h1>
            }
        </>
    )
}

export default InnerCards