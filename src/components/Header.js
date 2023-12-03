import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-regular-svg-icons'; // for the outline heart

export default function Header() {
  return (
    <div className='header'>
        <FontAwesomeIcon icon={faHeart} size='xs' />
        <p className='title'>Sandy's Kitchen</p>
        <FontAwesomeIcon icon={faHeart} size='xs' />
    </div>
  )
}
