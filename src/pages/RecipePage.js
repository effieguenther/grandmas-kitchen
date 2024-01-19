import { useEffect, useState } from 'react';
import { Row, Col, Container } from 'reactstrap';
import { useQuery } from 'react-query';
import { post } from '../utils/fetch';
import RecipeList from '../components/RecipeList';
import Header from '../components/Header';
import Loading from '../components/Loading';
import grandmaPic from '../images/grandma.jpeg';
import heart from '../images/heart.svg';
import '../css/recipe-page.css';

export default function RecipePage() {

  const [currentUser, setCurrentUser] = useState(null);
  const { isLoading, isError, data, error } = useQuery('currentUser', () => post('users'));

  useEffect(() => { 
    setCurrentUser(data?.user);
  }, [data])

  return isLoading 
  ? ( <Loading /> )
  : isError
  ? (<p>{error}</p>)
  : (
    <Container fluid className='background'>
      <Row className='header'>
        <Header currentUser={currentUser} />
      </Row>
      <Row className='banner'>
        <Col className='d-flex flex-column align-items-center justify-content-center mb-2'>
          <div className='d-flex align-items-center'>
            <p className='title'>Grandma Sandy's Kitchen</p>
          </div>
          <hr width='75%' />
        </Col>
        <Col xs='12' md='5' className='img-container'>
          <img src={grandmaPic} className='recipe-gma-pic' />
        </Col>
      </Row>
      <Row>
        <RecipeList currentUser={currentUser} />
      </Row>
    </Container>
  )
}
