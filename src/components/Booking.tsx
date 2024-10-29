import React, { useState } from "react";
import { CreditCard } from "lucide-react";
import PaymentForm from "./payment/PaymentForm";
import TherapistAvailability from "./booking/TherapistAvailability";
import ServiceSelection from "./booking/ServiceSelection";
import ServiceTherapistSelection from "./booking/ServiceTherapistSelection";
import ScheduleSummary from "./booking/ScheduleSummary";

interface PaymentDetails {
  method: 'card' | 'transfer' | 'cash';
  status: 'pending' | 'partial' | 'completed';
  depositAmount: number;
  remainingAmount: number;
  transactionId?: string;
}

interface ServiceTherapist {
  serviceId: string;
  therapistId: string;
}

const services = {
  masaje: { name: 'Masaje Terapéutico', duration: 60 },
  veloterapia: { name: 'Veloterapia', duration: 45 },
  holistic: { name: 'Terapia Holística', duration: 75 },
  asesoria: { name: 'Asesoría Personalizada', duration: 50 },
};

const therapists = {
  maria: 'María González',
  ana: 'Ana Martínez',
  carmen: 'Carmen Silva',
};

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [showPayment, setShowPayment] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [serviceTherapists, setServiceTherapists] = useState<ServiceTherapist[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [totalAmount, setTotalAmount] = useState(0);

  const servicePrices: { [key: string]: number } = {
    masaje: 50,
    veloterapia: 40,
    holistic: 60,
    asesoria: 45,
  };

  const calculateTotal = (services: string[]) => {
    return services.reduce((total, service) => total + (servicePrices[service] || 0), 0);
  };

  const handleServiceSelect = (serviceId: string) => {
    const newServices = selectedServices.includes(serviceId)
      ? selectedServices.filter(id => id !== serviceId)
      : [...selectedServices, serviceId];
    
    setSelectedServices(newServices);
    setServiceTherapists(prev => 
      prev.filter(st => newServices.includes(st.serviceId))
    );
    setTotalAmount(calculateTotal(newServices));
  };

  const handleTherapistSelect = (serviceId: string, therapistId: string) => {
    setServiceTherapists(prev => {
      const existing = prev.find(st => st.serviceId === serviceId);
      if (existing) {
        return prev.map(st => 
          st.serviceId === serviceId ? { ...st, therapistId } : st
        );
      }
      return [...prev, { serviceId, therapistId }];
    });
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setSelectedTimeSlot("");
  };

  const handleTimeSlotSelect = (time: string) => {
    setSelectedTimeSlot(time);
  };

  const handlePaymentComplete = (paymentDetails: PaymentDetails) => {
    const bookingData = {
      id: Date.now().toString(),
      ...formData,
      date: selectedDate,
      time: selectedTimeSlot,
      services: serviceTherapists.map(st => ({
        serviceId: st.serviceId,
        therapistId: st.therapistId,
      })),
      payment: {
        ...paymentDetails,
        totalAmount,
        date: new Date().toISOString(),
      },
    };

    try {
      const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      localStorage.setItem("bookings", JSON.stringify([...existingBookings, bookingData]));

      // Reset form
      setFormData({ name: "", email: "", phone: "" });
      setSelectedServices([]);
      setServiceTherapists([]);
      setSelectedTimeSlot("");
      setShowPayment(false);

      alert("Reserva confirmada exitosamente");
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Error al procesar la reserva");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowPayment(true);
  };

  const getScheduleSummaryData = () => {
    return serviceTherapists.map(st => ({
      id: st.serviceId,
      name: services[st.serviceId as keyof typeof services].name,
      therapistId: st.therapistId,
      therapistName: therapists[st.therapistId as keyof typeof therapists],
      duration: services[st.serviceId as keyof typeof services].duration,
    }));
  };

  const allTherapistsSelected = selectedServices.every(
    serviceId => serviceTherapists.some(st => st.serviceId === serviceId)
  );

  return (
    <section id="reservar" className="py-24 bg-brand-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif text-brand-brown mb-4">
            Reserva tu Cita
          </h2>
          <p className="text-lg text-brand-dark/80">
            Personaliza tu experiencia de bienestar
          </p>
        </div>

        {!showPayment ? (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-sm p-8"
          >
            <div className="grid grid-cols-1 gap-8">
              <ServiceSelection
                selectedServices={selectedServices}
                onServiceSelect={handleServiceSelect}
              />

              {selectedServices.length > 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-brand-dark mb-2">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        className="w-full px-4 py-2 border border-brand-cream rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brand-dark mb-2">
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        className="w-full px-4 py-2 border border-brand-cream rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brand-dark mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        className="w-full px-4 py-2 border border-brand-cream rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    {selectedServices.map((serviceId) => (
                      <ServiceTherapistSelection
                        key={serviceId}
                        serviceId={serviceId}
                        serviceName={services[serviceId as keyof typeof services].name}
                        selectedTherapist={
                          serviceTherapists.find(st => st.serviceId === serviceId)?.therapistId || ''
                        }
                        onTherapistSelect={handleTherapistSelect}
                      />
                    ))}
                  </div>
                </div>
              )}

              {allTherapistsSelected && selectedServices.length > 0 && (
                <TherapistAvailability
                  serviceTherapists={serviceTherapists}
                  selectedDate={selectedDate}
                  onDateChange={handleDateChange}
                  onTimeSelect={handleTimeSlotSelect}
                  selectedTime={selectedTimeSlot}
                />
              )}

              {selectedTimeSlot && (
                <ScheduleSummary
                  services={getScheduleSummaryData()}
                  date={selectedDate}
                  time={selectedTimeSlot}
                />
              )}

              {selectedServices.length > 0 && (
                <div className="border-t border-brand-cream pt-4">
                  <div className="flex justify-between items-center text-lg font-medium text-brand-brown">
                    <span>Total:</span>
                    <span>${totalAmount}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Se requiere un depósito del 50% (${totalAmount / 2}) para confirmar la reserva
                  </p>
                </div>
              )}
            </div>

            {selectedServices.length > 0 && (
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-brand-brown text-white py-3 px-6 rounded-md hover:bg-brand-dark transition-colors flex items-center justify-center"
                  disabled={!selectedTimeSlot || !allTherapistsSelected}
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Proceder al Pago
                </button>
              </div>
            )}
          </form>
        ) : (
          <PaymentForm
            totalAmount={totalAmount}
            onComplete={handlePaymentComplete}
            onCancel={() => setShowPayment(false)}
          />
        )}
      </div>
    </section>
  );
}