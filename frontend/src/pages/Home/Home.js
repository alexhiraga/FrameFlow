import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPhotos, like } from '../../slices/photoSlice';
import { BsPlusCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import PhotoFeed from '../../components/PhotoFeed';

const Home = () => {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { photos, loading } = useSelector((state) => state.photo)

    // Load all photos
    useEffect(() => {
        dispatch(getPhotos())
    }, [dispatch])

    if(loading) return <p className="text-center my-auto h-96 align-middle">Loading...</p>

    return (
        <div className="flex justify-center">
            <div>
                {photos && photos.map((photo) => (
                    <div key={photo._id}>
                        <PhotoFeed photo={photo} user={user} />
                    </div>
                ))}

                {photos && photos.length === 0 && (
                    <div className="flex flex-col justify-center m-auto text-center h-[90vh]">
                        <Link to="/newpost" >
                            <BsPlusCircle className="w-20 h-20 hover:text-logo-300 transition-colors cursor-pointer mb-5 mx-auto" />
                        </Link>
                        <h4>Ignite <span className="text-logo-400">FrameFlow</span>: Your First Post Awaits!</h4>
                    </div>
                )}
            </div>
        </div>

    )
}

export default Home