import {
    Input,
    Modal,
    ModalHeader,
    ModalBody } from 'reactstrap';
import { useState, useEffect } from 'react';
import { useQueryClient, useQuery } from 'react-query';
import { useSpring, animated } from '@react-spring/web';
import { put, post } from '../utils/fetch';
import { validate } from '../utils/formValidation';
import { slideRight } from '../utils/animations';
import Loading from './Loading';

export default function DisplayNameModal({ setIsOpen, isOpen }) {
    const queryClient = useQueryClient();
    const { data } = useQuery('currentUser', () => post('users'));
    const [name, setName] = useState('');
    const [formErr, setFormErr] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const slide = useSpring(slideRight);

    useEffect(() => {
        if (data.user) {
          setName(data.user.display_name);
        }
      }, [data]) 
    
    useEffect(() => {
      const error = validate(3, 30, name);
      if (error.msg) {
        setFormErr(error.msg);
      } else {
        setFormErr("");
      }
    }, [name])

    useEffect(() => {
      if (success) {
        console.log(success);
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
            const response = await put('users/changeDisplayName', { name: name });
            if (response.success) {
              queryClient.invalidateQueries('currentUser');
              setSuccess(true);
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
            : success
            ? (
                <animated.div style={slide} className='success'>Success!</animated.div>
              )
            : (
              <>
                {
                  error && (
                    <p className='err-msg'>{error}</p>
                  )
                }
                <div className='yes-no-btns'>
                  <button onClick={handleSave} className='pink-btn' disabled={formErr}>Save</button>
                  <button onClick={toggle} className='grey-btn'>Cancel</button>
                </div>
              </>
            )
          }
        </ModalBody>
      </Modal>
    )
  }