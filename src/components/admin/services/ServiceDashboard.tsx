import React, { useState } from 'react';
import ServiceCommission from './ServiceCommission';
import ServiceAnalytics from './ServiceAnalytics';
import CustomerAnalytics from '../customers/CustomerAnalytics';
import ReservationManagement from '../reservations/ReservationManagement';

const mockCommissionData = [
  {
    serviceId: '1',
    serviceName: 'Masaje Terapéutico',
    therapistId: 'maria',
    therapistName: 'María González',
    basePrice: 50,
    commissionRate: 30,
    totalSales: 500,
    totalCommission: 150
  },
  // Add more mock data as needed
];

const mockAnalyticsData = {
  totalBookings: 150,
  totalRevenue: 7500,
  averageServiceDuration: 60,
  repeatCustomerRate: 65,
  servicePerformance: [
    { name: 'Masaje', bookings: 50, revenue: 2500 },
    { name: 'Veloterapia', bookings: 30, revenue: 1200 },
    // Add more mock data
  ],
  customerRetention: [
    { month: 'Ene', newCustomers: 20, returningCustomers: 30 },
    { month: 'Feb', newCustomers: 25, returningCustomers: 35 },
    // Add more mock data
  ]
};

export default function ServiceDashboard() {
  const [commissionPeriod, setCommissionPeriod] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  const [analyticsRange, setAnalyticsRange] = useState<'week' | 'month' | 'year'>('month');
  const [activeTab, setActiveTab] = useState<'overview' | 'commissions' | 'customers' | 'reservations'>('overview');

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-brand-brown text-brand-brown'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Vista General
          </button>
          <button
            onClick={() => setActiveTab('commissions')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'commissions'
                ? 'border-brand-brown text-brand-brown'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Comisiones
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'customers'
                ? 'border-brand-brown text-brand-brown'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Clientes
          </button>
          <button
            onClick={() => setActiveTab('reservations')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'reservations'
                ? 'border-brand-brown text-brand-brown'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Reservaciones
          </button>
        </nav>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          {activeTab === 'overview' && (
            <ServiceAnalytics
              data={mockAnalyticsData}
              dateRange={analyticsRange}
              onDateRangeChange={setAnalyticsRange}
            />
          )}

          {activeTab === 'commissions' && (
            <ServiceCommission
              data={mockCommissionData}
              period={commissionPeriod}
              onPeriodChange={setCommissionPeriod}
            />
          )}

          {activeTab === 'customers' && (
            <CustomerAnalytics />
          )}

          {activeTab === 'reservations' && (
            <ReservationManagement />
          )}
        </div>
      </div>
    </div>
  );
}