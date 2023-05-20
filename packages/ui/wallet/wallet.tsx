import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './wallet.module.css'
import { faDragon } from '@fortawesome/sharp-solid-svg-icons'

interface WalletProps {
  num?: number
}
export const Wallet: React.FC<WalletProps> = ({ num }) => (
  <div className={styles.container}>
    <div className={styles.num} data-blur={!num}>
      {num || '4569'}
    </div>
    <FontAwesomeIcon icon={faDragon} className={styles.icon} />
  </div>
)
