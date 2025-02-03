import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer,toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'
export default function DashAdmin() {
    const [video,setVideo]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
     axios.get("http://127.0.0.1:8000/get-videos")
     .then(response=>{
       setVideo(response.data);
     }).catch(error=>{
      console.log(error);    
     })
    },[])      
     function handleAddVideo(){
       navigate("/addvideo");
     }
     function handleDelete(e){
      const flag=window.confirm("Are you sure want to delete");
      if(flag){
        axios.delete(`http://127.0.0.1:8000/delete-video/${e.target.id}`);
        toast.success("Video deleted!",{
           position:"top-center"
        })
        window.location.reload(); 
      }
      else{
        
      }
     } 
     function handleEdit(e){
       navigate("/editvideo");   
     }    
  return (
    <div className='bg-light p-2 text-dark'>
      <h2 className='text-center heading'>Admin Dashboard of Video Library</h2>
      <button onClick={handleAddVideo} className="btn btn-primary bi bi-camera-video"> Add Video</button>
      <Link to="/admin" className="btn btn-danger ms-2">Back</Link>
      <table className="table table-hover">
          <thead>
              <tr>
                <th>Title</th>
                <th>Priview</th> 
                <th>Acition</th>
              </tr>   
          </thead>
          <tbody>
              {
                    video.map((vid,ind)=>{
                    return <tr className="mt-2" key={ind}>
                   <td>{vid.title}</td>
                   <td className='w-25'>
                    <iframe src={vid.url}>

                    </iframe>
                  </td>
                  <td><Link to={`/editvideo/${vid.videoid}`} className='btn bi bi-pen bg-warning p-2 rounded text-light me-2'></Link><span onClick={handleDelete} id={vid.videoid} className='btn bi bi-trash bg-danger p-2 rounded text-light'></span></td>   
                  </tr>
                 }
                 )      
              }    
          </tbody>
      </table>
      <Link to="/admin">Back to admin</Link>
      <ToastContainer/>
    </div>
  )
}
