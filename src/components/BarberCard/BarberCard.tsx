
import { Barber } from '../../types';
import styles from './BarberCard.module.css';

interface Props { barber: Barber; }

export default function BarberCard({ barber }: Props) {
  return (
    <div className={styles.card}>
      <h3>{barber.name}</h3>
      <p>Idade: {barber.age} anos</p>
      <p>Contratado em: {new Date(barber.hireDate).toLocaleDateString('pt-BR')}</p>
      <div className={styles.specialties}>
        <strong>Especialidades:</strong>
        <ul>
          {barber.specialties.map(s => (
            <li key={s.id}>{s.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
