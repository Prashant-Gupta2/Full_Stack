import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { CardActions } from '@mui/material';
import axios from 'axios';
import Box from '@mui/material/Box';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import DownloadIcon from '@mui/icons-material/Download';
import { useRef } from 'react';
import { Link } from 'react-router-dom';


export default function UserDash() {
   const [videos,setVideos]=useState([]);
   const [search,setSearch]=useState("");
   const [filter,setFilter]=useState([]);
   const [categories,setCategories]=useState([]);
   const [like,setLike]=useState(0);
   const [dislike,setdislike]=useState(0);
   let users=localStorage.getItem("user") 
   let lCount=useRef(null);
   let dCount=useRef(null);      
   useEffect(()=>{
    axios.get("http://127.0.0.1:8000/get-videos")
    .then(response=>{
     let filtervideo = response.data.filter(({title})=>{
      return title.indexOf(search)>=0;
     })
     setVideos(filtervideo);         
    })
  axios.get("http://127.0.0.1:8000/get-categories")
  .then(response=>{
    setCategories(response.data)
  });
 

   },[search,like,dislike])
   function handleSearch(e){
      setSearch(e.target.value);

   } 
   useEffect(()=>{
    axios.patch(`http://localhost:8000/like/${lCount}`,{like})
    axios.patch(`http://localhost:8000/dislike/${dCount}`,{dislike})
   
   },[]);
   
   function handleCetegory(e){
    let x=parseInt(e.target.value);
   }
  return (
    <div className="bg-light p-2 rounded w-100">
    <h5>{users.toUpperCase()} <span className='text-success'>Welcome To Your Dashboard</span></h5>
    <Link to="/user" className="btn btn-close float-end p-4"></Link>
      <h2 className='text-center text-primary text-decoration-underline'>List of Videos</h2>
      <div className='row'>
       <h6>Search by title</h6>
        <div className='col-2'>
        <div className="input-group">
        <input type='text' onChange={handleSearch} placeholder='search' className="form-control"/>
        <span className="bi bi-search input-group-text bg-warning"></span>
        </div>
        <div>
        <h6 className='mt-3'>Filter by category</h6>
          <select className="form-select p-2" onChange={handleCetegory}>
           {
            categories.map((item)=>{
              return <option key={item.categoryid} value={item.categoryid}>{item.categoryname.toUpperCase()}</option>
            })
           }
          </select>
        </div>
        </div> 
        <div className='col-10 border border-start-1 p-2 d-flex flex-wrap'>
        {
         videos.map(video=>{
            return   <Card key={video.videoid} sx={{ maxWidth: 300 }} className='mx-2 my-2'>
      <CardHeader className='text-center'
       title={video.title}
      />
     <Box>
        <iframe src={video.url} className="">

        </iframe>  
     </Box>
      <CardContent>
        <Typography variant="body2">
        {video.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
        <span onClick={()=>lCount.current=video.videoid}>
        <ThumbUpIcon sx={{fontSize:"17px"}}  onClick={()=>setLike((prev)=>prev+1)}/><span className="fs-6">{video.likes}</span>
        </span>
        </IconButton>
        <IconButton aria-label="share">
        <span onClick={()=>dCount.current=video.videoid}>
        <ThumbDownIcon sx={{fontSize:"17px"}}  onClick={()=>setdislike((prev)=>prev+1) }/><span className="fs-6">{video.dislikes}</span>
        </span>
        </IconButton>
        <Box >
        <DownloadIcon/><span className='rounded p-1 btn'>download</span>
        </Box>
        <Typography className="bg-danger rounded p-1 text-light" variant='h8'>subscribe</Typography>
      </CardActions>
     
    </Card>       
          })
        }
       

        </div>
      </div>
    </div>
  )
}
