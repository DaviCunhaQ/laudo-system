import {BrowserRouter , Route, Routes} from 'react-router-dom'
import LoginPage from './pages/login'
import { AuthProvider } from './context/authProvider'
import Home from './pages/home'
import HandleNewOccurrence from './containers/HandleNewOccurrence'
import HandleUpdateOccurrence from './containers/HandleUpdateOccurrence'
import Drafts from './pages/drafts'

export function RoutePages (){
  return(
    <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/create' element={<HandleNewOccurrence/>}/>
            <Route path='/update' element={<HandleUpdateOccurrence/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/drafts" element={<Drafts/>}/>
            <Route path="/login" element={<LoginPage/>}/>
          </Routes>
        </AuthProvider>
    </BrowserRouter>
  )
}