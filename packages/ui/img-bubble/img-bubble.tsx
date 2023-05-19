import styles from './img-bubble.module.css'

interface ImgBubbleProps {
  src: string
  alt: string
}

export const ImgBubble: React.FC<ImgBubbleProps> = ({ src, alt }) => {
  return (
    <div className={styles.avatar}>
      <img src={src} alt={alt} />
    </div>
  )
}
