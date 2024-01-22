import { useEffect, useState } from 'react';
import { Row, Col, Container } from 'reactstrap';
import { useQuery } from 'react-query';
import { post } from '../utils/fetch';
import RecipeList from '../components/RecipeList';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import grandmaPic from '../images/grandma.jpeg';
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
        <Header />
      </Row>
      <Row className='banner'>
        <Col className='d-flex flex-column align-items-center justify-content-center mb-2'>
          <div className='d-flex align-items-center'>
            <p className='title'>Grandma Sandy's Kitchen</p>
          </div>
          {/* <hr width='75%' /> */}
          <p className='subtitle'>Over 250 recipes memorialized in honor of Sandy Daniel</p>
        </Col>
        <Col xs='12' md='5' className='img-container'>
          <img src={grandmaPic} className='recipe-gma-pic' />
        </Col>
      </Row>
      <RecipeList currentUser={currentUser} />
      <Row className='footer'>
        <Footer />
      </Row>
    </Container>
  )
}
