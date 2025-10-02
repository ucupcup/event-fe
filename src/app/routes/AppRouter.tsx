import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@presentation/layouts/MainLayout';
import HomePage from '@presentation/pages/HomePage';
import TicketsPage from '@presentation/pages/TicketsPage';
import CheckoutPage from '@presentation/pages/CheckoutPage';
import AdminDashboardPage from '@presentation/pages/AdminDashboardPage';
import NotFoundPage from '@presentation/pages/NotFoundPage';
import EventDetailsPage from '@presentation/pages/EventDetailsPage';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="tickets" element={<TicketsPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="events/:id" element={<EventDetailsPage />} />
        <Route path="admin" element={<AdminDashboardPage />} />
        <Route path="404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
