import React from 'react';
import { Users } from 'lucide-react';

interface Therapist {
  id: string;
  name: string;
  specialties: string[];
  avatar: string;
}

interface ServiceTherapistProps {
  serviceId: string;
  serviceName: string;
  selectedTherapist: string;
  onTherapistSelect: (serviceId: string, therapistId: string) => void;
}

const therapists: Therapist[] = [
  {
    id: 'maria',
    name: 'María González',
    specialties: ['masaje', 'veloterapia'],
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'ana',
    name: 'Ana Martínez',
    specialties: ['masaje', 'holistic'],
    avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'carmen',
    name: 'Carmen Silva',
    specialties: ['holistic', 'asesoria'],
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  }
];

export default function ServiceTherapistSelection({
  serviceId,
  serviceName,
  selectedTherapist,
  onTherapistSelect,
}: ServiceTherapistProps) {
  const availableTherapists = therapists.filter(
    therapist => therapist.specialties.includes(serviceId)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-brand-brown">
        <Users className="h-5 w-5" />
        <h4 className="font-medium">Terapeuta para {serviceName}</h4>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {availableTherapists.map((therapist) => (
          <button
            key={therapist.id}
            type="button"
            onClick={() => onTherapistSelect(serviceId, therapist.id)}
            className={`
              flex items-center gap-3 p-3 rounded-lg transition-all
              ${selectedTherapist === therapist.id
                ? 'bg-brand-brown text-white shadow-md'
                : 'bg-white border border-brand-cream hover:border-brand-brown'
              }
            `}
          >
            <img
              src={therapist.avatar}
              alt={therapist.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-sm font-medium">{therapist.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}