import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import AuthLayout from '@shared/layouts/AuthLayout'
import useAuth from '@features/auth/hooks/useAuth'
import InputForm from '@shared/components/ui/InputForm'

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
        <InputForm label="Full name" registration={register('name')} error={errors.name?.message} required />
        <InputForm label="Email address" type="email" registration={register('email')} error={errors.email?.message} required />
        <InputForm label="Password" type="password" registration={register('password')} error={errors.password?.message} required hint="At least 8 characters" />
        <InputForm label="Confirm password" type="password" registration={register('confirmPassword')} error={errors.confirmPassword?.message} required />

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