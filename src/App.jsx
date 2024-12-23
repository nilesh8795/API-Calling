import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
// import Navbar from './components/Navbar'
// import Signup from './components/Signup'
import View from './components/View'

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<View/>}/>
        {/* <Route path='/signup' element={<Signup/>}/> */}
      </Routes>
      </BrowserRouter>
    </div>
  )
}
