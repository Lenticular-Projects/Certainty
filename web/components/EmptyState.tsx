import styles from "./EmptyState.module.css";

interface EmptyStateProps {
  message: string;
  sub?: string;
}

export default function EmptyState({ message, sub }: EmptyStateProps) {
  return (
    <div className={styles.empty}>
      <p className={styles.emptyMsg}>{message}</p>
      {sub && <p className={styles.emptySub}>{sub}</p>}
    </div>
  );
}
