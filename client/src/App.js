import {useModal} from './hooks/useModal.js';
import Modal from './components/Modal.js';
import './styles/App.css';
import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function App() {

  let navigate = useNavigate();
  const [isOpenRegister, openModalRegister, closeModalRegister]=useModal(false);
  const [loginAndSingIn, setLoginAndSingIn]= useState({
    username:"",
    password:"",
    account:"doctor"
  });

  const handleRegister = async(e) =>{
    e.preventDefault();
    let packageToRegister= {
      username: loginAndSingIn.username,
      password: loginAndSingIn.password,
      account: loginAndSingIn.account
    };
    const sendPost = async (toSend) =>{
      try{
        await axios.post('http://localhost:3001/register', toSend);
      }catch(error){
        console.log(error)
      };
    };
    await sendPost(packageToRegister);
    handleLogin(e);
     
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    let packageToLogin= {
      username: loginAndSingIn.username,
      password: loginAndSingIn.password,
      account: loginAndSingIn.account
    };
    const sendPost = async(toSend) =>{
      try{
        let res = await axios.post('http://localhost:3001/login', toSend);
        let data= res.data;
        window.localStorage.setItem(
          'loggedUser', JSON.stringify(data.token)
        );
        console.log(data);
        navigate("/eia");
      }catch(error){
        console.log(error)
        alert("Username or password incorrect")
      };
    };
    sendPost(packageToLogin);
    

  }





  return (
    <div className="App">
      <div className="containerLogin">
        <h2>Hi! please Log in</h2>
        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input placeholder='username' value={loginAndSingIn.username} onChange={(e)=>setLoginAndSingIn({...loginAndSingIn, username: e.target.value})}></input>
          <br></br>
          <label>Password</label>
          <input type="password" placeholder='password' value={loginAndSingIn.password} onChange={(e)=>setLoginAndSingIn({...loginAndSingIn, password: e.target.value})}></input>
          <br></br>
          <button className='btn'>Log In</button>
        </form>

        <p>Dont have an account? <a onClick={openModalRegister} className="registerButton">Register</a></p>
      </div>

      <Modal isOpen={isOpenRegister} closeModal={closeModalRegister}>
        <div>
          <h2>Register</h2>
        </div>
        <div>
          <form onSubmit={handleRegister}>
            <label>Username</label>
            <input placeholder='username' value={loginAndSingIn.username} onChange={(e)=>setLoginAndSingIn({...loginAndSingIn, username: e.target.value})}></input>
            <br></br>
            <label>Password</label>
            <input type="password" placeholder='password' value={loginAndSingIn.password} onChange={(e)=>setLoginAndSingIn({...loginAndSingIn, password: e.target.value})}></input>
            <br></br>
            <label>Type</label>
            <select value={loginAndSingIn.account} onChange={(e)=>setLoginAndSingIn({...loginAndSingIn, account: e.target.value})}>
                <option value="doctor">doctor</option>
                <option value="admin">admin</option>
            </select>
            <br></br>
            <button className="btn">Register</button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default App;
