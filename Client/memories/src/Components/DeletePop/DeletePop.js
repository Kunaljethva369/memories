import React from 'react';
import './DeletePop.css';
import axios from 'axios';

function DeletePop({ props }) {
    const deleteMeomires = () => {
        console.log(props.deletedElement);
        const remainingMemoreis = props.memories.filter((element) => {
            if (props.memories.length == 1) {
                return element.id !== props.deletedElement.id;
            }
            else {
                return element.id !== props.deletedElement.id;
            }
        });
        const deletedMemories = props.memories.filter((element) => {
            if (props.memories.length == 1) {
                return element.id == props.deletedElement.id;
            }
            else {
                return element.id == props.deletedElement.id;
            }
        });
        props.setLoader(false);
        props.setDeletePop(false);
        const token = localStorage.getItem('token');
        const userEmail = JSON.parse(token).emailid;
        const recipeId = deletedMemories[0].id;
        axios.delete(`https://react-curd.onrender.com/recipe/deleterecpie`, { data: { recipeId, userEmail } }).then(async (res) => {
            // axios.delete(`http://localhost:3001/recipe/deleterecpie`, { data: { recipeId, userEmail } }).then(async (res) => {
            if (res.data.message == "Deleted Memories");
            await props.setMemories(remainingMemoreis);
            props.setLoader(true);
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <>
            <div className={props.deletePop ? "deletecard active" : "deletecard"}>
                <div class="section">
                    <div class="container deleteContainer">
                        <h3>Are you sure, you want delete Recipe ?</h3>
                        <div>
                            <button className="card-link del" onClick={() => deleteMeomires()}>Yes</button>
                            <button className="card-link" onClick={() => { props.setDeletePop(false) }}>No</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeletePop