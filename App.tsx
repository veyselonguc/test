import './styles/globals.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header.tsx';
import { Navigation } from './components/Navigation.tsx';
import { Dashboard } from './components/Dashboard.tsx';
import { RegionDetails } from './components/RegionDetails.tsx';
import { Alerts } from './components/Alerts.tsx';
import { DataInput } from './components/DataInput.tsx';
import { Login } from './components/Login.tsx';
import React from 'react';

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      {children}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          }
        />
        <Route
          path="/region"
          element={
            <AppLayout>
              <RegionDetails />
            </AppLayout>
          }
        />
        <Route
          path="/alerts"
          element={
            <AppLayout>
              <Alerts />
            </AppLayout>
          }
        />
        <Route
          path="/data-input"
          element={
            <AppLayout>
              <DataInput />
            </AppLayout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
