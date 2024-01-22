import {
    Button,
    Input,
    Modal,
    ModalHeader,
    ModalBody } from 'reactstrap';
import { useState, useEffect } from 'react';
import { useQueryClient, useQuery } from 'react-query';
import { post } from '../../utils/fetch';
import { validate } from '../../utils/formValidation';
import Loading from '../Loading';

export default function CommentModal({ recipeId, setIsOpen, isOpen }) {
    const { data } = useQuery('currentUser', () => post('users'));
    const [text, setText] = useState('');
    const [formErr, setFormErr] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const queryClient = useQueryClient();

    useEffect(() => {
      const error = validate(3, 500, text);
      if (error.msg) {
        setFormErr(error.msg);
      } else {
        setFormErr("");
      }
    }, [text]);

    const handleSave = async () => {
      setIsLoading(true);
      try {
          const response = await post('comments', {
              authorId: data.user?._id,
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
            type='textarea'
            value={text}
            onChange={(e) => { setText(e.target.value) }}
          />
          {
            formErr && <p className='form-err'>{formErr}</p>
          }
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