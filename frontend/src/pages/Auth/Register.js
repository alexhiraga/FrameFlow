import React from 'react'
import Logo from '../../assets/FRAMEFLOW-LOGO-transparent.png'

// Components
import { Link } from 'react-router-dom'
import Message from '../../components/Message'

// Hooks
import { useState, useEffect } from 'react'

// Redux
import { register, reset } from "../../slices/authSlice"
import { useSelector, useDispatch } from 'react-redux'

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const dispatch = useDispatch()

    const { loading, error } = useSelector((state) => state.auth) 

    const handleSubmit = (e) => {
        e.preventDefault()

        const user = {
            name,
            email,
            password,
            confirmPassword
        }

        dispatch(register(user))
    }

    // Clean all auth states
    useEffect(() => {
        dispatch(reset())
    }, [dispatch])

    return (
        <div className="w-[500px] text-center align-middle mx-auto bg-zinc-900 border border-white p-16">
            <img src={Logo} alt="FrameFlow logo" className="w-44 h-44 -mt-6 mx-auto" />
            <p className="text-gray-400 text-sm mb-5">Unlock a world of connections: Join FrameFlow today!</p>
            {error && <Message msg={error} type="error" />}
            <form onSubmit={handleSubmit}>
                <label className="mt-3">Name:</label>
                <input 
                    type="text" 
                    placeholder="Name" 
                    onChange={(e) => setName(e.target.value)}
                    value={name || ''}
                />
                <label className="mt-3">E-mail:</label>
                <input 
                    type="email" 
                    placeholder="E-mail" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email || ''}
                />
                <label className="mt-3">Password:</label>
                <input 
                    type="password" 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password || ''}
                />
                <label className="mt-3">Confirm password:</label>
                <input 
                    type="password" 
                    placeholder="Confirm password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword || ''}
                />
                {!loading && <input type="submit" value="Sign Up" />}
                {loading && <input type="submit" value="Loading..." disabled />}
            </form>
            <p>Already registered? <Link to="/login" className='underline text-logo-400 hover:text-logo-300 transition-colors'>Sign in.</Link></p>
        </div>
    )
}

export default Register