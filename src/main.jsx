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
import { Provider } from 'react-redux'
import { store } from './store.js'
import Transactions from './Pages/Transactions'
import ErrorPage from './Pages/Error'

library.add(fas)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Navbar />
      
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route path='/signin' element={ <LoginPage />}/>
          <Route path='/profile' element={<UserProfile/>}/>
          <Route path='/transactions' element={<Transactions />}/>
          <Route path='*' element={<ErrorPage />}/>
        </Routes>
    
        <Footer />
      </Router>
    </Provider>
  </React.StrictMode>,
)
