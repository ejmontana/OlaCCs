import React from 'react';
import ServicesList from '../services/ServicesList';

export default function ServicesView() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif text-brand-brown">Servicios</h1>
      <ServicesList />
    </div>
  );
}