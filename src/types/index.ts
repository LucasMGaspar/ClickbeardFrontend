
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface Barber {
  id: string;
  name: string;
  age: number;
  hireDate: string;
  specialties: Specialty[];
}

export interface Specialty {
  id: string;
  name: string;
}

export interface Appointment {
  id: string;
  appointmentDate: string;
  status: 'AGENDADO' | 'COMPLETO' | 'CANCELADO';
  barber: {
    id: string;
    name: string;
  };
  specialty: {
    id: string;
    name: string;
  };
  user?: User;
}

export interface CreateAppointmentData {
  barberId: string;
  specialtyId: string;
  appointmentDate: string;
}

export interface AvailableTimesResponse {
  date: string;
  barberId: string;
  barberName: string;
  availableTimes: string[];
  totalSlots: number;
  availableSlots: number;
  occupiedTimes: string[];
}