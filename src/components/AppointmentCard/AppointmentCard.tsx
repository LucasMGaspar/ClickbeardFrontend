import React from 'react';
import { Appointment } from '../../types';
import { formatDateBR } from '../../utils/formatDate';
import { statusLabel, statusClass, StatusKey } from '../../utils/status';
import styles from './AppointmentCard.module.css';

type Props = {
  appointment: Appointment;
  onCancel: (id: string) => void;
};

export default function AppointmentCard({ appointment, onCancel }: Props) {
  const canCancel = React.useMemo(() => {
    const now = Date.now();
    const appt = new Date(appointment.appointmentDate).getTime();
    return (appt - now) / 36e5 >= 2;
  }, [appointment.appointmentDate]);

  const key = appointment.status as StatusKey;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>{appointment.specialty.name}</h3>
        <span className={`${styles.badge} ${styles[statusClass[key]]}`}>
          {statusLabel[key]}
        </span>
      </div>
      <div className={styles.details}>
        <p><strong>Barbeiro:</strong> {appointment.barber.name}</p>
        <p><strong>Data:</strong> {formatDateBR(appointment.appointmentDate)}</p>
      </div>
      {key === 'SCHEDULED' && canCancel && (
        <button
          className={styles.cancelBtn}
          onClick={() => onCancel(appointment.id)}
        >
          Cancelar
        </button>
      )}
    </div>
  );
}
