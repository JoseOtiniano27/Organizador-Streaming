
import React from 'react';
import { Client } from '../types';
import ClientCard from './ClientCard';

interface ClientListProps {
  title: string;
  clients: Client[];
  onRenew: (id: string) => void;
  onDelete: (id: string) => void;
  isActiveList: boolean;
}

const ClientList: React.FC<ClientListProps> = ({ title, clients, onRenew, onDelete, isActiveList }) => {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6 pb-2 border-b-2 border-gray-700">{title} ({clients.length})</h2>
      {clients.length > 0 ? (
        <div className="space-y-4">
          {clients.map(client => (
            <ClientCard
              key={client.id}
              client={client}
              onRenew={onRenew}
              onDelete={onDelete}
              isActive={isActiveList}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 px-6 bg-gray-800 rounded-lg">
          <p className="text-gray-400">No clients in this list.</p>
        </div>
      )}
    </section>
  );
};

export default ClientList;
   