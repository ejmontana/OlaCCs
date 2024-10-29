import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';
import AuthGuard from '../components/admin/auth/AuthGuard';
import LoginPage from '../components/admin/auth/LoginPage';
import AdminDashboard from '../components/admin/AdminDashboard';
import BookingsView from '../components/admin/views/BookingsView';
import ServicesView from '../components/admin/views/ServicesView';
import EquipmentView from '../components/admin/views/EquipmentView';
import SettingsView from '../components/admin/views/SettingsView';
import PaymentsView from '../components/admin/views/PaymentsView';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout />} />

      {/* Auth Routes */}
      <Route path="/admin/login" element={<LoginPage />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <AuthGuard>
            <AdminLayout />
          </AuthGuard>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="bookings" element={<BookingsView />} />
        <Route path="services" element={<ServicesView />} />
        <Route path="equipment" element={<EquipmentView />} />
        <Route path="payments" element={<PaymentsView />} />
        <Route path="settings" element={<SettingsView />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}