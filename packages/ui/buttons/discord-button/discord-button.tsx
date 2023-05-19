import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './discord-button.module.css'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'

interface DiscordButtonProps {
  onClick: () => void
}
export const DiscordButton: React.FC<DiscordButtonProps> = ({ onClick }) => (
  <div className={styles.container} onClick={onClick}>
    <FontAwesomeIcon icon={faDiscord} className={styles.icon} />
    <div className={styles.logo}>Se connecter avec Discord</div>
  </div>
)
