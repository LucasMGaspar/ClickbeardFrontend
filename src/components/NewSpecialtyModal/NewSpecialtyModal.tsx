import React, { useState } from 'react';
import api from '../../services/api';
import styles from './NewSpecialtyModal.module.css';

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function NewSpecialtyModal({ onClose, onSuccess }: Props) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await api.post('/specialties', { name });
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar especialidade');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={e => e.stopPropagation()}>
        <h2>Nova Especialidade</h2>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles.group}>
            <label>Nome da Especialidade</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Ex: Corte de cabelo"
              required
            />
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
