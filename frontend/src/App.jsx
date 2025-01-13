import { useState } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvide } from './context/AuthContext';
import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div role="alert" className="text-red-600 text-center p-6">
    <h2>Oops! Something went wrong.</h2>
    <p>{error.message}</p>
    <button onClick={resetErrorBoundary} className="btn-primary mt-4">
      Try Again
    </button>
  </div>
);

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthProvide>
        <Navbar />
        <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary">
          <Outlet />
        </main>
        <Footer />
      </AuthProvide>
    </ErrorBoundary>
  );
}

export default App;
