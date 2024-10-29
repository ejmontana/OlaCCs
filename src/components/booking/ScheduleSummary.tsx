import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';

interface ScheduleProps {
  services: {
    id: string;
    name: string;
    therapistId: string;
    therapistName: string;
    duration: number;
  }[];
  date: Date;
  time: string;
}

export default function ScheduleSummary({ services, date, time }: ScheduleProps) {
  if (!services.length || !time) return null;

  return (
    <div className="bg-brand-cream/20 rounded-lg p-6 space-y-4">
      <h3 className="font-serif text-lg text-brand-brown">Resumen de tu reserva</h3>
      
      <div className="flex items-center gap-2 text-brand-brown">
        <Calendar className="h-5 w-5" />
        <span>{date.toLocaleDateString('es-ES', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</span>
      </div>
      
      <div className="flex items-center gap-2 text-brand-brown">
        <Clock className="h-5 w-5" />
        <span>{time}</span>
      </div>

      <div className="space-y-3">
        {services.map((service, index) => (
          <div 
            key={`${service.id}-${index}`}
            className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
          >
            <div>
              <h4 className="font-medium text-brand-brown">{service.name}</h4>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>{service.therapistName}</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {service.duration} min
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}