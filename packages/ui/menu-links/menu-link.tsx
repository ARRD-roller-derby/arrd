import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import styles from './menu-links.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface MenuLinksProps {
  label: string
  icon: IconDefinition
}

export const MenuLink: React.FC<MenuLinksProps> = ({ label, icon }) => (
  <div className={styles.container}>
    <FontAwesomeIcon icon={icon} className={styles.icon} />
    <span className={styles.label}>{label}</span>
  </div>
)
