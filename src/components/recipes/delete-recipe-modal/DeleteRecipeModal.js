import { Modal, ModalHeader } from 'reactstrap';
import { useState, useEffect } from 'react';
import { del } from '../../../utils/fetch';
import Loading from '../../Loading';

export default function DeleteRecipeModal({ isOpen, setIsOpen, recipeId }) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await del(`recipes/${recipeId}`)
            setSuccess(true);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (success) {
          const timer = setTimeout(() => {
            toggle();
            setSuccess(false);
          }, 1200)
  
          return () => { clearTimeout(timer) }
        }
  
      }, [success])

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader>
                Are you sure?
            </ModalHeader>
            {
                loading
                ? <Loading />
                : success
                ? <div className='success'>Success!</div>
                : (
                    <div className='d-flex justify-content-center py-4'>
                        <button className='pink-btn me-2' onClick={handleDelete}>Delete</button>
                        <button className='grey-btn' onClick={toggle}>Go Back</button>
                    </div>
                )
            }
        </Modal>
    )
}
