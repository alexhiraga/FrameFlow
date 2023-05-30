import { uploads } from "../utils/config"
import './PhotoItem.css'
import { Link } from "react-router-dom"
import { BsChat, BsHeart, BsHeartFill, BsPersonFill, BsThreeDots } from "react-icons/bs"
import { useDispatch } from "react-redux"

import moment from 'moment'
import { comment, like } from "../slices/photoSlice"
import { useRef, useState } from "react"
import PhotoFeedModal from "./PhotoFeedModal"

const PhotoFeed = ({ photo, user }) => {
    const dispatch = useDispatch()
    const [commentText, setCommentText] = useState("")
    const modalRef = useRef()

    // Insert Like
    const handleLike = () => {
        dispatch(like(photo._id))
    }

    // Insert comment
    const handleComment = (e) => {
        e.preventDefault()
        const commentData = {
            comment: commentText,
            id: photo._id
        }

        dispatch(comment(commentData))
        setCommentText("")
    }
    const handleOpenModal = (e, photo, user) => {
        modalRef.current.openModal(photo, user)
    }

    return (
        <div className="max-w-xl mx-auto">
            <PhotoFeedModal ref={modalRef} />
            <div className="w-full">
                {/* User name */}
                <div className="flex justify-between align-middle p-3 border-b ">
                    <div className="flex gap-3 ">
                        {photo.profileImage ? (
                            <img 
                                src={`${uploads}/users/${photo.profileImage}`} 
                                alt={photo.userName} 
                                className="w-8 h-8 object-cover rounded-full"
                            />
                        ) : (
                            <BsPersonFill className="w-8 h-8" />
                        )}
                        <Link className="font-bold my-auto" to={`/users/${photo.userId}`}>
                            {photo.userName}
                        </Link>
                        <span className="text-gray-400 text-xs my-auto">
                            {moment(photo.createdAt).fromNow()}
                        </span>
                    </div>
                    <div className="my-auto">
                        <BsThreeDots />
                    </div>
                </div>
                
                {/* Image */}
                <div className="aspect-square">
                    {photo.image && (
                        <img 
                            src={`${uploads}/photos/${photo.image}`}
                            alt={photo.title}
                            className="aspect-square object-cover max-w-xl"
                        />                        
                    )}
                </div>

                <div className="p-3">
                    {/* Like and comment buttons */}
                    <div className="flex flex-start gap-3 align-middle">
                        {photo.likes.includes(user._id) ? (
                            <BsHeartFill className="w-6 h-6 text-red-500 cursor-pointer" />
                        ) : (
                            <BsHeart className="w-6 h-6 cursor-pointer" onClick={(() => handleLike(photo))} />
                        )}

                        <BsChat className="w-6 h-6 cursor-pointer" onClick={(e) => handleOpenModal(e, photo, user)} />
                    </div>

                    {/* Likes */}
                    {photo.likes.length > 0 && (
                        <div className="flex flex-start gap-3 align-middle mt-3">
                            <span className="font-semibold">
                                {photo.likes.length} {photo.likes.length > 1 ? (
                                    <>likes</>
                                ) : (
                                    <>like</>
                                )}
                            </span>
                        </div>
                    )}

                    {/* Description */}
                    <div>
                        <div className="py-3 flex gap-3">
                            <div>
                                <Link className="font-bold mr-2" to={`/users/${photo.userId}`}>
                                    {photo.userName}
                                </Link>
                                <span>
                                    {photo.title}
                                </span>
                            </div>
                            
                        </div>
                        {/* Comments */}

                        {photo.comments && photo.comments.length > 0 && (
                            <p className="text-gray-400 text-xs cursor-pointer" onClick={(e) => handleOpenModal(e, photo, user)}>
                                {photo.comments.length && photo.comments.length > 1 && (
                                    <>
                                        See all {photo.comments.length} comments
                                    </>
                                )}
                                {photo.comments.length && photo.comments.length == 1 && (
                                    <>
                                        See all {photo.comments.length} comment
                                    </>
                                )}
                            </p>
                        )}

                        {/* Add comment */}
                        <form onSubmit={handleComment} >
                            <input 
                                type="text" 
                                placeholder="Add a comment..." 
                                className="border-none mt-1 text-sm px-0" 
                                style={{ width: '-webkit-fill-available'}}
                                onChange={(e) => setCommentText(e.target.value)}
                                value={commentText || ""}
                            />
                        </form>
                    </div>
                </div>
            </div>
            <hr className="mb-4 border-slate-500"  />
        </div>
    )
}

export default PhotoFeed