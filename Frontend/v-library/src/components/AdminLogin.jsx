import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import {ToastContainer,toast} from "react-toastify"
import axios from "axios"

export default function AdminLogin() {
  
     const navigate=useNavigate();     
    const  formik=useFormik({
      initialValues:{
        userid:"",
        password:"" 
      } ,
     onSubmit:(admin)=>{
      axios.get("http://127.0.0.1:8000/get-admin")
      .then(response=>{
       const user=response.data.find(data=>data.userid===admin.userid)
       if(user){
         if(user.password===admin.password){
          navigate("/dashboard");   
         }
         else{
          toast.error("Incorrect password",{
            position:"top-center"        
          });
         }
       }
       else{
         toast.error("Incorrect userId",{
          position:"top-center"
         })
       }
      })    
     } 
    });     
  return (
    <div className='login bg-light p-2 m-3'>
        <Link to="/" className="float-end btn btn-close"></Link>
      <form onSubmit={formik.handleSubmit}>
         <h3 className='text-center heading'>Admin Login</h3>
          <dl>
            <dt>UserId</dt> 
            <dd><input type='text' onChange={formik.handleChange} name='userid' className='form-control' placeholder='userid'/></dd>
            <dt>Passsword</dt>
            <dd><input type='password' onChange={formik.handleChange} name='password' className='form-control' placeholder='password'/></dd>       
          </dl>
          <button type='submit' className='btn btn-primary w-100 fs-5 mb-2'>Login</button>
      </form>
      <Link to="/">Back to Home</Link>
      <ToastContainer/>
    </div>
  )
}
