import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';
import  Protected from '../Protected';

export default function UserLogin() {
  const navigate=useNavigate();
  const formik=useFormik({
    initialValues:{
      userid:"",
      password:""
    },

    onSubmit:(data)=>{
    axios.get("http://127.0.0.1:8000/get-users")
    .then(response=>{
      const user=response.data.find(item=>item.userid===data.userid);
      sessionStorage.setItem("user",user.username);
      if(user){
         if(user.password===data.password){
          localStorage.setItem("login",true)
          toast.success("login success",{
            position:"top-center"
          })
          setTimeout(()=>{
            navigate("/userdash");
          },1000)
         
         }
         else{
          sessionStorage.setItem("login",false)
          toast.error("Invalid password",{
            position:"top-center"
          })
         }     
      }
      else{
        toast.error("invalid userid",{
          position:"top-center"
        })
      }
    }).catch(error=>{
      toast.error("Unlable to fetch userdata",{
        position:"top-center"
      })
    })
    },
    validate: (formdata)=>{
     const errors={};
     if(formdata.userid.length===0){
      errors.userid="Userid required";
     }
     if(formdata.password.length===0){
      errors.password="password required";
     } 
     else if(formdata.password.length<4){
      errors.password="Password must be 4 digit";
     } 
     return errors;
    }
  });

  return (
          <div className='login bg-light p-2 m-3'>
          <ToastContainer/>
               <Link to="/" className="float-end btn btn-close"></Link>
          <form onSubmit={formik.handleSubmit}>
             <h3 className='text-center heading'>User Login</h3>
              <dl>
                <dt>UserId</dt> 
                <dd><input type='text' onChange={formik.handleChange} name="userid" placeholder='userid'/></dd>
                <dd className='text-danger'>{formik.errors.userid}</dd>
                <dt>Passsword</dt>
                <dd><input type='password' onChange={formik.handleChange} name="password" placeholder='password'/></dd>  
                <dd className='text-danger'>{formik.errors.password}</dd>
              </dl>
              <button type="submit" className='btn btn-primary w-100 fs-5 mb-2'>Login</button>
              <div className='my-2'>
                <span>New user </span>
                <Link to="/userregister"> Register</Link>
              </div>
          </form>
        </div>
  )
}
