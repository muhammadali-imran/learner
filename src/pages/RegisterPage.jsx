import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import AuthLayout from '../layouts/AuthLayout'
import useAuth from '../hooks/useAuth'

const schema = z.object({
  name:            z.string().min(2, 'Name must be at least 2 characters'),
  email:           z.string().email('Enter a valid email'),
  password:        z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export default function RegisterPage() {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    setServerError('')
    try {
      await registerUser({ name: data.name, email: data.email, password: data.password })
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setServerError(err.response?.data?.detail || 'Registration failed. Please try again.')
    }
  }

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-slate-800 mb-1">Create your account</h2>
      <p className="text-slate-500 text-sm mb-7">Start your learning journey today</p>

      {serverError && (
        <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <Field label="Full name" error={errors.name?.message}>
          <input
            type="text"
            autoComplete="name"
            placeholder="Ali Hassan"
            {...register('name')}
            className={inputClass(errors.name)}
          />
        </Field>

        <Field label="Email address" error={errors.email?.message}>
          <input
            type="email"
            autoComplete="email"
            placeholder="you@school.edu"
            {...register('email')}
            className={inputClass(errors.email)}
          />
        </Field>

        <Field label="Password" error={errors.password?.message}>
          <input
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            {...register('password')}
            className={inputClass(errors.password)}
          />
        </Field>

        <Field label="Confirm password" error={errors.confirmPassword?.message}>
          <input
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            {...register('confirmPassword')}
            className={inputClass(errors.confirmPassword)}
          />
        </Field>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link to="/login" className="text-purple-600 font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  )
}

function inputClass(error) {
  return `w-full px-4 py-3 rounded-xl border text-slate-800 text-sm placeholder-slate-400 outline-none transition-shadow
    ${error
      ? 'border-red-400 focus:ring-2 focus:ring-red-200'
      : 'border-slate-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100'
    }`
}
