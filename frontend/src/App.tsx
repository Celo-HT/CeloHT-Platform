import React from 'react';
import { WalletButton } from './components/WalletButton';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <header className="w-full max-w-5xl flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold text-indigo-600">CeloHT</h1>
        <WalletButton />
      </header>

      <Dashboard />

      <footer className="mt-20 text-gray-500 text-sm">
        © {new Date().getFullYear()} CeloHT. All rights reserved.
      </footer>
    </div>
  );
}

export default App;