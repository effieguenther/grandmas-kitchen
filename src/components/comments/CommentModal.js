import {
    Button,
    Input,
    Modal,
    ModalHeader,
    ModalBody } from 'reactstrap';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { post } from '../../utils/fetch';
import Loading from '../Loading';

export default function CommentModal({ userId, recipeId, setIsOpen, isOpen }) {
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const queryClient = useQueryClient();

    const handleSave = async () => {
      setIsLoading(true);
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
              setIsLoading(false);
          } else {
              console.log('comment not posted :(')
              setIsLoading(false);
          }
      } catch (err) {
          console.error(err);
          setIsLoading(false);
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
          {
            isLoading
            ? (<Loading />)
            : (
              <div className='yes-no-btns'>
                <Button onClick={handleSave} className='pink-btn'>Save</Button>
                <Button onClick={toggle} className='grey-btn'>Cancel</Button>
              </div>
            )
          }
        </ModalBody>
      </Modal>
    )
  }