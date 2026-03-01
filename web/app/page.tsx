import Link from "next/link";
import styles from "./page.module.css";

export default function DevNavPage() {
  return (
    <div className={styles.devNav}>
      <div className={styles.devCard}>
        <div className={styles.devLogo}>CS</div>
        <h1 className={styles.devTitle}>Certainty System</h1>
        <p className={styles.devSubtitle}>Dev Navigation</p>

        <nav className={styles.devLinks}>
          <Link href="/manager" className={styles.devLink}>
            <span className={styles.devLinkLabel}>Manager Dashboard</span>
            <span className={styles.devLinkPath}>/manager</span>
          </Link>
          <Link href="/dashboard" className={styles.devLink}>
            <span className={styles.devLinkLabel}>Agent Dashboard</span>
            <span className={styles.devLinkPath}>/dashboard</span>
          </Link>
          <Link href="/hub" className={styles.devLink}>
            <span className={styles.devLinkLabel}>Knowledge Hub</span>
            <span className={styles.devLinkPath}>/hub</span>
          </Link>
          <Link href="/report/latest" className={styles.devLink}>
            <span className={styles.devLinkLabel}>Latest Call Report</span>
            <span className={styles.devLinkPath}>/report/latest</span>
          </Link>
        </nav>

        <div className={styles.devHint}>
          <p>Auth disabled — all pages accessible directly</p>
        </div>
      </div>
    </div>
  );
}
