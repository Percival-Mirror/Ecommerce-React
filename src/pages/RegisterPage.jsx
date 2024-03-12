import { Link, useLocation, useNavigate } from "react-router-dom"
import "../css/login.css"
import googlelogo from "../assets/icons/google.png"
import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { updateCurrentUser, updateProfile } from "firebase/auth"

export const RegisterPage = () => {

    const { signUpWithGoogle, createUser } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/";
    const [errorMessage, setErrorMessage] = useState("")

    const handleRegister = () => {
        signUpWithGoogle(email, password).then((result) => {
            const user = result.user
            navigate(from, { replace: true })
        }).catch((error) => {
            const errorMsg = error.message
            setErrorMessage('Ingrese correo y contraseña válidos')
        })
    }

    const HandleSignUp = (e) => {
        e.preventDefault()
        const form = e.target
        const userName = form.name.value
        const email = form.email.value
        const password = form.password.value
        const confirmPassword = form.confirmPassword.value
        console.log(userName, email, password, confirmPassword)

        if (password.length < 6) {
            setErrorMessage("La contraseña debe tener mas de 6 dígitos")
        } else {
            if (confirmPassword !== password) {
                setErrorMessage("Las contraseñas no coinciden")
            } else {
                setErrorMessage("")
                createUser(email, password).then((userCredential) => {
                    const user = userCredential.user
                    updateProfile(user, { displayName: userName }).then(() => {
                        alert(`Bienvenido ${userName}`)
                        navigate(from, { replace: true })
                    })
                }).catch((error) => {
                    console.log(error.message)
                    alert(error.message)
                })
            }
        }



        // login(email, password).then((result) => {
        //     const user = result.user
        //     alert("Login Succesful")
        //     navigate(from, { replace: true })
        // }).catch((error) => {
        //     const errorMsg = error.message
        //     setErrorMessage('Ingrese correo y contraseña válidos')
        // })
    }

    return (
        <div className="login-section">
            <div className="logo-clifarma">
                <img src="shopall.svg"></img>
                <h3>Shop<span>all</span></h3>
            </div>
            <div className="login-container">
                <div className="login-wrapper">
                    <h3>Create Account</h3>
                    <hr></hr>
                    <form action="" onSubmit={HandleSignUp}>
                        <div className="input-wrapper">
                            <label htmlFor="name">Name:</label>
                            <input placeholder="Name and Lastname..." name="name" id="name" type="text" required></input>
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="email">Email:</label>
                            <input placeholder="Email..." name="email" id="email" type="email" required></input>
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password:</label>
                            <input placeholder="Password..." name="password" id="password" type="password" required></input>
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="confirm-password">Confirm Password:</label>
                            <input placeholder="Password..." name="confirnmPassword" id="confirmPassword" type="password" required></input>
                        </div>

                        <button className="btn btn-primary">Create Account</button>
                    </form>
                    <div>
                        {errorMessage && (
                            <div className="error-msg">
                                {errorMessage}
                            </div>
                        )}
                    </div>
                    <hr></hr>
                    <div className="register-wrapper">
                        <span>Already got an account? <Link to="/login">Login</Link></span>
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
