import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useAppointments } from '../../hooks/useAppointments';
import Logo from '../../components/Logo';
import AppointmentCard from '../../components/AppointmentCard/AppointmentCard';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { appointments, loading, error, cancel } = useAppointments();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Logo size="medium" color="white" />
        <div>
          <span className={styles.userName}>Olá, {user?.name}</span>
          {user?.role === 'ADMIN' && (
            <button onClick={() => navigate('/admin')} className={styles.adminBtn}>
              Painel Admin
            </button>
          )}
          <button onClick={() => { signOut(); navigate('/login'); }} className={styles.logoutBtn}>
            Sair
          </button>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.sectionHeader}>
          <h2>Meus Agendamentos</h2>
          <button onClick={() => navigate('/appointments/new')} className={styles.newBtn}>
            Novo Agendamento
          </button>
        </div>
        {loading && <Loading />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && appointments.length === 0 && (
          <div className={styles.empty}>
            <p>Você ainda não tem agendamentos.</p>
            <button onClick={() => navigate('/appointments/new')} className={styles.ctaBtn}>
              Agendar Agora
            </button>
          </div>
        )}
        {!loading && !error && appointments.length > 0 && (
          <div className={styles.grid}>
            {appointments.map(appt => (
              <AppointmentCard
                key={appt.id}
                appointment={appt}
                onCancel={cancel}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
