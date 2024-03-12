import { Badge } from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'
import '../css/nav.css'
import { NavLink, Navigate, useNavigate } from 'react-router-dom'
import { navHelper } from '../helpers/navHelper'
import { useContext, useEffect, useState } from 'react'
import { SearchBar } from './SearchBar'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'
import { UserCard } from './userCard'

export const NavBar = () => {

    const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"]

    const { user } = useContext(AuthContext)

    const { shopList } = useContext(CartContext)

    const { show, showMenu, menuShow } = navHelper()

    console.log(user)

    return (
        <header className="">
            <div className="nav-primary-container">
                <NavLink to="/" className="nav-left">
                    <img src='shopall.svg'></img>
                    <h1 className="">Shop<span>all</span></h1>
                </NavLink>
                <div id='nav-mid-desktop' className='nav-mid'>
                    <SearchBar></SearchBar>
                </div>
                <div className='nav-right'>
                    <div className='sesion-container'>
                        {
                        user == null?
                        <NavLink to="/login" className="login-link">
                            Login
                        </NavLink>
                        :
                        <UserCard></UserCard>
                        }
                    </div>
                    <NavLink to="/cart">
                        <Badge badgeContent={shopList.length} color="primary">
                            <ShoppingCart color="action" />
                        </Badge>
                    </NavLink>
                    <input type="checkbox" id="checkbox" onClick={showMenu} checked={show}></input>
                    <label for="checkbox" className="toggle">
                        <div className="bars" id="bar1"></div>
                        <div className="bars" id="bar2"></div>
                        <div className="bars" id="bar3"></div>
                    </label>
                </div>
            </div>
            <div id='nav-mid-responsive' className='nav-mid'>
                <SearchBar></SearchBar>
            </div>
            <div className={"menu-secondary-bg" + " " + menuShow} onClick={showMenu}>
            </div>
            <div className={'nav-secondary-container' + ' ' + menuShow}>
                <div className='nav-secondary'>
                    <h1>Shopall</h1>
                    <div className='menu-tabs'>
                        <ul>
                            <li>
                                <NavLink to='/'>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='/shop'>Shop</NavLink>
                            </li>
                            <li>
                                <NavLink to='/contact'>Contact</NavLink>
                            </li>
                        </ul>
                    </div>
                    <hr></hr>
                    <h3>Categories</h3>
                    <div className='menu-tabs'>
                        <ul>
                            {categories.map(category => {
                                return <li><NavLink to='/shop' state={{category: category, input: "" }}>{category}</NavLink></li>
                            })}
                            <li><NavLink>See More</NavLink></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}
