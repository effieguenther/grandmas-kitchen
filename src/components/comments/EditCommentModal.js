import {
    Button,
    Input,
    Modal,
    ModalHeader,
    ModalBody } from 'reactstrap';
import { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { put } from '../../utils/fetch';
import { validate } from '../../utils/formValidation';
import '../../css/modals.css';
import Loading from '../Loading';

export default function EditCommentModal({ isOpen, setIsOpen, commentText, commentId, recipeId }) {
    
    const [text, setText] = useState(commentText);
    const [formErr, setFormErr] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const toggle = () => setIsOpen(!isOpen);
    const queryClient = useQueryClient();

    useEffect(() => {
      const error = validate(3, 500, text);
      if (error.msg) {
        setFormErr(error.msg);
      } else {
        setFormErr("");
      }
    }, [text])

    const handleSave = async () => {
      setError('');
      setIsLoading(true);
        try {
            const response = await put(`comments/${commentId}`, { text: text });
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
          <ModalHeader>Edit Comment</ModalHeader>
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
                <>
                  {
                    error && (
                      <p className='err-msg'>{error}</p>
                    )
                  }
                  <div className='yes-no-btns'>
                    <Button className='pink-btn' onClick={handleSave}>Save</Button>
                    <Button className='grey-btn' onClick={toggle}>Cancel</Button>
                  </div>
                </>
              )
            }
          </ModalBody>
        </Modal>
    )
}
