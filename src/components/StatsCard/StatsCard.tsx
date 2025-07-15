
import styles from './StatsCard.module.css';

interface Props {
  title: string;
  value: number;
}

export default function StatsCard({ title, value }: Props) {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p className={styles.value}>{value}</p>
    </div>
  );
}
