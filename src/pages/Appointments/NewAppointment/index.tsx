import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';                    
import { toast } from 'react-toastify';       
import api from '../../../services/api';
import { useNewAppointmentData } from '../../../hooks/useNewAppointmentData';
import styles from './NewAppointment.module.css';

const todayISO = new Date().toISOString().split('T')[0];

function isSunday(dateStr: string) {
  return new Date(`${dateStr}T00:00`).getDay() === 0;
}

const schema = z.object({
  specialtyId: z.string().min(1, 'Selecione uma especialidade'),
  barberId:    z.string().min(1, 'Selecione um barbeiro'),
  date: z.string().min(1, 'Selecione uma data').refine(d => !isSunday(d), {
    message: 'A barbearia não funciona aos domingos',
  }),
  time: z.string().min(1, 'Selecione um horário'),
});
type FormData = z.infer<typeof schema>;

export default function NewAppointment() {
  const navigate = useNavigate();

  const {
    specialties,
    barbers,
    availableTimes,
    loading,
    loadingTimes,
    error,
    loadAvailableTimes,
  } = useNewAppointmentData();


  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const specialtyId = watch('specialtyId');
  const barberId    = watch('barberId');
  const date        = watch('date');
  const time        = watch('time');

  React.useEffect(() => {
    if (barberId && date && !isSunday(date)) {
      loadAvailableTimes(barberId, date);
    }
  }, [barberId, date, loadAvailableTimes]);

  const filteredBarbers = barbers.filter(b =>
    b.specialties.some(s => s.id === specialtyId)
  );

  async function onSubmit(data: FormData) {
    const appointmentDate = new Date(`${data.date}T${data.time}:00`);

    try {

      await toast.promise(
        api.post('/appointments', {
          barberId:        data.barberId,
          specialtyId:     data.specialtyId,
          appointmentDate: appointmentDate.toISOString(),
        }),
        {
          pending: 'Agendando…',
          success: 'Agendamento realizado com sucesso! ✅',
          error: {
            render({ data }) {

              const msg =
                axios.isAxiosError(data) && data.response?.data?.message
                  ? data.response.data.message
                  : 'Erro ao agendar';
              return msg;
            },
          },
        }
      );

      navigate('/dashboard');
    } catch (err) {

      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError('date', { type: 'server', message: err.response.data.message });
      }
    }
  }


  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className={styles.back}
        >
          ← Voltar
        </button>
        
      </header>
 <h2 className={styles.title}>Novo Agendamento</h2>
      {loading ? (
        <div className={styles.loading}>Carregando…</div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.group}>
            <label>Especialidade</label>
            <select
              {...register('specialtyId')}
              className={errors.specialtyId && styles.inputError}
            >
              <option value="">Selecione</option>
              {specialties.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            {errors.specialtyId && (
              <p className={styles.fieldError}>{errors.specialtyId.message}</p>
            )}
          </div>

          {specialtyId && (
            <div className={styles.group}>
              <label>Barbeiro</label>
              <select
                {...register('barberId')}
                className={errors.barberId && styles.inputError}
              >
                <option value="">Selecione</option>
                {filteredBarbers.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
              {errors.barberId && (
                <p className={styles.fieldError}>{errors.barberId.message}</p>
              )}
            </div>
          )}

          {barberId && (
            <div className={styles.group}>
              <label>Data</label>
              <input
                type="date"
                min={todayISO}
                {...register('date')}
                className={errors.date && styles.inputError}
              />
              {errors.date && (
                <p className={styles.fieldError}>{errors.date.message}</p>
              )}
            </div>
          )}

          {date && (
            <div className={styles.group}>
              <label>Horário</label>
              {loadingTimes ? (
                <p className={styles.loadingTimes}>Carregando horários…</p>
              ) : (
                <select
                  {...register('time')}
                  className={errors.time && styles.inputError}
                >
                  <option value="">Selecione</option>
                  {availableTimes.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              )}
              {errors.time && (
                <p className={styles.fieldError}>{errors.time.message}</p>
              )}
            </div>
          )}

        
          {specialtyId && barberId && date && time && (
            <div className={styles.summary}>
              <h3>Resumo</h3>
              <p>Serviço: {specialties.find(s => s.id === specialtyId)?.name}</p>
              <p>Barbeiro: {barbers.find(b => b.id === barberId)?.name}</p>
              <p>Data: {new Date(`${date}T00:00`).toLocaleDateString('pt-BR')}</p>
              <p>Horário: {time}</p>
            </div>
          )}

          
          <button
            type="submit"
            disabled={isSubmitting || !availableTimes.length}
            className={styles.submit}
          >
            {isSubmitting ? 'Agendando…' : 'Confirmar Agendamento'}
          </button>
        </form>
      )}
    </div>
  );
}
