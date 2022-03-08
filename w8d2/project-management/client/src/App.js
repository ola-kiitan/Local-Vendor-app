import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DishList from './pages/DishList'
import DishDetails from './pages/DishDetails'
import DishEdit from './pages/DishEdit'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import DishExplore from './pages/DishExplore'
import ProtectedRoute from './components/ProtectedRoute'
import ProfileCard from './components/ProfileCard'
function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute redirectTo='/login'>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path='/dishes'
          element={
            <ProtectedRoute redirectTo='/login'>
              <DishList />
            </ProtectedRoute>
          }
        />
        <Route path='/profile/:id' element={<ProfileCard />} />
        <Route path='/explore' element={<DishExplore />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dishes/:id' element={<DishDetails />} />
        <Route path='/dishes/edit/:id' element={<DishEdit />} />
      </Routes>
    </div>
  )
}

export default App
