import React from 'react';
import ServicePriceCard from './ServicePriceCard';

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
}

interface ServiceSelectionProps {
  selectedServices: string[];
  onServiceSelect: (serviceId: string) => void;
}

const services: Service[] = [
  {
    id: 'masaje',
    name: 'Masaje Terapéutico',
    price: 50,
    duration: 60,
    description: 'Técnicas especializadas para aliviar tensiones y promover la relajación profunda.'
  },
  {
    id: 'veloterapia',
    name: 'Veloterapia',
    price: 40,
    duration: 45,
    description: 'Tratamiento ancestral que utiliza velas para equilibrar la energía corporal.'
  },
  {
    id: 'holistic',
    name: 'Terapia Holística',
    price: 60,
    duration: 75,
    description: 'Enfoque integral para el bienestar físico, mental y espiritual.'
  },
  {
    id: 'asesoria',
    name: 'Asesoría Personalizada',
    price: 45,
    duration: 50,
    description: 'Guía experta para alcanzar tus objetivos de bienestar.'
  }
];

export default function ServiceSelection({ selectedServices, onServiceSelect }: ServiceSelectionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-serif text-brand-brown">
        Selecciona tus servicios
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <ServicePriceCard
            key={service.id}
            {...service}
            selected={selectedServices.includes(service.id)}
            onSelect={onServiceSelect}
          />
        ))}
      </div>
    </div>
  );
}