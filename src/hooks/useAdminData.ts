import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { Appointment, Barber, Specialty } from '../types';

export interface AdminStats {
  todayAppointments: number;
  futureAppointments: number;
  totalBarbers: number;
  totalSpecialties: number;
}

export function useAdminData() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [stats, setStats] = useState<AdminStats>({
    todayAppointments: 0,
    futureAppointments: 0,
    totalBarbers: 0,
    totalSpecialties: 0,
  });
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [apRes, brRes, spRes] = await Promise.all([
        api.get<{ appointments: Appointment[] }>('/appointments'),
        api.get<{ barbers: Barber[] }>('/barbers'),
        api.get<{ specialties: Specialty[] }>('/specialties'),
      ]);
      const all = apRes.data.appointments;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayCount = all.filter(a => {
        const d = new Date(a.appointmentDate);
        d.setHours(0, 0, 0, 0);
        return d.getTime() === today.getTime();
      }).length;
      const futureCount = all.filter(a => new Date(a.appointmentDate) > new Date()).length;
      setAppointments(all);
      setBarbers(brRes.data.barbers);
      setSpecialties(spRes.data.specialties);
      setStats({
        todayAppointments: todayCount,
        futureAppointments: futureCount,
        totalBarbers: brRes.data.barbers.length,
        totalSpecialties: spRes.data.specialties.length,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { appointments, barbers, specialties, stats, loading, reload: load };
}
