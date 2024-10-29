import React from 'react';
import DatePicker from "react-datepicker";
import { Calendar, Clock, X, User } from 'lucide-react';
import { format, addDays, isAfter, setHours, setMinutes, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";

interface ServiceTherapist {
  serviceId: string;
  therapistId: string;
}

interface TherapistAvailabilityProps {
  serviceTherapists: ServiceTherapist[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onTimeSelect: (time: string) => void;
  selectedTime: string;
}

// Define therapist schedules
const therapistSchedules = {
  maria: {
    workDays: [1, 2, 3, 4, 5], // Monday to Friday
    hours: ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00']
  },
  ana: {
    workDays: [1, 2, 3, 4, 5, 6], // Monday to Saturday
    hours: ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
  },
  carmen: {
    workDays: [2, 3, 4, 5, 6], // Tuesday to Saturday
    hours: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']
  }
};

// Mock existing bookings
const mockBookings = {
  'maria': [
    { date: '2024-03-20', time: '10:00' },
    { date: '2024-03-20', time: '11:00' },
    { date: '2024-03-21', time: '14:00' },
  ],
  'ana': [
    { date: '2024-03-20', time: '15:00' },
    { date: '2024-03-21', time: '16:00' },
  ],
  'carmen': [
    { date: '2024-03-20', time: '13:00' },
    { date: '2024-03-22', time: '11:00' },
  ],
};

const therapistNames = {
  maria: 'María González',
  ana: 'Ana Martínez',
  carmen: 'Carmen Silva',
};

export default function TherapistAvailability({
  serviceTherapists,
  selectedDate,
  onDateChange,
  onTimeSelect,
  selectedTime,
}: TherapistAvailabilityProps) {
  // Get available time slots for a specific therapist on the selected date
  const getTherapistAvailability = (therapistId: string, date: Date) => {
    const schedule = therapistSchedules[therapistId as keyof typeof therapistSchedules];
    const dayOfWeek = date.getDay();
    
    // Check if therapist works on this day
    if (!schedule.workDays.includes(dayOfWeek)) {
      return [];
    }

    // Get booked slots for this date
    const dateStr = format(date, 'yyyy-MM-dd');
    const therapistBookings = mockBookings[therapistId as keyof typeof mockBookings] || [];
    const bookedTimes = therapistBookings
      .filter(booking => booking.date === dateStr)
      .map(booking => booking.time);

    // Return available times (excluding booked ones)
    return schedule.hours.filter(time => !bookedTimes.includes(time));
  };

  // Get common available time slots for all selected therapists
  const getAvailableTimeSlots = () => {
    const allAvailableSlots = serviceTherapists.map(st => ({
      therapistId: st.therapistId,
      slots: getTherapistAvailability(st.therapistId, selectedDate)
    }));

    // Find time slots that work for all therapists
    const commonSlots = allAvailableSlots[0]?.slots.filter(time =>
      allAvailableSlots.every(therapist => therapist.slots.includes(time))
    ) || [];

    return commonSlots.sort();
  };

  const isDateAvailable = (date: Date) => {
    return serviceTherapists.some(st => {
      const schedule = therapistSchedules[st.therapistId as keyof typeof therapistSchedules];
      return schedule.workDays.includes(date.getDay());
    });
  };

  const renderDayContents = (day: number, date: Date) => {
    const isAvailable = isDateAvailable(date);

    return (
      <div className={`relative flex items-center justify-center ${
        !isAvailable ? 'text-gray-300' : ''
      }`}>
        {day}
        {!isAvailable && (
          <X className="absolute -top-1 -right-1 h-2 w-2 text-red-500" />
        )}
      </div>
    );
  };

  const availableTimeSlots = getAvailableTimeSlots();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-serif text-brand-brown mb-4">
          Selecciona fecha y hora
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-2">
              Fecha
            </label>
            <div className="relative">
              <DatePicker
                selected={selectedDate}
                onChange={onDateChange}
                minDate={new Date()}
                maxDate={addDays(new Date(), 30)}
                dateFormat="dd/MM/yyyy"
                locale={es}
                renderDayContents={renderDayContents}
                filterDate={isDateAvailable}
                className="w-full px-4 py-2 border border-brand-cream rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
              />
              <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-brand-brown/60" />
            </div>
          </div>

          <div className="bg-brand-cream/10 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-brand-brown mb-2">Horarios de terapeutas</h4>
            <div className="space-y-2">
              {serviceTherapists.map((st) => {
                const schedule = therapistSchedules[st.therapistId as keyof typeof therapistSchedules];
                const availableSlots = getTherapistAvailability(st.therapistId, selectedDate);
                return (
                  <div key={st.therapistId} className="text-sm">
                    <div className="flex items-center gap-2 text-brand-brown">
                      <User className="h-4 w-4" />
                      <span className="font-medium">
                        {therapistNames[st.therapistId as keyof typeof therapistNames]}
                      </span>
                    </div>
                    <div className="ml-6 text-gray-600">
                      {availableSlots.length > 0 ? (
                        <span>Disponible: {availableSlots.join(', ')}</span>
                      ) : (
                        <span className="text-red-500">No disponible este día</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {availableTimeSlots.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-brand-dark mb-4">
            Horarios disponibles para todos los terapeutas
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {availableTimeSlots.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => onTimeSelect(time)}
                className={`
                  p-2 rounded-md text-sm font-medium flex items-center justify-center gap-2
                  ${selectedTime === time
                    ? 'bg-brand-brown text-white'
                    : 'bg-white border border-brand-cream hover:border-brand-brown text-brand-brown'
                  }
                `}
              >
                <Clock className="h-4 w-4" />
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {availableTimeSlots.length === 0 && selectedDate && (
        <div className="text-center p-4 bg-red-50 text-red-600 rounded-lg">
          No hay horarios disponibles para todos los terapeutas en esta fecha.
          Por favor, selecciona otra fecha.
        </div>
      )}
    </div>
  );
}