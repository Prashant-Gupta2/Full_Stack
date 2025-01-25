import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomeVideo() {
     const navigate=useNavigate();     
    function handleAdminLogin(){
  
      navigate("admin");
    }
    function handleUserLogin(){
      navigate("user");  
    }      
  return (
    <div className="d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
      <button onClick={handleAdminLogin} className='btn btn-dark text-light fw-bold'>Admin Login</button>
      <button onClick={handleUserLogin} className='btn btn-warning ms-2 fw-bold'>User Login</button>
    </div>
  )
}
