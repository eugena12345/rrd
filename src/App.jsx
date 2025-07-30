//import { createContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import MainPage from './components/MainPage/MainPage'
import CategoryPage from './components/CategoryPage/CategoryPage'
import NotFoundPage from './components/NotFoundPage/NotFoundPage'
import NavPanel from './components/NavPanel/NavPanel'
import ElementPage from './components/ElementPage/ElementPage'
import { LoginContextProvider } from './context/AuthContext'
import Login from './components/Login/Login'
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute'

function App() {
  return (
    <>
      <LoginContextProvider>
        <NavPanel />

        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/categories/*' >
            {/* <Route index element={<PrivateRoute><ElementPage /></PrivateRoute>} /> */}
            <Route path=':id/*'>
              <Route index element={<PrivateRoute><CategoryPage /></PrivateRoute>} />
              <Route path=':elementId' element={<PrivateRoute><ElementPage /></PrivateRoute>} />
            </Route>
          </Route>
          <Route path='/login' element={<Login />} />

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </LoginContextProvider>

    </>
  )
}

export default App
