import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import "../css/profile.css"
import { useNavigate } from 'react-router-dom'

export const UserCard = () => {

    const { user, logout } = useContext(AuthContext)
    
    const [profileShow, setProfileShow] = useState("hidden")

    const navigate = useNavigate()

    const userName = user.displayName

    const handleProfileShow = () => {
        if (profileShow == "hidden"){
            setProfileShow("shown")
        }else{
            setProfileShow("hidden")
        }
    }

    const handleLogOut = () =>{
        logout()
        navigate("/")
    }

    return (
        <div className='profile-wrapper'>
            <div className='profile-button' onClick={() => handleProfileShow()}>
                {
                    user.photoURL == null ? userName.charAt(0).toUpperCase()
                        :
                        <img src={user.photoURL}></img>
                }
            </div>
            <div className={`profile-options ${profileShow}`}>
                <ul>
                    <li>Perfil</li>
                    <hr />
                    <li onClick={() => handleLogOut()}>Cerrar Sesión</li>
                </ul>
            </div>
        </div>
    )
}
