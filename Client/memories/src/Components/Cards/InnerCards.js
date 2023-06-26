import React from 'react';
// import DeletePop from '../DeletePop/DeletePop';

function InnerCards(data) {
    const deleteMemoreis = (el) => {
        data.sendToInnerData.props.setDeletePop(true);
        data.sendToInnerData.props.setDeletedElement(el);
    }


    const editMemories = (el) => {
        data.sendToInnerData.props.formData.title = el.title;
        data.sendToInnerData.props.formData.subTitle = el.subTitle;
        data.sendToInnerData.props.formData.message = el.message;
        data.sendToInnerData.props.setEditId(el.id);
        data.sendToInnerData.props.setPopup(true);
        data.sendToInnerData.props.setIsEiditing(true);
    }

    return (
        <>
            {
                data.sendToInnerData.props.memories?.length > 0 ? data.sendToInnerData.props.memories.map((el, key) => {
                    return (
                        <>
                            <div className="card mt-5" key={key}>
                                <img className="card-img" src={`${el.image}`} alt="Card image cap" />
                                <div className="card-body">
                                    <h6 className="card-subtitle mb-2 text-muted">{el.subTitle}</h6>
                                    <h5 className="card-title">{el.title}</h5>
                                    <p className="card-text">{el.message}</p>
                                    {
                                        localStorage.getItem('token') ? <div className='d-flex justify-content-between'>
                                            <button className="card-link" onClick={() => { editMemories(el) }}>Edit</button>
                                            <button className="card-link del" onClick={() => { deleteMemoreis(el) }}>Delete</button>
                                        </div> : ''
                                    }
                                </div>
                            </div>
                        </>
                    )
                }) : <h1 className='nomemories'>No Recipes, Save Here</h1>
            }
        </>
    )
}

export default InnerCards