import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';

export default function EditVideo() {
  const [categories, setCategories] = useState([]);
  const [details, setDetails] = useState({
    videoid: 0,
    title: '',
    url: '',
    description: '',
    likes: 0,
    dislikes: 0,
    views: 0,
    categoryid: 0,
    comments: '',
  });
  const params = useParams();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value, 
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://127.0.0.1:8000/edit-video/${params.id}`, details)
      .then(() => {
       toast.success("Video updated successfully!",{
        position:'top-center'
       })
      })
      .catch((err) => {
        console.error('Error updating video:', err);
        toast.error("something went wrong",{
          position:"top-center"
        })
      });
  };

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/get-categories')
      .then((response) => {
        setCategories([{ categoryid: '', categoryname: 'Select Category' }, ...response.data]);
      });

    axios.get(`http://127.0.0.1:8000/get-video/${params.id}`)
      .then((response) => {
        const videoData = response.data;
        setDetails({
          videoid: videoData.videoid,
          title: videoData.title,
          url: videoData.url,
          description: videoData.description,
          likes: videoData.likes,
          dislikes: videoData.dislikes,
          views: videoData.views,
          categoryid: videoData.categoryid || '',
          comments: videoData.comments || '',
        });
      });
  }, [params.id]);

  return (
    <div className="bg-light p-2 w-25 overflow-auto" style={{ height: '450px' }}>
    <ToastContainer/>
      <form onSubmit={handleSubmit} className="p-2">
        <h3 className="text-center">Edit Video</h3>
        <dl>
          <dt>VideoId</dt>
          <dd>
            <input
              onChange={handleChange}
              value={details.videoid}
              name="videoid"
              type="number"
              className="form-control"
              placeholder="Video ID"
            />
          </dd>
          <dt>Title</dt>
          <dd>
            <input
              onChange={handleChange}
              value={details.title}
              name="title"
              type="text"
              className="form-control"
              placeholder="Title"
            />
          </dd>
          <dt>Url</dt>
          <dd>
            <input
              onChange={handleChange}
              value={details.url}
              name="url"
              type="text"
              className="form-control"
              placeholder="URL"
            />
          </dd>
          <dt>Description</dt>
          <dd>
            <textarea
              onChange={handleChange}
              value={details.description}
              name="description"
              cols="4"
              rows="3"
              className="form-control"
              placeholder="Description"
            />
          </dd>
          <dt>Likes</dt>
          <dd>
            <input
              onChange={handleChange}
              value={details.likes}
              name="likes"
              type="number"
              className="form-control"
              placeholder="Likes"
            />
          </dd>
          <dt>Dislikes</dt> {/* Fixed typo of "Diskes" */}
          <dd>
            <input
              onChange={handleChange}
              value={details.dislikes}
              name="dislikes"
              type="number"
              className="form-control"
              placeholder="Dislikes"
            />
          </dd>
          <dt>Views</dt>
          <dd>
            <input
              onChange={handleChange}
              value={details.views}
              name="views"
              type="number"
              className="form-control"
              placeholder="Views"
            />
          </dd>
          <dt>Category</dt> {/* Fixed typo of "Caregotyid" */}
          <dd>
            <select
              onChange={handleChange}
              value={details.categoryid}
              name="categoryid"
              className="form-select"
            >
              {categories.map((category) => (
                <option key={category.categoryid} value={category.categoryid}>
                  {category.categoryname}
                </option>
              ))}
            </select>
          </dd>
          <dt>Comments</dt>
          <dd>
            <input
              onChange={handleChange}
              value={details.comments}
              name="comments"
              type="text"
              className="form-control"
              placeholder="Comments"
            />
          </dd>
        </dl>
       <div className='d-flex'>
       <button type="submit" className="btn btn-primary w-50 fs-5 mb-2">Save</button>
       <Link className="btn btn-danger w-50 fs-5 mb-2 ms-2" to="/dashboard">Cancel</Link>
       </div>
      </form>
   
    </div>
  );
}
