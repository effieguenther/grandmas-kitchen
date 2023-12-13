import {
    Input,
    Modal,
    ModalHeader,
    ModalBody } from 'reactstrap';
import { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { put } from '../utils/fetch';
import Loading from './Loading';

export default function DisplayNameModal({ name, setIsOpen, isOpen }) {
    const [newName, setNewName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (name) {
          setNewName(name);
        }
      }, [name]) 

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const response = await put('users/changeDisplayName', { name: newName });
            if (response.success) {
                queryClient.invalidateQueries('currentUser');
                toggle()
                console.log('name updated!')
                setIsLoading(false);
            } else {
                console.log('name not updated :(')
                setIsLoading(false);
            }
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        }
    }

    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader>Edit display name</ModalHeader>
        <ModalBody>
          <Input 
            value={newName}
            onChange={(e) => { setNewName(e.target.value) }}
          />
          {
            isLoading
            ? (<Loading />)
            : (
              <div className='yes-no-btns'>
                <button onClick={handleSave} className='pink-btn'>Save</button>
                <button onClick={toggle} className='grey-btn'>Cancel</button>
              </div>
            )
          }
        </ModalBody>
      </Modal>
    )
  }