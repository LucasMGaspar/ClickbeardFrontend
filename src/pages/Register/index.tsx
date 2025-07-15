import  { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '../../contexts/AuthContext'
import styles from './Register.module.css'

const registerSchema = z
  .object({
    name:            z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
    email:           z.string().email('Email inválido'),
    password:        z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string().min(6, 'Confirmação deve ter no mínimo 6 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof registerSchema>

export default function Register() {
  const { signUp } = useAuth()
  const navigate   = useNavigate()
  const [error, setError] = useState('')

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  async function onSubmit(data: RegisterFormData) {
    try {
      setError('')
      const { confirmPassword, ...payload } = data
      await signUp(payload)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Erro ao cadastrar usuário')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.title}>ClickBeard</h1>
        <h2 className={styles.subtitle}>Crie sua conta</h2>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {error && <div className={styles.errorMessage}>{error}</div>}

          <div className={styles.formGroup}>
            <label htmlFor="name">Nome completo</label>
            <input
              id="name"
              type="text"
              placeholder="João Silva"
              {...registerField('name')}
              className={errors.name ? styles.inputError : ''}
            />
            {errors.name && (
              <span className={styles.fieldError}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...registerField('email')}
              className={errors.email ? styles.inputError : ''}
            />
            {errors.email && (
              <span className={styles.fieldError}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="••••••"
              {...registerField('password')}
              className={errors.password ? styles.inputError : ''}
            />
            {errors.password && (
              <span className={styles.fieldError}>{errors.password.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirmar senha</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••"
              {...registerField('confirmPassword')}
              className={errors.confirmPassword ? styles.inputError : ''}
            />
            {errors.confirmPassword && (
              <span className={styles.fieldError}>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.registerButton}
          >
            {isSubmitting ? 'Criando conta...' : 'Cadastrar'}
          </button>
        </form>

        <p className={styles.loginLink}>
          Já tem uma conta?{' '}
          <Link to="/login">Faça login</Link>
        </p>
      </div>
    </div>
  )
}
