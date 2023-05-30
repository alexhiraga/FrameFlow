import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux';
import { getPhoto, resetMessage, updatePhoto } from '../slices/photoSlice';
import { uploads } from '../utils/config';
import PhotoItem from './PhotoItem';

const PhotoFeedModal = forwardRef((props, ref) => {
    const dispatch = useDispatch()

    const [modalIsOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({})

    const [photo, setPhoto] = useState({})

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
            padding: '1rem 0',
        },
    };


    function openModal(photoData, user) {
        if(user) setUser(user)
        setPhoto(photoData)
        if(photo) setIsOpen(true);
    } 

    function afterOpenModal() {
    }

    function closeModal() {
        setIsOpen(false);
    }

    useImperativeHandle(ref, () => ({
        openModal: (photoData, user) => {
            openModal(photoData, user)
        }
    }))

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Image details"
            >
                <PhotoItem photoData={photo} user={user} />
            </Modal>
        </>
    )
})

export default PhotoFeedModal