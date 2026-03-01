import styles from "./Marquee.module.css";

interface MarqueeItem {
  text: string;
  alert?: boolean;
}

interface MarqueeProps {
  items: MarqueeItem[];
}

export default function Marquee({ items }: MarqueeProps) {
  if (items.length === 0) return null;

  // Duplicate items for seamless infinite scroll
  const doubled = [...items, ...items];

  return (
    <div className={styles.colMarquee}>
      <div className={styles.marqueeTrack}>
        {doubled.map((item, i) => (
          <span key={i} className={styles.marqueeItem}>
            <span className={`${styles.marqueeDot} ${item.alert ? styles.alert : ""}`} />
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
