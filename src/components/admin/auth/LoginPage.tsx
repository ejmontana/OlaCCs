import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Lock, Mail, AlertCircle } from 'lucide-react';
import LoginForm from './LoginForm';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export default function LoginPage() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      // In a real app, this would be an API call
      if (email === 'admin@olacaracas.com' && password === 'admin123') {
        localStorage.setItem('adminAuth', 'true');
        navigate('/admin/dashboard');
      } else {
        throw new Error('Credenciales inválidas');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cream to-brand-light flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeIn}
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 pt-8 pb-6 text-center bg-brand-brown text-white">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="flex justify-center mb-4"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <Leaf className="h-8 w-8 text-brand-brown" />
              </div>
            </motion.div>
            <h2 className="text-2xl font-serif">Panel Administrativo</h2>
            <p className="text-brand-cream/80 mt-2">Ola Caracas</p>
          </div>

          {error && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-red-50 px-4 py-3 flex items-center gap-2 text-sm text-red-600"
            >
              <AlertCircle className="h-4 w-4" />
              {error}
            </motion.div>
          )}

          <div className="p-8">
            <LoginForm onSubmit={handleLogin} />
          </div>
        </div>

        <motion.p
          className="text-center mt-4 text-sm text-brand-brown/60"
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          © {new Date().getFullYear()} Ola Caracas. Todos los derechos reservados.
        </motion.p>
      </motion.div>
    </div>
  );
}