import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import './index.css'
import Footer from './Components/Footer'
import LoginPage from './Pages/LoginPage'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import UserProfile from './Pages/Profil'

library.add(fas)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <main>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signin' element={ <LoginPage />}/>
        <Route path='/profile/:userName' element={<UserProfile/>}/>
      </Routes>
      </main>
      <Footer />
    </Router>
  </React.StrictMode>,
)
