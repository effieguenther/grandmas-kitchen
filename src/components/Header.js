import { 
  Row, 
  Col,
  Container, 
  Dropdown, 
  DropdownItem, 
  DropdownToggle,
  DropdownMenu } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../utils/fetch';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import DisplayNameModal from './DisplayNameModal';
import '../css/header.css';

export default function Header({ currentUser }) {

  const [initial, setInitial] = useState("");
  const [name, setName] = useState('');
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      const firstInitial = currentUser.display_name[0];
      setName(currentUser.display_name);
      setInitial(firstInitial.toUpperCase());
    }
  }, [currentUser])    

  const logout = async () => {
    const response = await post('users/logout');
    if (response.success) { 
      console.log('logged out!');
      navigate('/login');
    }
  }

  return (
    <Container fluid >
      <Row className='header'>
        <Col className='title-container'>
          <FontAwesomeIcon icon={faHeart} size='xs' />
          <p className='title'>Grandma Sandy's Kitchen</p>
          <FontAwesomeIcon icon={faHeart} size='xs' />
        </Col>
        <Col className='initial-container'>
          <Dropdown isOpen={dropdownIsOpen} toggle={() => setDropdownIsOpen(!dropdownIsOpen)}>
            <DropdownToggle className='toggle'>{initial}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem className='edit-name' onClick={() => setModalIsOpen(true) }>
                {name}
              </DropdownItem>
              <DropdownItem onClick={logout}>logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>
      <DisplayNameModal name={name} setIsOpen={setModalIsOpen} isOpen={modalIsOpen} />
    </Container>
  )
}
