import React, { useState } from 'react';
import { CreditCard, Building2, Wallet, ArrowLeft } from 'lucide-react';

interface PaymentFormProps {
  totalAmount: number;
  onComplete: (paymentDetails: {
    method: 'card' | 'transfer' | 'cash';
    status: 'pending' | 'partial' | 'completed';
    depositAmount: number;
    remainingAmount: number;
    transactionId?: string;
  }) => void;
  onCancel: () => void;
}

export default function PaymentForm({ totalAmount, onComplete, onCancel }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'cash'>('card');
  const depositAmount = totalAmount / 2;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, this would integrate with Stripe or another payment processor
    const paymentDetails = {
      method: paymentMethod,
      status: 'partial' as const,
      depositAmount,
      remainingAmount: depositAmount,
      transactionId: `TRX-${Date.now()}`,
    };

    onComplete(paymentDetails);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <button
        onClick={onCancel}
        className="flex items-center text-brand-brown hover:text-brand-dark mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Volver
      </button>

      <div className="text-center mb-8">
        <h3 className="text-2xl font-serif text-brand-brown mb-2">Método de Pago</h3>
        <p className="text-gray-600">
          Selecciona tu método de pago preferido para el depósito de ${depositAmount}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => setPaymentMethod('card')}
            className={`p-4 border rounded-lg flex flex-col items-center justify-center space-y-2 transition-colors ${
              paymentMethod === 'card'
                ? 'border-brand-brown bg-brand-cream/20'
                : 'border-gray-200 hover:border-brand-cream'
            }`}
          >
            <CreditCard className={`h-6 w-6 ${
              paymentMethod === 'card' ? 'text-brand-brown' : 'text-gray-400'
            }`} />
            <span className={paymentMethod === 'card' ? 'text-brand-brown' : 'text-gray-600'}>
              Tarjeta
            </span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('transfer')}
            className={`p-4 border rounded-lg flex flex-col items-center justify-center space-y-2 transition-colors ${
              paymentMethod === 'transfer'
                ? 'border-brand-brown bg-brand-cream/20'
                : 'border-gray-200 hover:border-brand-cream'
            }`}
          >
            <Building2 className={`h-6 w-6 ${
              paymentMethod === 'transfer' ? 'text-brand-brown' : 'text-gray-400'
            }`} />
            <span className={paymentMethod === 'transfer' ? 'text-brand-brown' : 'text-gray-600'}>
              Transferencia
            </span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('cash')}
            className={`p-4 border rounded-lg flex flex-col items-center justify-center space-y-2 transition-colors ${
              paymentMethod === 'cash'
                ? 'border-brand-brown bg-brand-cream/20'
                : 'border-gray-200 hover:border-brand-cream'
            }`}
          >
            <Wallet className={`h-6 w-6 ${
              paymentMethod === 'cash' ? 'text-brand-brown' : 'text-gray-400'
            }`} />
            <span className={paymentMethod === 'cash' ? 'text-brand-brown' : 'text-gray-600'}>
              Efectivo
            </span>
          </button>
        </div>

        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número de tarjeta
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-2 border border-brand-cream rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de expiración
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-2 border border-brand-cream rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVC
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-4 py-2 border border-brand-cream rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {paymentMethod === 'transfer' && (
          <div className="p-4 bg-brand-cream/20 rounded-lg">
            <h4 className="font-medium text-brand-brown mb-2">Datos bancarios</h4>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Banco:</span> Banco Nacional</p>
              <p><span className="font-medium">Titular:</span> Ola Caracas C.A.</p>
              <p><span className="font-medium">Cuenta:</span> 0123-4567-89-0123456789</p>
              <p><span className="font-medium">RIF:</span> J-12345678-9</p>
            </div>
          </div>
        )}

        {paymentMethod === 'cash' && (
          <div className="p-4 bg-brand-cream/20 rounded-lg">
            <p className="text-sm text-gray-600">
              El pago en efectivo se realizará directamente en nuestras instalaciones antes de tu cita.
              Por favor, llega con 15 minutos de anticipación.
            </p>
          </div>
        )}

        <div className="border-t border-brand-cream pt-4">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal:</span>
              <span className="text-gray-900">${totalAmount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Depósito (50%):</span>
              <span className="text-gray-900">${depositAmount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Pago restante:</span>
              <span className="text-gray-900">${depositAmount}</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-brand-brown text-white py-3 px-6 rounded-md hover:bg-brand-dark transition-colors flex items-center justify-center"
        >
          <CreditCard className="h-5 w-5 mr-2" />
          {paymentMethod === 'card' ? 'Pagar depósito' : 'Confirmar reserva'}
        </button>
      </form>
    </div>
  );
}