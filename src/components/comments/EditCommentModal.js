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
    const [success, setSuccess] = useState(false);
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

    useEffect(() => {
      if (success) {
        const timer = setTimeout(() => {
          toggle();
          setSuccess(false);
        }, 1200)

        return () => { clearTimeout(timer) }
      }

    }, [success])

    const handleSave = async () => {
      setError('');
      setIsLoading(true);
        try {
            const response = await put(`comments/${commentId}`, { text: text });
            if (response.success) {
                queryClient.invalidateQueries(['comments', recipeId]);
                setIsLoading(false);
                setSuccess(true);
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
              : success
              ? (
                  <div className='success'>Success!</div>
                )
              : (
                <>
                  {
                    error && (
                      <p className='err-msg'>{error}</p>
                    )
                  }
                  <div className='yes-no-btns'>
                    <Button className='pink-btn' onClick={handleSave} disabled={formErr}>Save</Button>
                    <Button className='grey-btn' onClick={toggle}>Cancel</Button>
                  </div>
                </>
              )
            }
          </ModalBody>
        </Modal>
    )
}
