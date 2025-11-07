import { Routes, Route } from 'react-router-dom'
import './App.css'
import MainPage from './components/MainPage/MainPage'
import NotFoundPage from './components/NotFoundPage/NotFoundPage'
import NavPanel from './components/NavPanel/NavPanel'
import { LoginContextProvider } from './context/AuthContext'
import Login from './components/Login/Login'
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute'
import { lazy, Suspense } from 'react'
import ErrorBoundary from './ErrorBoundary';

const ElementPage = lazy(() => import('./components/ElementPage/ElementPage'));
const CategoryPage = lazy(() => import('./components/CategoryPage/CategoryPage'));

function App() {
  return (
    <>
      <LoginContextProvider>
        <NavPanel />
        <ErrorBoundary>
          <Routes>
            <Route path='/' element={<MainPage />} />

            <Route path='/categories/*' >
              <Route path=':id/*'>
                <Route index element={<PrivateRoute>
                  <Suspense fallback={<div>Загрузка...</div>}>
                    <CategoryPage />
                  </Suspense>
                </PrivateRoute>} />
                <Route path=':elementId' element={<PrivateRoute>
                  <Suspense fallback={<div>Загрузка...</div>}>
                    <ElementPage />
                  </Suspense>
                </PrivateRoute>} />
              </Route>
            </Route>
            <Route path='/login' element={<Login />} />

            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </ErrorBoundary>

      </LoginContextProvider>

    </>
  )
}

export default App
