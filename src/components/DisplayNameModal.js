import {
    Input,
    Modal,
    ModalHeader,
    ModalBody } from 'reactstrap';
import { useState, useEffect } from 'react';
import { useQueryClient, useQuery } from 'react-query';
import { put, post } from '../utils/fetch';
import { validate } from '../utils/formValidation';
import Loading from './Loading';

export default function DisplayNameModal({ setIsOpen, isOpen }) {
    const { data } = useQuery('currentUser', () => post('users'));
    const [name, setName] = useState('');
    const [formErr, setFormErr] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const toggle = () => setIsOpen(!isOpen);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (data.user) {
          setName(data.user.display_name);
        }
      }, [data]) 
    
    useEffect(() => {
      const error = validate(3, 30, name);
      if (error.msg) {
        setFormErr(error.msg);
        console.log('message received')
      } else {
        setFormErr("");
      }
    }, [name])

    const handleSave = async () => {
        setError('');
        setIsLoading(true);
        try {
            const response = await put('users/changeDisplayName', { name: name });
            if (response.success) {
              queryClient.invalidateQueries('currentUser');
              toggle();
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
        <ModalHeader>Edit display name</ModalHeader>
        <ModalBody>
          <Input 
            value={name}
            onChange={(e) => { setName(e.target.value) }}
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
                  <button onClick={handleSave} className='pink-btn'>Save</button>
                  <button onClick={toggle} className='grey-btn'>Cancel</button>
                </div>
              </>
            )
          }
        </ModalBody>
      </Modal>
    )
  }