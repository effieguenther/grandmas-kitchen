import {
    Button,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter } from 'reactstrap';
import { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { put } from '../utils/fetch';

export default function DisplayNameModal({ name, setIsOpen, isOpen }) {
    const [newName, setNewName] = useState('');
    const toggle = () => setIsOpen(!isOpen);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (name) {
          setNewName(name);
        }
      }, [name]) 

    const handleSave = async () => {
        try {
            const response = await put('users/changeDisplayName', { name: newName });
            if (response.success) {
                queryClient.invalidateQueries('currentUser');
                toggle()
                console.log('name updated!')
            } else {
                console.log('name not updated :(')
            }
        } catch (err) {
            console.error(err);
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
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }