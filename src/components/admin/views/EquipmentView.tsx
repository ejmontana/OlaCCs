import React from 'react';
import EquipmentList from '../equipment/EquipmentList';

export default function EquipmentView() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif text-brand-brown">Equipamiento</h1>
      <EquipmentList />
    </div>
  );
}