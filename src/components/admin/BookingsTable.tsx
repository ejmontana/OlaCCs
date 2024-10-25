import React, { useEffect, useState } from 'react';
import { Trash2, Search, ChevronDown, DollarSign } from 'lucide-react';

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  services: {
    serviceId: string;
    therapistId: string;
  }[];
  payment: {
    method: 'card' | 'transfer' | 'cash';
    status: 'pending' | 'partial' | 'completed';
    depositAmount: number;
    remainingAmount: number;
    totalAmount: number;
    transactionId?: string;
    date: string;
  };
}

const serviceNames: { [key: string]: string } = {
  masaje: 'Masaje Terapéutico',
  veloterapia: 'Veloterapia',
  holistic: 'Terapia Holística',
  asesoria: 'Asesoría Personalizada'
};

const therapistNames: { [key: string]: string } = {
  maria: 'María González',
  ana: 'Ana Martínez',
  carmen: 'Carmen Silva'
};

const paymentMethodNames: { [key: string]: string } = {
  card: 'Tarjeta',
  transfer: 'Transferencia',
  cash: 'Efectivo'
};

const paymentStatusColors: { [key: string]: string } = {
  pending: 'bg-yellow-100 text-yellow-800',
  partial: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800'
};

const paymentStatusNames: { [key: string]: string } = {
  pending: 'Pendiente',
  partial: 'Depósito pagado',
  completed: 'Completado'
};

export default function BookingsTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Booking>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta reserva?')) {
      const updatedBookings = bookings.filter(booking => booking.id !== id);
      setBookings(updatedBookings);
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    }
  };

  const handlePaymentComplete = (bookingId: string) => {
    const updatedBookings = bookings.map(booking => {
      if (booking.id === bookingId) {
        return {
          ...booking,
          payment: {
            ...booking.payment,
            status: 'completed',
            remainingAmount: 0,
          },
        };
      }
      return booking;
    });
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };

  const handleSort = (field: keyof Booking) => {
    const newDirection = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
  };

  const filteredAndSortedBookings = bookings
    .filter(booking => 
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phone.includes(searchTerm)
    )
    .sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortField] > b[sortField] ? 1 : -1;
      }
      return a[sortField] < b[sortField] ? 1 : -1;
    });

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-serif text-brand-brown">Reservaciones</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar reservaciones..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center">
                    Fecha
                    <ChevronDown className={`ml-1 h-4 w-4 transform ${sortField === 'date' && sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Cliente
                    <ChevronDown className={`ml-1 h-4 w-4 transform ${sortField === 'name' && sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Servicios
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pago
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{new Date(booking.date).toLocaleDateString()}</div>
                    <div className="text-sm text-gray-500">{booking.time}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                    <div className="text-sm text-gray-500">{booking.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {booking.services.map((service, index) => (
                        <div key={index} className="mb-1">
                          <span className="font-medium">{serviceNames[service.serviceId]}</span>
                          <span className="text-gray-500"> con {therapistNames[service.therapistId]}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${paymentStatusColors[booking.payment.status]}`}>
                          {paymentStatusNames[booking.payment.status]}
                        </span>
                        <span className="text-sm text-gray-500">
                          {paymentMethodNames[booking.payment.method]}
                        </span>
                      </div>
                      <div className="text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Total:</span>
                          <span className="font-medium">${booking.payment.totalAmount}</span>
                        </div>
                        {booking.payment.status !== 'completed' && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Pendiente:</span>
                            <span className="font-medium">${booking.payment.remainingAmount}</span>
                          </div>
                        )}
                      </div>
                      {booking.payment.status === 'partial' && (
                        <button
                          onClick={() => handlePaymentComplete(booking.id)}
                          className="flex items-center text-sm text-brand-brown hover:text-brand-dark"
                        >
                          <DollarSign className="h-4 w-4 mr-1" />
                          Marcar como pagado
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button
                      onClick={() => handleDelete(booking.id)}
                      className="text-red-600 hover:text-red-900 ml-4"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredAndSortedBookings.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No se encontraron reservaciones
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}