import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { Appointment } from '../types';

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get<{ appointments: Appointment[] }>('/appointments/my');
      setAppointments(data.appointments);
    } catch {
      setError('Erro ao carregar agendamentos');
    } finally {
      setLoading(false);
    }
  }, []);

  const cancel = useCallback(async (id: string) => {
    await api.patch(`/appointments/${id}/cancel`);
    await load();
  }, [load]);

  useEffect(() => {
    load();
  }, [load]);

  return { appointments, loading, error, reload: load, cancel };
}
