import {
  Button,
  Modal,
  ModalHeader,
  ModalBody } from 'reactstrap';
import { useQueryClient } from 'react-query';
import { put } from '../../utils/fetch';
import '../../css/modals.css';

export default function DeleteCommentModal({ isOpen, setIsOpen, commentId, recipeId }) {

  const queryClient = useQueryClient();
  const toggle = () => setIsOpen(!isOpen);

  const deleteComment = async () => {
    try {
      const response = await put(`comments/delete/${commentId}`);
      if (response.success) {
          queryClient.invalidateQueries(['comments', recipeId]);
          toggle()
          console.log('comment deleted!')
      } else {
          console.log('comment not deleted :(')
      }
    } catch (err) {
        console.error(err);
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>Are you sure you want to delete your comment?</ModalHeader>
      <ModalBody className='yes-no-btns'>
        <Button onClick={deleteComment}>Yes</Button>
        <Button onClick={toggle}>No</Button>
      </ModalBody>
    </Modal>
  )
}
 