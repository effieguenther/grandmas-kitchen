import { 
  Row,
  Col,
  Dropdown, 
  DropdownItem, 
  DropdownToggle,
  DropdownMenu } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../utils/fetch';
import DisplayNameModal from './DisplayNameModal';
import '../css/header.css';

export default function Header() {

  const { data } = useQuery('currentUser', () => post('users'));
  const [initial, setInitial] = useState("");
  const [name, setName] = useState('');
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (data.user) {
      const firstInitial = data.user.display_name[0];
      setName(data.user.display_name);
      setInitial(firstInitial.toUpperCase());
    }
  }, [data])    

  const logout = async () => {
    const response = await post('users/logout');
    if (response.success) { 
      console.log('logged out!');
      navigate('/login');
    }
  }

  return (
    <Col className='d-flex justify-content-end'>
          {
            data.user ? (
              <Dropdown isOpen={dropdownIsOpen} toggle={() => setDropdownIsOpen(!dropdownIsOpen)}>
                <DropdownToggle className='toggle'>{initial}</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem className='edit-name' onClick={() => setModalIsOpen(true) }>
                    My Account
                  </DropdownItem>
                  <DropdownItem onClick={logout}>logout</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Link to='/login'>
                <button className='pink-btn my-2'>Log in</button>
              </Link>
            )
          }
        <DisplayNameModal name={name} setIsOpen={setModalIsOpen} isOpen={modalIsOpen} />
    </Col>
  )
}
