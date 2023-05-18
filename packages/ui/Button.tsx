import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  IconLookup,
  IconDefinition,
  findIconDefinition,
} from '@fortawesome/fontawesome-svg-core'
import { faPenToSquare } from '@fortawesome/pro-duotone-svg-icons'

export const Button: React.FC = () => {
  return (
    <button>
      <FontAwesomeIcon icon={faPenToSquare} beatFade />
      PPPPP
    </button>
  )
}
