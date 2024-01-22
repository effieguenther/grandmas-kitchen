import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'reactstrap';
import { useTransition, animated } from '@react-spring/web';
import { slideUp } from '../utils/animations';
import grandmaPic from '../images/grandma.jpeg'
import '../css/landing-page.css';

export default function LandingScreen() {

  const handleClick = () => {
    localStorage.setItem('question-answered', true);
  }

  const transition = useTransition(true, slideUp);

  return transition((style, item) => 
    item && (<div className='background'>
      <animated.div style={style} className='text-container'>
        <Container fluid>
          <Row>
            <Col xs='12' md='5' className='d-flex justify-content-center align-items-center'>
              <img src={grandmaPic} className='grandma-pic'/>
            </Col>
            <Col className='d-flex flex-column justify-content-center'>
              <div className='title-container'>
                <p className='title'>Grandma Sandy's Kitchen</p>
              </div>
              <hr />
              <p className='intro'>
                In honor of our grandma, Sandy Daniel, this is a digitized version of her coveted recipe box. There are over 250 tried and tested meals that we grew up eating our whole lives. Some are her own creation, and others were shared through her community and church. As a devout Christian, she would want you to ask yourself this question:
              </p>
              <p className='question'>If God had a refrigerator, would your picture be on it?</p>
              <div className='yes-no'>
                <Link to='/login'>
                  <button className='pink-btn' onClick={handleClick}>Yes</button>
                </Link>
                <Link to='/login'>
                  <button className='grey-btn' onClick={handleClick}>No</button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </animated.div>
    </div>
  ))
}
