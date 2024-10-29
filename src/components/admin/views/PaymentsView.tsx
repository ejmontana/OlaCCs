import React from 'react';
import PaymentHistory from '../PaymentHistory';

export default function PaymentsView() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif text-brand-brown">Historial de Pagos</h1>
      <PaymentHistory />
    </div>
  );
}