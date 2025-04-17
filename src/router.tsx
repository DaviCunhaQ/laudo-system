import {BrowserRouter , Navigate, Route, Routes} from 'react-router-dom'
import LoginPage from './pages/login'
import { AuthProvider } from './context/authProvider'
import Home from './pages/home'
import NotFound from './pages/notFound'
import Users from './pages/users'

export function RoutePages (){
  return(
    <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/404" element={<NotFound/>}/>
            <Route path='*' element={<Navigate to='/404'/>}/>
          </Routes>
        </AuthProvider>
    </BrowserRouter>
  )
}