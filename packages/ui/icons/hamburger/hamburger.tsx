import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './hamburger.module.css'
import { faSquareEllipsisVertical } from '@fortawesome/pro-regular-svg-icons'

export const Hamburger: React.FC = () => (
  <FontAwesomeIcon
    icon={faSquareEllipsisVertical}
    className={styles.hamburger}
  />
)
