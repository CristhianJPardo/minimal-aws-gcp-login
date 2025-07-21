import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Layouts
import LayoutAuth from './layouts/LayoutAuth'

// Pages
import Login from './pages/auth/Login'
import OAuth2Redirect from './pages/auth/OAuth2Redirect'
import Error404 from './pages/Error404'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route element={<LayoutAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/oauth2/idpresponse" element={<OAuth2Redirect />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
