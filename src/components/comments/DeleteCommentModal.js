import {
  Button,
  Modal,
  ModalHeader,
  ModalBody } from 'reactstrap';
import { useQueryClient } from 'react-query';
import { useState } from 'react';
import { put } from '../../utils/fetch';
import '../../css/modals.css';
import Loading from '../Loading';

export default function DeleteCommentModal({ isOpen, setIsOpen, commentId, recipeId }) {

  const queryClient = useQueryClient();
  const toggle = () => setIsOpen(!isOpen);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const deleteComment = async () => {
    setError('');
    setIsLoading(true);
    try {
      const response = await put(`comments/delete/${commentId}`);
      if (response.success) {
        queryClient.invalidateQueries(['comments', recipeId]);
        toggle()
        setIsLoading(false);
      } else {
        setError(response.message + ' :(')
        setIsLoading(false);
      }
    } catch (err) {
      setError(err + ' :(');
      setIsLoading(false);
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>Are you sure you want to delete your comment?</ModalHeader>
      <ModalBody>
        {
          isLoading 
          ? (<div className='delete'>
              <Loading />
            </div>)
          : (
            <>
              {
                error && (
                  <p className='err-msg'>{error}</p>
                )
              }
              <div className='delete'>
                <Button onClick={deleteComment} className='pink-btn'>Yes</Button>
                <Button onClick={toggle} className='grey-btn'>No</Button>
              </div>
            </>
          )
        }

      </ModalBody>
    </Modal>
  )
}
 