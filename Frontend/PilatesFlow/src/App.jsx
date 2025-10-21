import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'

import Login from './pages/Login/login.jsx'
import Menu from './pages/Menu/menu.jsx'

import RotaProtegida from "./services/rotaProtegida.jsx"

function App() {

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' />} />
      <Route path='/login' element={<Login />} />
      <Route path='/menu' element={
        <RotaProtegida>
          <Menu />
        </RotaProtegida>
      } />
    </Routes>
  )
}

export default App
