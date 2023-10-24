import { StyledEngineProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/Login/LoginPage'
import Main from './Main'
import { isUserAuthenticated } from './authentication'

function App() {
    const isAuthenticated = isUserAuthenticated('', '')

    return (
        <StyledEngineProvider injectFirst>
            <CssBaseline />
            <Routes>
                <Route
                    path="/login"
                    element={
                        isAuthenticated ? <Navigate to="/" /> : <LoginPage />
                    }
                />
                <Route
                    path="/"
                    element={
                        isAuthenticated ? <Main /> : <Navigate to="/login" />
                    }
                ></Route>
            </Routes>
        </StyledEngineProvider>
    )
}

export default App
