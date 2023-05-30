import { useRef, useState } from "react"
import { BsUpload } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import Message from "../../components/Message"
import { useNavigate } from "react-router-dom"
import { publishPhoto, resetMessage } from "../../slices/photoSlice"

const NewPost = () => {

    // const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth)

    // const { user, loading } = useSelector((state) => state.user)
    // const { user: userAuth } = useSelector((state) => state.auth)
    const { 
        // photos, 
        loading: loadingPhoto, 
        message: messagePhoto, 
        error: errorPhoto 
    } = useSelector((state) => state.photo) 

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [imagePreview, setImagePreview] = useState("")
    
    // New form and edit form refs
    const newPhotoForm = useRef()

    const handleFile = (e) => {
        if(!e.target.files || !e.target.files[0]) return

        const image = e.target.files[0]

        setImage(image)

        // Create a preview for the image
        const reader = new FileReader()

        reader.onload = () => {
            setImagePreview(reader.result)
        }

        reader.readAsDataURL(image);
    }

    const resetComponentMessage = () => {
        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)
    }

    const submitHandle = async(e) => {
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

    return (
        <div className="max-w-2xl mx-auto my-10">

            <div ref={newPhotoForm}>
                <h3 className="mb-5">New post</h3>

                {errorPhoto && <Message msg={errorPhoto} type="error" />}
                {messagePhoto && <Message msg={messagePhoto} type="success" />}

                <form onSubmit={submitHandle}>

                    {image ? (
                        <img src={imagePreview} alt="preview" className="w-full aspect-square object-cover" />
                    ) : (
                        <>
                            <label
                                className="flex justify-center h-[450px] w-[450px] mx-auto px-4 transitio border-2 border-logo-400 border-dashed rounded appearance-none cursor-pointer hover:border-logo-200 transition-colors hover:text-logo-200 focus:outline-none"
                            >
                                <span className="flex flex-col items-center space-x-2">
                                    <BsUpload className="w-10 h-10" />
                                    <span className="text-lg mt-3">
                                        Drop files to Attach
                                    </span>
                                </span>
                                <input type="file" name="file_upload" className="hidden" onChange={handleFile} />
                            </label>
                        </>
                    )}
                
                    <label>
                        <span className="text-lg mt-3">Description:</span>
                        <input type="text" placeholder="Insert a description" onChange={(e) => setTitle(e.target.value)} value={title || ""} />
                    </label>
                    {!loadingPhoto && <input type="submit" value="Post" />}
                    {loadingPhoto && <input type="submit" value="Loading..." disabled />}

                </form>
            </div>
        </div>
    )
}

export default NewPost