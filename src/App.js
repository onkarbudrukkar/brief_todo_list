import React from 'react'
import Navbar from './Components/Navbar'
import TaskList from './Components/TaskList';
import CategoryPage from './Components/CategoryPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContextProvider from './context/ContextProvider';

const App = () => {

  return (
    <ContextProvider>
      <Navbar />
        <Routes>
            <Route path='/' element={<CategoryPage />} />
            <Route path='/:eachCategory' element={<TaskList />} />
        </Routes>
    </ContextProvider>
  )
}

export default App