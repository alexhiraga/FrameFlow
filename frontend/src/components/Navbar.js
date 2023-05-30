import React from 'react'
import Logo from '../assets/FRAMEFLOW-LOGO-transparente.png'
import './Navbar.css'

// Components
import { NavLink, Link } from 'react-router-dom'
import { BsArrowBarRight, BsPencilSquare, BsPersonCheckFill, BsPersonFill, BsPlus, BsSearch } from "react-icons/bs"

// Hooks
import { useAuth } from '../hooks/useAuth'
import { useDispatch, useSelector } from 'react-redux'

// Redux
import { logout, reset } from '../slices/authSlice'
import { uploads } from '../utils/config'

const Navbar = () => {
    const { auth } = useAuth()
    const { user } = useSelector((state) => state.auth)

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())
    }

    return (
        <nav id="nav" className="flex flex-col h-screen fixed left-0 top-0 w-56 bg-zinc-900">
            <Link to="/" className="pt-5 pl-5">
                <img src={Logo} alt="FrameFlow Logo" className="w-16 h-16" />
            </Link>

            <div className="flex flex-col justify-between my-5 font-bold text-lg w-full h-full">
                <ul id="nav-links" className="flex flex-col">
                    {auth ? (
                        <>
                            {user && (
                                <>
                                    <li>
                                        <NavLink to={`users/${user._id}`} className="navbar-btn">
                                            {user.profileImage ? (
                                                <img src={`${uploads}/users/${user.profileImage}`} alt="user" className="w-8 h-8 rounded-full object-cover" />
                                            ) : (
                                                <BsPersonFill className="w-8 h-8 rounded-full" />
                                            )}
                                            <span className="text-white text-current">
                                                {user.name}
                                            </span>
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="newpost" className="navbar-btn">
                                            <BsPlus className="w-8 h-8" />
                                            <span className="text-white text-current">
                                                New post
                                            </span>
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="search" className="navbar-btn">
                                            <BsSearch className="w-5 h-5 mr-3" />
                                            <span className="text-white text-current">
                                                Search
                                            </span>
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <li>

                                <NavLink to="/login" className="navbar-btn">
                                    <BsPersonCheckFill />
                                    <span className="text-white text-current">
                                        Sign in
                                    </span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/register" className="navbar-btn">
                                    <BsPencilSquare />
                                    <span className="text-white text-current">
                                        Sign up
                                    </span>
                                </NavLink>
                            </li>
                        </>
                    )}
                    
                </ul>
                
                {auth && (
                    <>
                        <NavLink to="/" className="navbar-btn">
                            <BsArrowBarRight />
                            <span className="text-white text-current" onClick={handleLogout}>
                                Log out
                            </span>
                        </NavLink>
                    </>
                )}


            </div>
        </nav>
    )
}

export default Navbar