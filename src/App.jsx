import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import MainPage from './components/MainPage/MainPage'
import CategoryPage from './components/CategoryPage/CategoryPage'
import NotFoundPage from './components/NotFoundPage/NotFoundPage'
import NavPanel from './components/NavPanel/NavPanel'
import ElementPage from './components/ElementPage/ElementPage'

function App() {
  return (
    <>
      <NavPanel />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/categories/*' >
          <Route index element={<ElementPage />} />
          <Route path=':id/*'>
            <Route index element={<CategoryPage />} />
            <Route path=':elementId' element={<ElementPage />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>

    </>
  )
}

export default App
