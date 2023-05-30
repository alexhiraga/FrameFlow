import { BsChat, BsHeart, BsHeartFill } from 'react-icons/bs'
import moment from 'moment'

const LikeAndCommentContainer = ({ photo, user, handleLike, handleComment, setCommentText, commentText }) => {
    return (
        <div>
            <div className="p-4">
                {photo.likes && user && (
                    <>
                        <div className="flex flex-start gap-3 align-middle">
                            {photo.likes.includes(user._id) ? (
                                <BsHeartFill className="w-6 h-6 text-red-500 cursor-pointer" />
                            ) : (
                                <BsHeart className="w-6 h-6 cursor-pointer" onClick={(() => handleLike(photo))} />
                            )}

                            <BsChat className="w-6 h-6 cursor-pointer" />
                        </div>
                        <p className="mt-2 font-bold">{photo.likes.length} likes</p>
                        <span className="text-xs text-gray-400">
                            {moment(photo.createdAt).format("LL")}
                        </span>
                    </>
                )}
            </div>

            <div className="border-t border-stone-500">
                <form onSubmit={handleComment} >
                    <div className="flex justify-between">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            className="border-none mt-1 text-sm"
                            style={{ width: '-webkit-fill-available' }}
                            onChange={(e) => setCommentText(e.target.value)}
                            value={commentText || ""}
                        />
                        <input type="submit" value="Publish"
                            style={{
                                backgroundColor: 'transparent',
                                margin: '0',
                                padding: '0 1rem',
                                fontSize: '16px',
                                fontWeight: '400',
                                color: commentText.length > 0 ? '#49beb7' : 'gray'
                            }}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LikeAndCommentContainer