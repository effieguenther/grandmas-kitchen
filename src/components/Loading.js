import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUtensils } from "@fortawesome/free-solid-svg-icons"

export default function Loading() {
  return (
    <div className='loading'>
        <FontAwesomeIcon icon={faUtensils} beatFade />
    </div>
  )
}
