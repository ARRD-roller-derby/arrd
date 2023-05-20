import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './menu-shortcut.module.css'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

interface MenuShortcutProps {
  icon: IconDefinition
}

export const MenuShortcut: React.FC<MenuShortcutProps> = ({ icon }) => (
  <FontAwesomeIcon icon={icon} className={styles.icon} />
)
