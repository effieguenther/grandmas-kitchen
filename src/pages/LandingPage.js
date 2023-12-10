import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../css/landing-page.css';

export default function LandingScreen() {

  const handleClick = () => {
    localStorage.setItem('question-answered', true);
  }

  return (
    <div className='landing-container'>
      <p className='intro'>
        In honor of our grandma, Sandy Daniel, this is a digitized version of her coveted recipe box. There are over 200 tried and tested meals that we grew up eating our whole lives. Some are her own creation, and others were shared through her community and church. As a devout Christian, she would want you to ask yourself this question:
      </p>
      <p className='question'>If God had a refrigerator, would your picture be on it?</p>
      <div className='yes-no'>
        <Link to='/login'>
          <Button onClick={handleClick}>Yes</Button>
        </Link>
        <Link to='/login'>
          <Button onClick={handleClick}>No</Button>
        </Link>
      </div>
    </div>
  )
}
