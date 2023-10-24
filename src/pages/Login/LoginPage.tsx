import { useState } from 'react'
import { isUserAuthenticated } from '../../authentication'
import { Button, TextField } from '@mui/material'
import './LoginPage.scss'
function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState('')

    const handleLogin = () => {
        if (isUserAuthenticated(username, password)) {
            // Збереження логіну та паролю в локальному сховищі
            localStorage.setItem('username', username)
            localStorage.setItem('password', password)

            window.location.reload()
        } else {
            // Виведення помилки авторизації
            setLoginError('Невірний логін або пароль')
        }
    }

    return (
        <div className="login_page_container">
            <div className="sing_in_container">
                <h3>Authorization</h3>
                <TextField
                    label="Login"
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={loginError !== ''}
                />
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={loginError !== ''}
                />
                {loginError && <p className="error_message">{loginError}</p>}
                <div className="submit_btn_container">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                    >
                        submit
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
