
import { Specialty } from '../../types';
import styles from './SpecialtyCard.module.css';

interface Props { specialty: Specialty; }

export default function SpecialtyCard({ specialty }: Props) {
  return (
    <div className={styles.card}>
      <h3>{specialty.name}</h3>
    </div>
  );
}
