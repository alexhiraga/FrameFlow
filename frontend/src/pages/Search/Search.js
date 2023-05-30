import Logo from '../../assets/FRAMEFLOW-LOGO-transparent.png'

// Hooks
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

// components
import { Link } from "react-router-dom"
import { searchPhotos } from '../../slices/photoSlice'
import { uploads } from '../../utils/config'
import { BsBoxArrowUpRight, BsFolderX } from 'react-icons/bs'

// redux

const Search = () => {
    const [query, setQuery] = useState("")
    const [isSearched, setIsSearched] = useState(false)

    const dispatch = useDispatch()

    const { photos, loading } = useSelector((state) => state.photo)

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

    const handleSearch = (e) => {
        e.preventDefault()
        if(query) {
            dispatch(searchPhotos(query))
            setIsSearched(true)
        }
    }
    return (
        <div>
            <div>
                <div className="max-w-xl text-center mx-auto">
                    <img src={Logo} className="w-40 mx-auto" alt="logo"/>
                    <p className="text-gray-300 text-sm">Discover the Unseen Gems: Unleash the Artistic Explorer Within!</p>
                    <form onSubmit={handleSearch} className="mt-4">
                        <input type="text" placeholder="Search" onChange={(e) => setQuery(e.target.value)} />
                    </form>
                </div>

                {isSearched && (
                    <>
                        <div className="grid grid-cols-3 gap-4 max-w-3xl text-center mx-auto mt-10">
                            {photos && photos.map((photo, index) => (
                                <div key={photo._id}>
                                    {photo.image && (
                                        <div 
                                            className="relative"
                                            onMouseEnter={(e) => handleMouseEnter(e, index)}
                                            onMouseLeave={(e) => handleMouseLeave(e, index)}
                                        >
                                            <img 
                                                src={`${uploads}/photos/${photo.image}`}
                                                alt={photo.title}
                                                className="w-full object-cover aspect-square"
                                            />

                                            {hovered[index] && (
                                                <div>
                                                    <Link 
                                                        className="absolute top-0 left-0 w-full h-full bg-gray-900/75 flex justify-center text-center"
                                                        to={`/photos/${photo._id}`}
                                                    >
                                                        <BsBoxArrowUpRight className="my-auto w-6 h-6" />
                                                    </Link>
                                                </div>
                                            )}

                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        {photos.length === 0 && 
                            <div className="text-center my-10">
                                <BsFolderX className="w-12 h-12 mx-auto mb-3 text-red-300" />
                                <p className="text-sm text-gray-300 text-center ">Enigmatic Horizons: Seek Beyond the Veil, Yet the Muse Eludes.</p>
                            </div>
                        }
                    </>
                )}
            </div>
        </div>
    )
}

export default Search