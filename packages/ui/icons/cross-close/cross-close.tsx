import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './cross-close.module.css'
import { faTimes } from '@fortawesome/pro-solid-svg-icons'

interface CrossCloseProps {
  onClick: () => void
}

export const CrossClose: React.FC<CrossCloseProps> = ({ onClick }) => (
  <FontAwesomeIcon
    icon={faTimes}
    className={styles.crossClose}
    onClick={onClick}
  />
)
