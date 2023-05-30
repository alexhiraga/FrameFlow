import { uploads } from "../../utils/config"

// Hooks
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

// Redux
import { profile, resetMessage, updateProfile } from '../../slices/userSlice'

// Components
import Message from "../../components/Message"
import { BsPersonFill, BsUpload } from "react-icons/bs"

const EditProfile = () => {
    const dispatch = useDispatch()
    const { user, message, error, loading } = useSelector((state) => state.user)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [bio, setBio] = useState("")
    const [previewImage, setPreviewImage] = useState("")

    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    // Load user data
    useEffect(() => {
        dispatch(profile())
    }, [dispatch])

    // Fill form with user data
    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setBio(user.bio)
        }
    }, [user])

    const handleSubmit = async(e) => {
        e.preventDefault()

        // Gather user data from states
        const userData = {
            name
        }

        if(profileImage) userData.profileImage = profileImage
        if(bio) userData.bio = bio
        if(password) userData.password = password

        // build form data
        // const formData = new FormData()
        const userFormData = Object.keys(userData)
            .reduce((formData, key) => {
                formData.append(key, userData[key])
                return formData
            }, new FormData())

        // formData.append("user", userFormData)

        await dispatch(updateProfile(userFormData))

        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)
    }

    const handleFile = (e) => {
        // image preview
        const image = e.target.files[0]

        setPreviewImage(image)

        setProfileImage(image)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="max-w-5xl w-full mx-auto flex mt-10">

                    <div className="w-1/3">
                        <div 
                            className="relative inline-block" 
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave} 
                        >

                            {(user.profileImage || previewImage) ? (
                                <img
                                    src={previewImage ? URL.createObjectURL(previewImage) : `${uploads}/users/${user.profileImage}`}
                                    alt={user.name}
                                    className="w-52 h-52 object-cover rounded-full text-center align-middle mb-4"
                                />
                                ) : (
                                    <BsPersonFill className="w-52 h-52 rounded-full" />
                                )}

                            {hovered && (
                                <div className="absolute top-0 left-0 w-52 h-52 bg-zinc-700/75 flex justify-center rounded-full align-middle text-center">
                                    <label
                                        htmlFor="image-upload"
                                        className="absolute top-0 left-0 w-full h-full cursor-pointer"
                                    />
                                    <span className="text-center align-middle flex flex-col justify-center">
                                        <BsUpload className=" w-10 h-10 text-logo-300 mx-auto"/>
                                        Change profile image
                                    </span>
                                    <input id="image-upload" type="file" onChange={handleFile} className="hidden" />

                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-2/3">
                        <h2 className="mb-5">Edit Profile</h2>
                        {error && <Message msg={error} type="error" />}
                        {message && <Message msg={message} type="success" />}
                        <label>
                            <span>Name:</span>
                            <input type="text" placeholder="Name" value={name || ""} onChange={(e) => setName(e.target.value)} />
                        </label>
                        <label>
                            <span>E-mail:</span>
                            <input type="email" placeholder="E-mail" disabled value={email || ""} />
                        </label>
                        <label>
                            <span>Bio:</span>
                            <textarea placeholder="Your bio" value={bio || ""} onChange={(e) => setBio(e.target.value)} />
                        </label>
                        <label>
                            <span>Change password</span>
                            <input type="password" placeholder="Type your new password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        {!loading && <input type="submit" value="Save" />}
                        {loading && <input type="submit" value="Loading..." disabled />}
                    </div>

                </div>
            </form>
        </>
    )
}

export default EditProfile