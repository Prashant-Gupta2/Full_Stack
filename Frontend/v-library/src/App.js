import {Routes,Route, BrowserRouter} from "react-router-dom"
import HomeVideo from './components/HomeVideo';
import AdminLogin from './components/AdminLogin';
import UserLogin from './components/UserLogin';
import DashAdmin from './components/DashAdmin';
import AddVideo from './components/AddVideo';
import EditVideo from './components/EditVideo';
import UserRegister from './components/UserRegister';
import UserDash from './components/UserDash';
import Protected from "./Protected";
function App() {
  return (
    <div className="box">
     <div className='shade'>
      <h2 className='text-center fw-bold text-light p-5'>Video Library Technology</h2>
      <BrowserRouter>
      <Routes>
      <Route path='/' Component={HomeVideo}/>
      <Route path='admin' Component={AdminLogin}/>
      <Route path='user' Component={UserLogin}/>
      <Route path="/dashboard" Component={DashAdmin}/>
      <Route path='/addvideo' Component={AddVideo}/>
      <Route path='/editvideo/:id' Component={EditVideo}/>
      <Route path='/userregister' Component={UserRegister}/>
      <Route path='/userdash' element={<Protected Component={UserDash}/>}/>
      </Routes>
      </BrowserRouter>
     </div>
    
    </div>
  );
}

export default App;
