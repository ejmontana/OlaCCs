import React, { useState } from 'react';
import { Users, Star, TrendingUp, Calendar } from 'lucide-react';

interface CustomerMetrics {
  totalCustomers: number;
  activeCustomers: number;
  averageVisitsPerMonth: number;
  customerSatisfaction: number;
}

const mockMetrics: CustomerMetrics = {
  totalCustomers: 250,
  activeCustomers: 180,
  averageVisitsPerMonth: 2.5,
  customerSatisfaction: 4.8
};

export default function CustomerAnalytics() {
  const [dateRange, setDateRange] = useState<'month' | 'quarter' | 'year'>('month');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-serif text-brand-brown">Análisis de Clientes</h3>
        <div className="flex gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as 'month' | 'quarter' | 'year')}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
          >
            <option value="month">Este mes</option>
            <option value="quarter">Este trimestre</option>
            <option value="year">Este año</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">Total Clientes</p>
              <p className="text-2xl font-medium text-blue-700">{mockMetrics.totalCustomers}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Clientes Activos</p>
              <p className="text-2xl font-medium text-green-700">{mockMetrics.activeCustomers}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600">Visitas Promedio</p>
              <p className="text-2xl font-medium text-yellow-700">{mockMetrics.averageVisitsPerMonth}/mes</p>
            </div>
            <Calendar className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600">Satisfacción</p>
              <p className="text-2xl font-medium text-purple-700">{mockMetrics.customerSatisfaction}/5.0</p>
            </div>
            <Star className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-sm font-medium text-gray-700 mb-4">Segmentación de Clientes</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Clientes Frecuentes</span>
              <div className="flex items-center">
                <div className="w-48 h-2 bg-gray-200 rounded-full mr-2">
                  <div className="w-3/4 h-full bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-gray-700">75%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Clientes Ocasionales</span>
              <div className="flex items-center">
                <div className="w-48 h-2 bg-gray-200 rounded-full mr-2">
                  <div className="w-1/4 h-full bg-yellow-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-gray-700">25%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-sm font-medium text-gray-700 mb-4">Servicios Más Solicitados</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Masaje Terapéutico</span>
              <div className="flex items-center">
                <div className="w-48 h-2 bg-gray-200 rounded-full mr-2">
                  <div className="w-4/5 h-full bg-blue-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-gray-700">80%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Veloterapia</span>
              <div className="flex items-center">
                <div className="w-48 h-2 bg-gray-200 rounded-full mr-2">
                  <div className="w-3/5 h-full bg-purple-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-gray-700">60%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}