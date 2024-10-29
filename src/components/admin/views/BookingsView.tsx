import React from 'react';
import BookingsTable from '../BookingsTable';

export default function BookingsView() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif text-brand-brown">Reservaciones</h1>
      <BookingsTable />
    </div>
  );
}