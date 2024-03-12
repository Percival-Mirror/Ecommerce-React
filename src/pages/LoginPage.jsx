import { Link, useLocation, useNavigate } from "react-router-dom"
import "../css/login.css"
import googlelogo from "../assets/icons/google.png"
import app from '../firebase/firebase.config'
import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"

export const LoginPage = () => {

    const { signUpWithGoogle, login } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/";

    const [errorMessage, setErrorMessage] = useState("")

    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        console.log(email, password)

        login(email, password).then((result) => {
            const user = result.user
            alert("Login Succesful")
            navigate(from, { replace: true })
        }).catch((error) => {
            const errorMsg = error.message
            setErrorMessage('Ingrese correo y contraseña válidos')
            console.log("ubo un errooooor")
        })
    }

    const handleRegister = () => {
        signUpWithGoogle(email, password).then((result) => {
            const user = result.user
            navigate(from, { replace: true })
        }).catch((error) => {
            const errorMsg = error.message
            setErrorMessage('Ingrese correo y contraseña válidos')
            console.log("ubo un errooooor")
        })
    }

    return (
        <div className="login-section">
            <div className="logo-clifarma">
                <img src="shopall.svg"></img>
                <h3>Shop<span>all</span></h3>
            </div>
            <div className="login-container">
                <div className="login-wrapper">
                    <h3>Login</h3>
                    <hr></hr>
                    <form action="" onSubmit={handleLogin}>
                        <div className="input-wrapper">
                            <label htmlFor="email">Email:</label>
                            <input placeholder="Email..." name="email" id="email" type="email" required></input>
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password:</label>
                            <input placeholder="Password..." name="password" id="password" type="password" required></input>
                        </div>
                        <div className="remember-account">
                            <div>
                                <span>Remember me</span>
                                <input type="checkbox" />
                            </div>
                            <Link>¿Forgot password?</Link>
                        </div>
                        <button className="btn btn-primary">Login</button>
                    </form>
                    <div>
                        {errorMessage && (
                            <div className="error-msg">
                                Email or Password incorrect.
                            </div>
                        )}
                    </div>
                    <hr></hr>
                    <div className="register-wrapper">
                        <span>¿Don't have an account? <Link to="/register">Register</Link></span>
                        <div className="divider">
                            <hr />
                            <span>Or</span>
                            <hr />
                        </div>
                        <div className="google-login">
                            <button onClick={handleRegister}><span>Login with Google</span><img src={googlelogo}></img></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
