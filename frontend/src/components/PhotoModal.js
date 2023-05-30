import { forwardRef, useImperativeHandle, useState } from 'react'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux';
import { resetMessage, updatePhoto } from '../slices/photoSlice';
import { uploads } from '../utils/config';

const PhotoModal = forwardRef((props, ref) => {
    const dispatch = useDispatch()

    const [modalIsOpen, setIsOpen] = useState(false);
    const [image, setImage] = useState("")
    const [title, setTitle] = useState("")
    const [photoId, setPhotoId] = useState("")
    const [userName, setUserName] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [isEditing, setIsEditing] = useState(false)

    const { 
        loading: loadingPhoto, 
    } = useSelector((state) => state.photo) 

    const customStyles = {
        overlay: {
            backgroundColor: 'rgb(0, 0, 0, 0.6)',
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgb(24 24 27)',
            border: 'none',
            borderRadius: '0.75rem',
            padding: '1rem 0',
            maxWidth: '600px'
        },
    };


    function openModal(photo, user) {
        setIsOpen(true);
        if (photo) {
            setImage(photo.image)
            setTitle(photo.title)
            setUserName(photo.userName)
            setProfileImage(user.profileImage)
            setPhotoId(photo._id)
        }
    }

    function afterOpenModal() {
        setIsEditing(false)
    }

    function closeModal() {
        setIsOpen(false);
    }

    useImperativeHandle(ref, () => ({
        openModal: (photo, user) => {
            openModal(photo, user)
        }
    }))

    const toggleEdit = () => {
        if(isEditing) setIsEditing(false)
        if(!isEditing) setIsEditing(true)
    }

    const submitHandle = (e) => {
        e.preventDefault()

        const photoData = {
            title,
            id: photoId
        }

        dispatch(updatePhoto(photoData))

        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)
    }

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Image details"
            >
                <div className="px-5 pb-5 flex justify-between align-middle">
                    <div className="flex align-middle">
                        <img 
                            src={`${uploads}/users/${profileImage}`} 
                            className="w-9 h-9 rounded-full object-cover mr-3" alt={userName}
                            />
                        <h5 className="font-bold my-auto">{userName}</h5>
                    </div>

                    <div className="my-auto">
                        <button onClick={toggleEdit} className="bg-logo-400 px-4 py-1 rounded text-sm m-0">Edit</button>
                    </div>
                </div>
                <img 
                    src={`${uploads}/photos/${image}`} 
                    alt={image} 
                    className="max-w-[600px] object-cover aspect-square"
                />
                <div className="p-5">
                    {isEditing ? (
                        <form onSubmit={submitHandle}>
                            <label>
                                <span className="text-lg">Edit description:</span>
                                <input type="text" placeholder="Insert a description" onChange={(e) => setTitle(e.target.value)} value={title || ""} />
                            </label>
                            {!loadingPhoto && <input type="submit" value="Save" />}
                            {loadingPhoto && <input type="submit" value="Loading..." disabled />}
        
                        </form>
                    ) : (
                        <p>
                            <img 
                                src={`${uploads}/users/${profileImage}`} 
                                className="w-6 h-6 rounded-full object-cover inline mr-2 " alt={userName}
                            />
                            <span className="font-bold mr-2">
                                {userName}
                            </span>
                            {title}
                        </p>
                    )}
                </div>
                {/* <button onClick={closeModal}>close</button> */}
            </Modal>
        </>
    )
})

export default PhotoModal