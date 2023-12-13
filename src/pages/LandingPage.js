import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { useTransition, animated, easings } from '@react-spring/web';
import '../css/landing-page.css';

export default function LandingScreen() {

  const handleClick = () => {
    localStorage.setItem('question-answered', true);
  }

  const transition = useTransition(true, {
    from: { opacity: 0, transform: 'translate3d(0, 40vh, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(0, -40vh, 0)' },
    config: { duration: 500, easing: easings.easeOutSine },
    exitBeforeEnter: true
  });

  return transition((style, item) => 
    item && (<div className='landing-container'>
      <animated.div style={style} className='text-container'>
        <div className='title-container'>
          <FontAwesomeIcon icon={faHeart} size='xs' />
          <p className='title'>Grandma Sandy's Kitchen</p>
          <FontAwesomeIcon icon={faHeart} size='xs' />
        </div>
        <hr />
        <p className='intro'>
          In honor of our grandma, Sandy Daniel, this is a digitized version of her coveted recipe box. There are over 200 tried and tested meals that we grew up eating our whole lives. Some are her own creation, and others were shared through her community and church. As a devout Christian, she would want you to ask yourself this question:
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
      </animated.div>
    </div>
  ))
}
