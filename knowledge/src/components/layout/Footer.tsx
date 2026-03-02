import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.wordmark}>The Certainty System</span>
        <span className={styles.copy}>&copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}
