import {Routes, Route, useLocation} from "react-router-dom";
import ProfileScreen from './components/ProfileScreen';
import CommentsDashboard from './components/CommentsDashboard';
import Navbar from "./components/Navbar";
import "./App.css"

const App = () => {
  const location = useLocation();

  return (
   <>
  {location.pathname === '/' && <Navbar />}   

  <Routes>
       <Route path="/" element={<CommentsDashboard/>}/>
       <Route path="/profile" element={<ProfileScreen/>}/>
       </Routes>

  </>
  )
}

export default App