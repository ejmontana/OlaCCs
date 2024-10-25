import React, { useEffect, useState } from 'react';
import { Calendar, DollarSign, CreditCard, Building2, Wallet } from 'lucide-react';

interface Payment {
  bookingId: string;
  clientName: string;
  method: 'card' | 'transfer' | 'cash';
  amount: number;
  date: string;
  type: 'deposit' | 'final';
  status: 'completed' | 'pending';
}

const paymentMethodIcons = {
  card: CreditCard,
  transfer: Building2,
  cash: Wallet,
};

export default function PaymentHistory() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [pendingPayments, setPendingPayments] = useState(0);

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const extractedPayments: Payment[] = [];
    let revenue = 0;
    let pending = 0;

    bookings.forEach((booking: any) => {
      if (booking.payment) {
        // Add deposit payment
        extractedPayments.push({
          bookingId: booking.id,
          clientName: booking.name,
          method: booking.payment.method,
          amount: booking.payment.depositAmount,
          date: booking.payment.date,
          type: 'deposit',
          status: 'completed',
        });

        revenue += booking.payment.depositAmount;

        // Add final payment if exists
        if (booking.payment.status === 'completed') {
          extractedPayments.push({
            bookingId: booking.id,
            clientName: booking.name,
            method: booking.payment.method,
            amount: booking.payment.depositAmount,
            date: booking.payment.date,
            type: 'final',
            status: 'completed',
          });
          revenue += booking.payment.depositAmount;
        } else if (booking.payment.remainingAmount > 0) {
          extractedPayments.push({
            bookingId: booking.id,
            clientName: booking.name,
            method: booking.payment.method,
            amount: booking.payment.remainingAmount,
            date: booking.payment.date,
            type: 'final',
            status: 'pending',
          });
          pending += booking.payment.remainingAmount;
        }
      }
    });

    setPayments(extractedPayments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    setTotalRevenue(revenue);
    setPendingPayments(pending);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-serif text-brand-brown mb-6">Historial de Pagos</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Ingresos Totales</p>
                <p className="text-2xl font-medium text-green-700">${totalRevenue}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600">Pagos Pendientes</p>
                <p className="text-2xl font-medium text-yellow-700">${pendingPayments}</p>
              </div>
              <Calendar className="h-8 w-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Total Transacciones</p>
                <p className="text-2xl font-medium text-blue-700">{payments.length}</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Método
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monto
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment, index) => {
                const PaymentIcon = paymentMethodIcons[payment.method];
                return (
                  <tr key={`${payment.bookingId}-${payment.type}-${index}`} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.clientName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <PaymentIcon className="h-4 w-4 mr-2 text-gray-400" />
                        {payment.method === 'card' ? 'Tarjeta' :
                         payment.method === 'transfer' ? 'Transferencia' : 'Efectivo'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        payment.type === 'deposit' 
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {payment.type === 'deposit' ? 'Depósito' : 'Pago final'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                      ${payment.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        payment.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {payment.status === 'completed' ? 'Completado' : 'Pendiente'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}