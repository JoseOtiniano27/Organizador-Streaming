
import React, { useState } from 'react';
import { useClientManager } from './hooks/useClientManager';
import { Client } from './types';
import AddClientForm from './components/AddClientForm';
import ClientList from './components/ClientList';
import GeminiAnalysisModal from './components/GeminiAnalysisModal';

const BrainIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>
);

export default function App() {
  const {
    activeClients,
    inactiveClients,
    addClient,
    renewClient,
    deleteClient,
  } = useClientManager();
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            StreamSub Manager
          </h1>
          <p className="text-gray-400 mt-2">
            Your personal dashboard for managing streaming subscriptions.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <AddClientForm onAddClient={addClient} />
              <div className="mt-6">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <BrainIcon />
                  Analyze Clients with Gemini
                </button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <ClientList
              title="Active Clients"
              clients={activeClients}
              onRenew={renewClient}
              onDelete={deleteClient}
              isActiveList={true}
            />
            <ClientList
              title="Inactive Clients"
              clients={inactiveClients}
              onRenew={renewClient}
              onDelete={deleteClient}
              isActiveList={false}
            />
          </div>
        </main>
      </div>

      <GeminiAnalysisModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        clients={[...activeClients, ...inactiveClients]}
      />
    </div>
  );
}
   