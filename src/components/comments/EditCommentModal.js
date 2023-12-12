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

export default function EditCommentModal({ isOpen, setIsOpen, commentText, commentId, recipeId }) {
    
    const [text, setText] = useState(commentText);
    const toggle = () => setIsOpen(!isOpen);
    const queryClient = useQueryClient();

    const handleSave = async () => {
        try {
            const response = await put(`comments/${commentId}`, { text: text });
            if (response.success) {
                queryClient.invalidateQueries(['comments', recipeId]);
                toggle()
                console.log('comment edited!')
            } else {
                console.log('comment not edited :(')
            }
        } catch (err) {
            console.error(err);
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
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
    )
}
