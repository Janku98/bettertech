import React from 'react';
import '../styles/Card.css';
import {useModal} from '../hooks/useModal.js';
import Modal from './Modal.js';
import {useState} from 'react';
import axios from 'axios';

const Card = ({name, description, id, token}) =>{


    const[edit, setEdit]=useState({name:"", description:""});
    const[isOpenEdit, openModalEdit, closeModalEdit]=useModal(false);

    const handleEdit = () =>{
        let packageToEdit ={
            id,
            name: edit.name,
            description: edit.description
        };
        const sendEdit = async (post) =>{
            try{
                await axios.put('http://localhost:3001/updateSpeciality', post);
                setEdit({name:"", description:""});
            }catch(err){
                console.log(err)
            };
        };
        sendEdit(packageToEdit);
    };


    return(
        <div className='containerCard'>
            <div className='titleCard'>
                <h2>{name}</h2>
            </div>
            <div className='descriptionCard'>
                <h6>{description}</h6>
            </div>
            <div>
                <button onClick={openModalEdit} className='btn2'>Edit</button>
            </div>

            <Modal isOpen={isOpenEdit} closeModal={closeModalEdit}>
                <div className='modaledit'>
                    <form onSubmit={handleEdit}>
                        <div>
                            <label>Name</label>
                            <input value={edit.name} onChange={(e)=>setEdit({...edit, name: e.target.value})}></input>
                        </div>
                        <br/>
                        <div>
                            <label>Description</label>
                            <input value={edit.description} onChange={(e)=>setEdit({...edit, description: e.target.value})}></input>
                        </div>
                        <br/>
                        <div>
                            <button className='btn'>Submit Changes</button>
                        </div>   
                    </form> 
                </div>
                
            </Modal>
        </div>
    )
};

export default Card