import { uploads } from "../../utils/config"

// Components
import Message from "../../components/Message"
import { Link } from "react-router-dom"
import PhotoItem from "../../components/PhotoItem"

// Hooks
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { getPhoto } from "../../slices/photoSlice"

// Redux

const Photo = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { 
        photo,
        loading,
        error,
        message
    } = useSelector((state) => state.photo)

    // Comments

    // Load photo data
    useEffect(() => {
        dispatch(getPhoto(id))
    }, [dispatch, id])

    // Likes and comments


    return (
        <div>
            <PhotoItem photoData={photo} user={user} />
        </div>
    )
}

export default Photo