import Logo from '../../assets/FRAMEFLOW-LOGO-transparent.png'

// Components
import { Link } from "react-router-dom"
import Message from "../../components/Message"

// Hooks
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

// Redux
import { login, reset } from '../../slices/authSlice'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const { loading, error } = useSelector((state) => state.auth)

    const handleLogin = (e) => {
        e.preventDefault()

        const user = {
            email,
            password
        }

        dispatch(login(user))
    }

    // Clean all auth states
    useEffect(() => {
        dispatch(reset())
    }, [dispatch])

    return (
        <div className="w-[500px] text-center align-middle mx-auto bg-zinc-900 border border-white p-16">
            <img src={Logo} alt="FrameFlow logo" className="w-44 h-44 -mt-6 mx-auto" />
            <p className="text-gray-400 text-sm mb-5">Stay connected: Sign in to FrameFlow now!</p>
            {error && <Message msg={error} type="error" />}
            <form onSubmit={handleLogin}>
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
                {!loading && <input type="submit" value="Sign In" />}
                {loading && <input type="submit" value="Loading..." disabled />}
            </form>
            <p>Not registered? <Link to="/register" className='underline text-logo-400 hover:text-logo-300 transition-colors'>Register now!</Link></p>
        </div>
    )
}

export default Login