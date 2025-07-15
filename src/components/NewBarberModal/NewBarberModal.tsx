import React, { useState } from 'react';
import { Specialty } from '../../types';
import api from '../../services/api';
import styles from './NewBarberModal.module.css';

interface Props {
  specialties: Specialty[];
  onClose: () => void;
  onSuccess: () => void;
}

export default function NewBarberModal({ specialties, onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    hireDate: new Date().toISOString().split('T')[0],
    specialtyIds: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (formData.specialtyIds.length === 0) {
      setError('Selecione pelo menos uma especialidade');
      return;
    }
    try {
      setLoading(true);
      setError('');
      await api.post('/barbers', {
        name: formData.name,
        age: parseInt(formData.age),
        hireDate: new Date(formData.hireDate).toISOString(),
        specialtyIds: formData.specialtyIds,
      });
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar barbeiro');
    } finally {
      setLoading(false);
    }
  }

  function toggleSpecialty(id: string) {
    setFormData(prev => ({
      ...prev,
      specialtyIds: prev.specialtyIds.includes(id)
        ? prev.specialtyIds.filter(s => s !== id)
        : [...prev.specialtyIds, id],
    }));
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={e => e.stopPropagation()}>
        <h2>Novo Barbeiro</h2>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles.group}>
            <label>Nome</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className={styles.group}>
            <label>Idade</label>
            <input
              type="number"
              min="18"
              max="100"
              value={formData.age}
              onChange={e => setFormData({ ...formData, age: e.target.value })}
              required
            />
          </div>
          <div className={styles.group}>
            <label>Data de Contratação</label>
            <input
              type="date"
              value={formData.hireDate}
              onChange={e => setFormData({ ...formData, hireDate: e.target.value })}
              required
            />
          </div>
          <div className={styles.group}>
            <label>Especialidades</label>
            <div className={styles.checkboxGroup}>
              {specialties.map(s => (
                <label key={s.id} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.specialtyIds.includes(s.id)}
                    onChange={() => toggleSpecialty(s.id)}
                  />
                  {s.name}
                </label>
              ))}
            </div>
          </div>
          <div className={styles.actions}>
            <button type="button" className={styles.cancel} onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" disabled={loading} className={styles.submit}>
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
