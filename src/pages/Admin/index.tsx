import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useAdminData } from '../../hooks/useAdminData';
import StatsCard from '../../components/StatsCard/StatsCard';
import Tabs from '../../components/Tabs/Tabs';
import AppointmentsTable from '../../components/AppointmentsTable/AppointmentsTable';
import BarberCard from '../../components/BarberCard/BarberCard';
import SpecialtyCard from '../../components/SpecialtyCard/SpecialtyCard';
import NewBarberModal from '../../components/NewBarberModal/NewBarberModal';
import NewSpecialtyModal from '../../components/NewSpecialtyModal/NewSpecialtyModal';
import Logo from '../../components/Logo';

import styles from './Admin.module.css';

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { appointments, barbers, specialties, stats, loading, reload } = useAdminData();

  const [activeTab, setActiveTab] = React.useState<'appointments' | 'barbers' | 'specialties'>('appointments');
  const [showNewBarber, setShowNewBarber] = React.useState(false);
  const [showNewSpecialty, setShowNewSpecialty] = React.useState(false);

  React.useEffect(() => {
    if (user?.role !== 'ADMIN') navigate('/dashboard');
  }, [user, navigate]);

  return (
    <>
      {/* HEADER AGORA FORA DO WRAPPER LIMITADO */}
      <header className={styles.header}>
        <Logo size="medium" color="white" />
        <button className={styles.adminBtn} onClick={() => navigate('/dashboard')}>
          Voltar ao Dashboard
        </button>
      </header>

      {/* CONTEÚDO CENTRALIZADO */}
      <div className={styles.container}>
        {loading ? (
          <div className={styles.loading}>Carregando...</div>
        ) : (
          <>
            <div className={styles.statsGrid}>
              <StatsCard title="Agendamentos Hoje" value={stats.todayAppointments} />
              <StatsCard title="Agendamentos Futuros" value={stats.futureAppointments} />
              <StatsCard title="Total de Barbeiros" value={stats.totalBarbers} />
              <StatsCard title="Total de Especialidades" value={stats.totalSpecialties} />
            </div>

            <Tabs
              tabs={[
                { key: 'appointments', label: 'Agendamentos' },
                { key: 'barbers', label: 'Barbeiros' },
                { key: 'specialties', label: 'Especialidades' },
              ]}
              activeTab={activeTab}
              onChange={setActiveTab}
            />

            <div className={styles.tabContent}>
              {activeTab === 'appointments' && (
                <>
                  <h2 className={styles.sectionTitle}>Todos os Agendamentos</h2>
                  {appointments.length === 0 ? (
                    <p className={styles.empty}>Nenhum agendamento encontrado</p>
                  ) : (
                    <AppointmentsTable appointments={appointments} />
                  )}
                </>
              )}

              {activeTab === 'barbers' && (
                <>
                  <div className={styles.sectionHeader}>
                    <h2>Barbeiros</h2>
                    <button className={styles.add} onClick={() => setShowNewBarber(true)}>
                      + Adicionar Barbeiro
                    </button>
                  </div>
                  {barbers.length === 0 ? (
                    <p className={styles.empty}>Nenhum barbeiro cadastrado</p>
                  ) : (
                    <div className={styles.cardsGrid}>
                      {barbers.map(b => <BarberCard barber={b} key={b.id} />)}
                    </div>
                  )}
                </>
              )}

              {activeTab === 'specialties' && (
                <>
                  <div className={styles.sectionHeader}>
                    <h2>Especialidades</h2>
                    <button className={styles.add} onClick={() => setShowNewSpecialty(true)}>
                      + Adicionar Especialidade
                    </button>
                  </div>
                  {specialties.length === 0 ? (
                    <p className={styles.empty}>Nenhuma especialidade cadastrada</p>
                  ) : (
                    <div className={styles.cardsGrid}>
                      {specialties.map(s => <SpecialtyCard specialty={s} key={s.id} />)}
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* Modais fora do fluxo principal para sobrepor tudo */}
      {showNewBarber && (
        <NewBarberModal
          specialties={specialties}
          onClose={() => setShowNewBarber(false)}
          onSuccess={() => { setShowNewBarber(false); reload(); }}
        />
      )}
      {showNewSpecialty && (
        <NewSpecialtyModal
          onClose={() => setShowNewSpecialty(false)}
          onSuccess={() => { setShowNewSpecialty(false); reload(); }}
        />
      )}
    </>
  );
}
