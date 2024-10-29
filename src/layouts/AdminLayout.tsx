import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Package, Wrench, Settings, LogOut, DollarSign } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: Calendar },
  { name: 'Reservaciones', href: '/admin/bookings', icon: Calendar },
  { name: 'Pagos', href: '/admin/payments', icon: DollarSign },
  { name: 'Servicios', href: '/admin/services', icon: Package },
  { name: 'Equipamiento', href: '/admin/equipment', icon: Wrench },
  { name: 'Configuración', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-brand-brown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="h-8 w-auto rounded-full"
                  src="/logo.png"
                  alt="Ola Caracas"
                />
                <span className="ml-2 text-white font-serif">Panel Administrativo</span>
              </div>
            </div>
            <div className="flex items-center">
              <button 
                onClick={handleLogout}
                className="text-white hover:text-brand-cream flex items-center"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Salir
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-white shadow-sm">
          <nav className="mt-5 px-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.href)}
                  className={`
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full
                    ${location.pathname === item.href
                      ? 'bg-brand-brown text-white'
                      : 'text-gray-600 hover:bg-brand-cream/10 hover:text-brand-brown'
                    }
                  `}
                >
                  <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}