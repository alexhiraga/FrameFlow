import { uploads } from "../../utils/config"

// Components
import { Link } from "react-router-dom"
import PhotoModal from "../../components/PhotoModal"

// Hooks
import { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

// Redux
import { getUserDetails } from "../../slices/userSlice"
import { publishPhoto, resetMessage, getUserPhotos, deletePhoto } from "../../slices/photoSlice"
import { BsBoxArrowUpRight, BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs"

const Profile = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const modalRef = useRef()

    const { user, loading } = useSelector((state) => state.user)
    const { user: userAuth } = useSelector((state) => state.auth)
    const { 
        photos, 
        loading: loadingPhoto, 
        message: messagePhoto, 
        error: errorPhoto 
    } = useSelector((state) => state.photo) 

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")

    const [hovered, setHovered] = useState([]);

    const handleMouseEnter = (e, index) => {
        const newArray = [...hovered]
        newArray[index] = true
        setHovered(newArray);
    };

    const handleMouseLeave = (e, index) => {
        const newArray = [...hovered]
        newArray[index] = false
        setHovered(newArray);
    };

    useEffect(() => {
        const filledArray = [] 
        for(let i in photos) {
            filledArray.push(false)
        }
        setHovered(filledArray)
    }, [photos])
    // New form and edit form refs
    const newPhotoForm = useRef()
    const editPhotoForm = useRef()

    // Load user data
    useEffect(() => {
        dispatch(getUserDetails(id))
        dispatch(getUserPhotos(id))
    }, [dispatch, id])

    const handleFile = (e) => {
        const image = e.target.files[0]

        setImage(image)
    }

    const resetComponentMessage = () => {
        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)
    }

    const submitHandle = (e) => {
        e.preventDefault()

        const photoData = {
            title,
            image
        }

        const photoFormData = Object.keys(photoData)
            .reduce((formData, key) => {
                formData.append(key, photoData[key])
                return formData
            }, new FormData())

        dispatch(publishPhoto(photoFormData))

        setTitle("")

        resetComponentMessage()

    }
    
    const handleDelete = (id) => {
        dispatch(deletePhoto(id))

        resetComponentMessage()
    }

    const handleOpenModal = (e, photo, user) => {
        modalRef.current.openModal(photo, user)
    }

    return (

        <div className="mx-auto my-10 max-w-5xl ">
            <div className="flex gap-10 m-5">
                <div>
                    {user.profileImage && (
                        <img 
                            src={`${uploads}/users/${user.profileImage}`} 
                            alt={user.name} 
                            className="w-52 h-52 object-cover rounded-full"
                        />
                    )}
                </div>
                <div>
                    <h2 className="mt-5 font-bold">{user.name}</h2>
                    <p className="m-2 mb-4 text-gray-200">{user.bio}</p>
                    {id === userAuth._id && (
                        <Link to="/profile"
                            className="px-4 py-1 text-sm bg-logo-400 rounded hover:bg-logo-500 transition-colors"
                        >
                            Edit profile
                        </Link>
                    )}
                </div>
            </div>

            <hr className="border-logo-600 my-7" />

            <div>
                <div className="grid grid-cols-3 gap-4">
                    {photos && photos.map((photo, index) => (
                        <div key={photo._id}>
                            {photo.image && (
                                <div 
                                    className="relative"
                                    onMouseEnter={(e) => handleMouseEnter(e, index)}
                                    onMouseLeave={(e) => handleMouseLeave(e, index)}
                                >
                                    <PhotoModal ref={modalRef} />
                                    <img 
                                        src={`${uploads}/photos/${photo.image}`}
                                        alt={photo.title}
                                        className="w-full object-cover aspect-square"
                                    />

                                    {hovered[index] && (
                                        id === userAuth._id ? (
                                            <div className="absolute top-0 left-0 w-full h-full bg-gray-900/75 flex justify-center text-center">
                                                <div className="my-auto flex gap-7 text-xl">
                                                    <Link to={`/photos/${photo._id}`}>
                                                        <BsFillEyeFill />
                                                    </Link>
                                                    <BsPencilFill onClick={(e) => handleOpenModal(e, photo, user)} />
                                                    <BsXLg onClick={() => handleDelete(photo._id) }/>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <Link 
                                                    className="absolute top-0 left-0 w-full h-full bg-gray-900/75 flex justify-center text-center"
                                                    to={`/photos/${photo._id}`}
                                                >
                                                    <BsBoxArrowUpRight className="my-auto w-6 h-6" />
                                                </Link>
                                            </div>
                                        )
                                    )}

                                </div>
                            )}
                        </div>
                    ))}
                    {photos.length === 0 && 
                        <p>No photos published.</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile