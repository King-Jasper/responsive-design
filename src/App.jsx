import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Logout from './components/Login/Logout'
import Home from './components/Home/Home'

function App() {
 
  return (
    
    <Router>
      <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route path='/signup' element={<Register />}></Route>
      <Route path='/logout' element={<Logout />}></Route>
      <Route path='/home' element={<Home />}></Route>
      </Routes>
    </Router>
      
    
  )
}

export default App
