import { useState } from 'react'

import './App.css'
//import Contact from './Contact';
import Navbar from './Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';
import Customer from './Customer';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import Register from './Register';
import Error from './Error';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';
import UserList from './UserList';


// 
const App = () => {
  
  
  return ( 

    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/customer' element={<Customer/>}/>
          <Route path='/customer/create' element={<AddCustomer/>}/>
          <Route path='/customer/edit/:cId' element={<EditCustomer/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/user' element={<UserList/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='*' element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </>
   );
}
 
export default App;