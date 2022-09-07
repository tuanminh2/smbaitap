import './App.scss';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import StudentList from './components/StudentList/StudentList';

import EditStudent from './components/EditStudent/EditStudent';
import AddStudent from './components/AddStudent/AddStudent';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

function App() {
  // Instantiation
  // const checkValidToken = () => {
  //   const token = localStorage.getItem('jwtToken');
  //   if(!token) return false;
  //   return true;
  // }
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student" element={<StudentList />} />
        <Route path="/" element={<StudentList />} />
        <Route path="/student/add" element={<AddStudent />} />
        <Route path="/student/edit" element={<EditStudent />} />
      </Routes>
    </>
  );
}

export default App;
