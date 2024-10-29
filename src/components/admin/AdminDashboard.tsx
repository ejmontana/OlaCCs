import React, { useState } from 'react';
import { Calendar, Package, Wrench, Settings, DollarSign, Users, BarChart } from 'lucide-react';
import BookingsTable from './BookingsTable';
import ServicesList from './services/ServicesList';
import ServiceDashboard from './services/ServiceDashboard';
import EquipmentList from './equipment/EquipmentList';
import SettingsPanel from './settings/SettingsPanel';
import PaymentHistory from './PaymentHistory';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('bookings');

  const renderContent = () => {
    switch (activeTab) {
      case 'bookings':
        return <BookingsTable />;
      case 'services-management':
        return <ServiceDashboard />;
      case 'services':
        return <ServicesList />;
      case 'payments':
        return <PaymentHistory />;
      case 'equipment':
        return <EquipmentList />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <BookingsTable />;
    }
  };

  return (
    <div className="mb-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex flex-wrap gap-4">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === 'bookings'
                ? 'border-brand-brown text-brand-brown'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Reservaciones
          </button>

          <button
            onClick={() => setActiveTab('services-management')}
            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === 'services-management'
                ? 'border-brand-brown text-brand-brown'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <BarChart className="h-4 w-4 mr-2" />
            Gestión de Servicios
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === 'services'
                ? 'border-brand-brown text-brand-brown'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Package className="h-4 w-4 mr-2" />
            Servicios
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === 'payments'
                ? 'border-brand-brown text-brand-brown'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Pagos
          </button>

          <button
            onClick={() => setActiveTab('equipment')}
            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === 'equipment'
                ? 'border-brand-brown text-brand-brown'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Wrench className="h-4 w-4 mr-2" />
            Equipamiento
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === 'settings'
                ? 'border-brand-brown text-brand-brown'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Settings className="h-4 w-4 mr-2" />
            Configuración
          </button>
        </nav>
      </div>

      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
}