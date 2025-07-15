import { useState, useEffect, useCallback } from 'react'
import api from '../services/api'
import { Barber, Specialty } from '../types'

export interface UseNewAppointmentData {
  specialties: Specialty[]
  barbers: Barber[]
  availableTimes: string[]
  loading: boolean
  loadingTimes: boolean
  error: string
  loadInitialData: () => Promise<void>
  loadAvailableTimes: (barberId: string, date: string) => Promise<void>
}

export function useNewAppointmentData(): UseNewAppointmentData {
  const [specialties, setSpecialties] = useState<Specialty[]>([])
  const [barbers, setBarbers] = useState<Barber[]>([])
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingTimes, setLoadingTimes] = useState(false)
  const [error, setError] = useState('')

  const loadInitialData = useCallback(async () => {
    setLoading(true)
    try {
      const [spRes, brRes] = await Promise.all([
        api.get<{ specialties: Specialty[] }>('/specialties'),
        api.get<{ barbers: Barber[] }>('/barbers'),
      ])
      setSpecialties(spRes.data.specialties)
      setBarbers(brRes.data.barbers)
    } catch {
      setError('Erro ao carregar dados')
    } finally {
      setLoading(false)
    }
  }, [])

  const loadAvailableTimes = useCallback(
    async (barberId: string, date: string) => {
      setLoadingTimes(true)
      try {
        const res = await api.get<{ availableTimes: string[] }>(
          '/appointments/available-times',
          { params: { barberId, date } }
        )
        setAvailableTimes(res.data.availableTimes)
      } catch {
        setAvailableTimes([])
      } finally {
        setLoadingTimes(false)
      }
    },
    []
  )

  useEffect(() => { loadInitialData() }, [loadInitialData])

  return {
    specialties,
    barbers,
    availableTimes,
    loading,
    loadingTimes,
    error,
    loadInitialData,
    loadAvailableTimes,
  }
}
