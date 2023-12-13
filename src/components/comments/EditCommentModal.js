import {
    Button,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter } from 'reactstrap';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { put } from '../../utils/fetch';
import '../../css/modals.css';
import Loading from '../Loading';

export default function EditCommentModal({ isOpen, setIsOpen, commentText, commentId, recipeId }) {
    
    const [text, setText] = useState(commentText);
    const [isLoading, setIsLoading] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const queryClient = useQueryClient();

    const handleSave = async () => {
      setIsLoading(true);
        try {
            const response = await put(`comments/${commentId}`, { text: text });
            if (response.success) {
                queryClient.invalidateQueries(['comments', recipeId]);
                toggle()
                console.log('comment edited!')
                setIsLoading(false);
            } else {
                console.log('comment not edited :(')
                setIsLoading(false);

            }
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        }
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalHeader>Edit Comment</ModalHeader>
          <ModalBody>
            <Input 
              value={text}
              onChange={(e) => { setText(e.target.value) }}
            />
            {
              isLoading
              ? (<Loading />)
              : (
                <div className='yes-no-btns'>
                  <Button className='pink-btn' onClick={handleSave}>Save</Button>
                  <Button className='grey-btn' onClick={toggle}>Cancel</Button>
                </div>
              )
            }
          </ModalBody>
        </Modal>
    )
}
