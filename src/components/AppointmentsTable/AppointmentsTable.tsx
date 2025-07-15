
import { Appointment } from '../../types';
import { formatDateBR } from '../../utils/formatDate';
import { statusLabel } from '../../utils/status';
import styles from './AppointmentsTable.module.css';

interface Props {
  appointments: Appointment[];
  onSelect?: (appointmentId: string) => void;
  compact?: boolean;
}

export default function AppointmentsTable({ appointments, onSelect, compact }: Props) {
  const containerClass = compact
    ? `${styles.container} ${styles.compact}`
    : styles.container;

  return (
    <div className={containerClass}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Data/Hora</th>
              <th>Cliente</th>
              <th>Barbeiro</th>
              <th>Serviço</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(a => (
              <tr
                key={a.id}
                tabIndex={0}
                onClick={() => onSelect?.(a.id)}
                onKeyDown={e =>
                  (e.key === 'Enter' || e.key === ' ') && onSelect?.(a.id)
                }
              >
                <td className={styles.nowrap}>
                  {formatDateBR(a.appointmentDate)}
                </td>
                <td>{a.user?.name || 'N/A'}</td>
                <td>{a.barber.name}</td>
                <td>{a.specialty.name}</td>
                <td>
                  <span className={`${styles.badge} ${styles['status' + a.status]}`}>
                    {statusLabel[a.status as keyof typeof statusLabel]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
