import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import '../css/header.css';

export default function Header() {
  return (
    <div className='header'>
        <FontAwesomeIcon icon={faHeart} size='xs' />
        <p className='title'>Grandma Sandy's Kitchen</p>
        <FontAwesomeIcon icon={faHeart} size='xs' />
    </div>
  )
}
