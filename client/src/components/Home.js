import React from 'react';
import '../styles/Home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card.js';


const Home = () => {
    
    const[tokenState, setTokenState] = useState("");
    const[especialityList, setEspecialityList]= useState([]);
    const[newEspecial, setNewEspecial]= useState({name:"", description:""});

    useEffect(()=>{
        const loggedUser = window.localStorage.getItem('loggedUser').split("\"")[1];
        if(loggedUser){
            setTokenState(loggedUser);
        }
    }, []);

    useEffect(()=>{
          axios.get('http://localhost:3001/getSpecialities', { headers: {"Authorization" : `Bearer ${tokenState}`} })
         .then(res=>{
             console.log(res)
             setEspecialityList(res.data)
         })   
    },[]);

    const handleNewEspecial = async() =>{
        let packageToCreate = {
            name: newEspecial.name,
            description: newEspecial.description,
        };
        const sendPost = async(post)=>{
            try{
                axios.post('http://localhost:3001/newSpeciality', post, { headers: {Authorization : `Bearer ${tokenState}`} } )
            }catch(err){
                console.log(err)
            }
        }
        sendPost(packageToCreate);
        setNewEspecial({name:"", description:""})
    };
    





    return (
        <div className='Home'>
            <div className='navHome'>
                <div>
                    <h1>Add a new speciality</h1>
                </div>
                <div>
                    <form onSubmit={handleNewEspecial}>
                        <div>
                            <label>Name</label>
                            <input value={newEspecial.name} onChange={(e)=>setNewEspecial({...newEspecial, name: e.target.value})}></input>
                        </div>
                        <br/>
                        <div>
                            <label>Description</label>
                            <textarea value={newEspecial.description} onChange={(e)=>setNewEspecial({...newEspecial, description: e.target.value})}></textarea>
                        </div>
                        <br/>
                        <div>
                            <button className='btn'>Create</button>
                        </div>
                    </form>
                </div>
                

            </div>
            <div className='containerHome'>
                {especialityList !== [] && especialityList.map((e)=>{
                    return(
                        <Card name={e.name} description={e.description} id={e.id} token={tokenState}></Card>
                    ) 
                    
                })}
            </div>
        </div>
    );
};

export default Home;