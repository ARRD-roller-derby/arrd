import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareEllipsisVertical } from '@fortawesome/pro-regular-svg-icons'

interface HamburgerProps {
  onClick?: () => void
}
export const Hamburger: React.FC<HamburgerProps> = ({ onClick }) => (
  <FontAwesomeIcon
    onClick={() => onClick?.()}
    icon={faSquareEllipsisVertical}
  />
)
