import { uploads } from "../utils/config"
import './PhotoItem.css'
import { Link } from "react-router-dom"
import { BsPersonFill, BsThreeDots } from "react-icons/bs"
import { useDispatch } from "react-redux"

import moment from 'moment'
import LikeAndCommentContainer from "./LikeAndCommentContainer"
import { comment, like } from "../slices/photoSlice"
import { useState } from "react"

const PhotoItem = ({ photoData, user }) => {
    const dispatch = useDispatch()
    const [commentText, setCommentText] = useState("")
    const [photo, setPhoto] = useState({})

    // Insert Like
    const handleLike = () => {
        dispatch(like(photoData._id))
    }

    // Insert comment
    const handleComment = (e) => {
        e.preventDefault()
        setPhoto(photoData)
        console.log('photo', photo)

        const commentData = {
            comment: commentText,
            id: photoData._id
        }
        

        dispatch(comment(commentData))
        setCommentText("")
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="border border-stone-500 w-full flex max-h-[674px]">
                <div className="aspect-square">
                    {photoData.image && (
                        <img 
                            src={`${uploads}/photos/${photoData.image}`}
                            alt={photoData.title}
                            className="aspect-square object-cover max-w-2xl"
                        />                        
                    )}
                </div>

                <div className="w-96">

                    <div className="flex flex-col justify-between h-full">

                        {/* User name */}
                        <div className="flex justify-between align-middle p-4 border-b border-stone-500">
                            <div className="flex gap-4 ">
                                {photoData.profileImage ? (
                                    <img 
                                        src={`${uploads}/users/${photoData.profileImage}`} 
                                        alt={photoData.userName} 
                                        className="w-8 h-8 object-cover rounded-full"
                                    />
                                ) : (
                                    <BsPersonFill className="w-8 h-8" />
                                )}
                                <span className="font-bold my-auto">
                                    {photoData.userName}
                                </span>
                            </div>
                            <div className="my-auto">
                                <BsThreeDots />
                            </div>
                        </div>


                        {/* Description */}
                        <div style={{ height: '100%', overflow: 'auto'}} id="hideScrollbar">
                            <div className="p-4 flex gap-4">
                                {photoData.profileImage ? (
                                    <img 
                                        src={`${uploads}/users/${photoData.profileImage}`} 
                                        alt={photoData.userName} 
                                        className="w-8 h-8 object-cover rounded-full"
                                    />
                                ) : (
                                    <BsPersonFill className="w-8 h-8" />
                                )}
                                <div>
                                    <span className="font-bold mr-2">
                                        {photoData.userName}
                                    </span>
                                    <span>
                                        {photoData.title}
                                    </span>
                                    <br />
                                    <span className="text-gray-400 text-xs">
                                        {moment(photoData.createdAt).fromNow()}
                                    </span>
                                </div>
                                
                            </div>
                            {/* Comments */}

                            {photoData.comments && photoData.comments.map((comment) => (
                                <div className="p-4 flex gap-4" key={comment.comment}>
                                    {comment.userImage ? (    
                                        <img 
                                            src={`${uploads}/users/${comment.userImage}`} 
                                            alt={comment.userName} 
                                            className="w-8 h-8 object-cover rounded-full"
                                        />
                                    ) : (
                                        <BsPersonFill className="w-8 h-8" />
                                    )}
                                    <div>
                                        <Link className="font-bold mr-2" to={`/users/${comment.userId}`}>
                                            {comment.userName}
                                        </Link>
                                        <span>
                                            {comment.comment}
                                        </span>
                                        <br />
                                        <span className="text-gray-400 text-xs">
                                            {moment(comment.createdAt).fromNow()}
                                        </span>
                                    </div>
                                </div>
                            ))}

                        </div>

                        {/* Likes and add comment */}
                        <div className="border-t border-stone-500">
                            <LikeAndCommentContainer 
                                photo={photoData} 
                                user={user} 
                                handleLike={handleLike} 
                                handleComment={handleComment}
                                setCommentText={setCommentText}
                                commentText={commentText}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PhotoItem