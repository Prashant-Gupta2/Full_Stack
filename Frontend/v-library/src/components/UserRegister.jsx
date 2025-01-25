import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {ToastContainer,toast} from "react-toastify"
import axios  from 'axios'

export default function UserRegister() {
          const formik=useFormik({
             initialValues:{
             userid:"",
             username:"",
             password:"",
             email:"",
             mobile:""  
             },
            onSubmit:(data)=>{
              axios.post("http://127.0.0.1:8000/register-user",data)
              toast.success("user register succesfully!",{
               position:"top-center"
              })
              .catch((err) => {
               toast.error("Registration failed. Please try again.", {
                 position: "top-center",
               });
             });
            },
            validate: (formdata) => {
               const errors = {};
               if (formdata.userid.length === 0) {
                 errors.userid = "User ID is required";
               }
               if (formdata.username.length === 0) {
                 errors.username = "Username is required";
               }
               if (formdata.password.length === 0) {
                 errors.password = "Password is required";
               } else if (formdata.password.length < 4) {
                 errors.password = "Password must be at least 4 characters long";
               }
               if (formdata.email.length === 0) {
                 errors.email = "Email is required";
               }
               if (formdata.mobile.length === 0) {
                 errors.mobile = "Mobile is required";
               }
               return errors;
            }
         
          });

          
       
  return (
          <div className='w-25 bg-light p-3 m-3 overflow-auto' style={{height:'500px'}}>
          <ToastContainer/>
           <Link to="/user" className="float-end btn btn-close"></Link>
          <form onSubmit={formik.handleSubmit}>
             <h3 className='text-center'>User Register</h3>
              <dl>
                <dt>UserId</dt> 
                <dd><input type='text' name='userid' onChange={formik.handleChange} className='form-control' placeholder='userid'/></dd>
                <dd className='text-danger'>{formik.errors.userid}</dd>
                <dt>UserName</dt>
                <dd><input type='text' name='username' onChange={formik.handleChange} className='form-control' placeholder='username'/></dd>
                <dd className='text-danger'>{formik.errors.username}</dd>
                <dt>Passsword</dt>
                <dd><input type='password' name='password' onChange={formik.handleChange} className='form-control' placeholder='password'/></dd>  
                <dd className='text-danger'>{formik.errors.password}</dd>
                <dt>Email</dt>
                <dd><input type='email' name='email' onChange={formik.handleChange} className='form-control' placeholder='email'/></dd>       
                <dd className='text-danger'>{formik.errors.email}</dd>
                <dt>Mobile</dt>
                <dd><input type='text' name='mobile' onChange={formik.handleChange} className='form-control' placeholder='mobile'/></dd>            
                <dd className='text-danger'>{formik.errors.mobile}</dd>
              </dl>
              <button type="submit" className='btn btn-primary w-100 fs-5 mb-2'>Register</button>
          </form>
         <div>
         <span>Have account</span><Link to="/user"> Login</Link>
         </div>
        </div>
  )
}
