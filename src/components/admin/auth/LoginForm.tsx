import React from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
}

interface FormInputs {
  email: string;
  password: string;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormInputs>();

  const onSubmitForm = async (data: FormInputs) => {
    await onSubmit(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico
          </label>
          <div className="relative">
            <input
              type="email"
              {...register('email', {
                required: 'El correo es requerido',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Correo electrónico inválido'
                }
              })}
              className={`
                w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-brown focus:border-transparent
                ${errors.email ? 'border-red-300' : 'border-gray-300'}
              `}
              placeholder="admin@olacaracas.com"
            />
            <Mail className={`absolute left-3 top-2.5 h-5 w-5 ${
              errors.email ? 'text-red-400' : 'text-gray-400'
            }`} />
          </div>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-600"
            >
              {errors.email.message}
            </motion.p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <div className="relative">
            <input
              type="password"
              {...register('password', {
                required: 'La contraseña es requerida',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres'
                }
              })}
              className={`
                w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-brown focus:border-transparent
                ${errors.password ? 'border-red-300' : 'border-gray-300'}
              `}
              placeholder="••••••••"
            />
            <Lock className={`absolute left-3 top-2.5 h-5 w-5 ${
              errors.password ? 'text-red-400' : 'text-gray-400'
            }`} />
          </div>
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-600"
            >
              {errors.password.message}
            </motion.p>
          )}
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-brown text-white py-2 px-4 rounded-lg hover:bg-brand-dark transition-colors flex items-center justify-center"
        >
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <Lock className="h-5 w-5 mr-2" />
              Iniciar Sesión
            </>
          )}
        </button>
      </div>
    </form>
  );
}