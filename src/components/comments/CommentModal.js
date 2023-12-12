import {
    Button,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter } from 'reactstrap';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { post } from '../../utils/fetch';

export default function CommentModal({ userId, recipeId, setIsOpen, isOpen }) {
    const [text, setText] = useState('');
    const toggle = () => setIsOpen(!isOpen);
    const queryClient = useQueryClient();

    const handleSave = async () => {
        try {
            const response = await post('comments', {
                authorId: userId,
                recipeId: recipeId,
                text: text
            });
            if (response.success) {
                queryClient.invalidateQueries(['comments', recipeId]);
                toggle()
                console.log('comment posted!')
            } else {
                console.log('comment not posted :(')
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader>Post Comment</ModalHeader>
        <ModalBody>
          <Input 
            value={text}
            onChange={(e) => { setText(e.target.value) }}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }