import axios, { Axios } from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import {ToastContainer,toast} from "react-toastify"
import {useForm} from "react-hook-form"

export default function AddVideo() {
  const navigate=useNavigate();
      const [categories,setcategories]=useState([]); 
      const {register,handleSubmit,formState:{errors}}=useForm();
     useEffect(()=>{
      axios.get("http://127.0.0.1:8000/get-categories")
      .then(response=>{
        setcategories([{categoryid:"",categoryname:"select category"},...response.data]);
      }) 
      .catch(error=>{
        console.log(error);    
      })   
     },[]);

     const onSubmit = (data) => {
          const videoInfo = {
            videoid: parseInt(data.videoid),
            title: data.title,
            url: data.url,
            description: data.description,
            likes: parseInt(data.likes),
            dislikes: parseInt(data.dislikes),
            views: parseInt(data.views), 
            categoryid: parseInt(data.categoryid),
            comments: data.comments,
          };  
          console.log(videoInfo);      
          axios.post("http://127.0.0.1:8000/add-video", videoInfo)
            .then(() => {
              toast.success("Video added", { position: "top-center" });
              setTimeout(()=>{
                navigate("/dashboard");
              },1000)
            })
            .catch((error) => {
              console.log("Error:", error);
              toast.error("Failed to add video", {position: "top-center" });
            });
        };
      
  return (
    <div className='bg-light p-2 w-25 overflow-auto'  style={{height:'450px'}}>
                   <Link to="/dashboard" className="float-end btn btn-close"></Link>
      <form onSubmit={handleSubmit(onSubmit)} className='p-2'>
             <h3 className='text-center'>Add Video</h3>
              <dl>
                <dt>VideoId</dt> 
                <dd><input {...register("videoid",{required:true})}  name='videoid' type='number' className='form-control' placeholder='videoid'/></dd>
                <dd className='text-danger'>{errors.videoid?.type==="required"?<span>videoid required</span>:<span></span>}</dd>
                <dt>Title</dt>
                <dd><input {...register("title",{required:true})}  name="title" type='text' className='form-control' placeholder='title'/></dd>
                <dd className='text-danger'>{errors.title?.type==="required"?<span>title required</span>:<span></span>}</dd>
                <dt>Url</dt>
                <dd><input {...register("url",{required:true})} name='url' type='text' className='form-control' placeholder='url'/></dd>  
                <dd className='text-danger'>{errors.url?.type==="required"?<span>url required</span>:<span></span>}</dd>
                <dt>Description</dt>
                <dd><textarea {...register("description",{required:true})}  name='description' cols="4" rows="3" type='text' className='form-control' placeholder='description'/></dd>       
                <dd className='text-danger'>{errors.description?.type==="required"?<span>description required</span>:<span></span>}</dd>
                <dt>Likes</dt>
                <dd><input {...register("likes",{required:true})}  name='likes' type='number' className='form-control' placeholder='likes'/></dd>  
                <dd className='text-danger'>{errors.likes?.type==="required"?<span>likes required</span>:<span></span>}</dd>
                <dt>Diskes</dt>
                <dd><input {...register("dislikes",{required:true})} name='dislikes' type='number' className='form-control' placeholder='dislikes'/></dd>  
                <dd className='text-danger'>{errors.dislikes?.type==="required"?<span>dislikes required</span>:<span></span>}</dd>
                <dt>Views</dt>
                <dd><input {...register("views",{required:true})} name='views' type='number' className='form-control' placeholder='views'/></dd>                      
                <dd className='text-danger'>{errors.viwes?.type==="required"?<span>views required</span>:<span></span>}</dd>
                <dt>Caregotyid</dt>
                <dd>
                   <select {...register("categoryid",{required:true})}  name='categoryid' className="form-select">
                    {
                    categories.map(category=>{
                      return <option key={category.categoryid} value={category.categoryid} >{category.categoryname}</option>        
                    })          
                    }
                   </select> 
                   <dd className='text-danger'>{errors.categoryid?.type==="required"?<span>categoryid required</span>:<span></span>}</dd>
                </dd>   
                <dt>Comments</dt>
                <dd><input {...register("comments",{required:true})} name='comments' type='text' className='form-control' placeholder='comments'/></dd>                               
                <dd className='text-danger'>{errors.comments?.type==="required"?<span>comments required</span>:<span></span>}</dd>
              </dl>
              <button type="submit" className='btn btn-primary w-100 fs-5 mb-2'>Add</button>
          </form>
          <Link to="/dashboard">Back to Dashboard</Link>
          <ToastContainer/>  
    </div>
  )
}
