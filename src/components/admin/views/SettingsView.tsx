import React from 'react';
import SettingsPanel from '../settings/SettingsPanel';

export default function SettingsView() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif text-brand-brown">Configuración</h1>
      <SettingsPanel />
    </div>
  );
}