import React from 'react';
import { Calendar, DollarSign, Users, Package } from 'lucide-react';

export default function DashboardView() {
  const stats = [
    { name: 'Reservas Hoy', value: '8', icon: Calendar, color: 'bg-blue-500' },
    { name: 'Ingresos del Mes', value: '$2,450', icon: DollarSign, color: 'bg-green-500' },
    { name: 'Clientes Nuevos', value: '24', icon: Users, color: 'bg-purple-500' },
    { name: 'Servicios Activos', value: '6', icon: Package, color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif text-brand-brown">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Actividad Reciente</h2>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center space-x-4">
                  <div className="h-8 w-8 rounded-full bg-brand-cream/20 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-brand-brown" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Nueva reserva</p>
                    <p className="text-sm text-gray-500">Masaje Terapéutico con María</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">Hace 2 horas</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}