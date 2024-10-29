import React from 'react';
import { TrendingUp, Users, Clock, Calendar } from 'lucide-react';

interface AnalyticsData {
  totalBookings: number;
  totalRevenue: number;
  averageServiceDuration: number;
  repeatCustomerRate: number;
  servicePerformance: {
    name: string;
    bookings: number;
    revenue: number;
  }[];
  customerRetention: {
    month: string;
    newCustomers: number;
    returningCustomers: number;
  }[];
}

interface ServiceAnalyticsProps {
  data: AnalyticsData;
  dateRange: 'week' | 'month' | 'year';
  onDateRangeChange: (range: 'week' | 'month' | 'year') => void;
}

export default function ServiceAnalytics({ data, dateRange, onDateRangeChange }: ServiceAnalyticsProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-serif text-brand-brown">Análisis de Servicios</h3>
        <div className="flex gap-2">
          <select
            value={dateRange}
            onChange={(e) => onDateRangeChange(e.target.value as 'week' | 'month' | 'year')}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
          >
            <option value="week">Esta semana</option>
            <option value="month">Este mes</option>
            <option value="year">Este año</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">Total Reservas</p>
              <p className="text-2xl font-medium text-blue-700">{data.totalBookings}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Ingresos Totales</p>
              <p className="text-2xl font-medium text-green-700">${data.totalRevenue}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600">Duración Promedio</p>
              <p className="text-2xl font-medium text-purple-700">{data.averageServiceDuration} min</p>
            </div>
            <Clock className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600">Tasa de Retención</p>
              <p className="text-2xl font-medium text-yellow-700">{data.repeatCustomerRate}%</p>
            </div>
            <Users className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-sm font-medium text-gray-700 mb-4">Rendimiento por Servicio</h4>
          <div className="space-y-4">
            {data.servicePerformance.map((service, index) => (
              <div key={service.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{service.name}</span>
                  <span className="text-gray-600">${service.revenue}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{
                      width: `${(service.bookings / Math.max(...data.servicePerformance.map(s => s.bookings))) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-sm font-medium text-gray-700 mb-4">Retención de Clientes</h4>
          <div className="space-y-4">
            {data.customerRetention.map((month) => (
              <div key={month.month} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{month.month}</span>
                  <span className="text-gray-600">
                    {month.newCustomers + month.returningCustomers} clientes
                  </span>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-green-500"
                    style={{
                      width: `${(month.returningCustomers / (month.newCustomers + month.returningCustomers)) * 100}%`
                    }}
                  ></div>
                  <div
                    className="h-full bg-blue-500"
                    style={{
                      width: `${(month.newCustomers / (month.newCustomers + month.returningCustomers)) * 100}%`
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Recurrentes: {month.returningCustomers}</span>
                  <span>Nuevos: {month.newCustomers}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}