import styles from "./Shell.module.css";

interface ShellProps {
  children: React.ReactNode;
}

export default function Shell({ children }: ShellProps) {
  return <div className={styles.shell}>{children}</div>;
}
