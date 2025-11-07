
import React from 'react';
import { Client } from '../types';

interface ClientCardProps {
  client: Client;
  onRenew: (id: string) => void;
  onDelete: (id: string) => void;
  isActive: boolean;
}

const RenewIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V4a1 1 0 011-1zm10 8a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 01-1 1h-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 111.885-.666A5.002 5.002 0 0014.001 13H11a1 1 0 01-1-1v-2z" clipRule="evenodd" />
    </svg>
);

const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
    </svg>
);


const ClientCard: React.FC<ClientCardProps> = ({ client, onRenew, onDelete, isActive }) => {
  const expiration = new Date(client.expirationDate);
  const now = new Date();
  const daysRemaining = Math.ceil((expiration.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  let statusColor = 'bg-green-500';
  if (daysRemaining <= 7 && daysRemaining > 0) statusColor = 'bg-yellow-500';
  if (daysRemaining <= 0) statusColor = 'bg-red-500';

  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-[1.02] hover:shadow-xl">
      <div className={`p-4 ${isActive ? 'border-l-4 border-purple-500' : 'border-l-4 border-gray-600'}`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-white">{client.name}</h3>
            <p className="text-sm text-gray-400">{client.email}</p>
            <p className="text-sm text-gray-400">{client.phone}</p>
          </div>
          <div className="text-right">
             <div className={`text-sm font-semibold px-3 py-1 rounded-full ${statusColor} text-white`}>
               {isActive ? `${daysRemaining} days left` : 'Expired'}
             </div>
             <p className="text-xs text-gray-500 mt-1">
               Expires: {expiration.toLocaleDateString()}
            </p>
          </div>
        </div>
         {client.password && (
            <div className="mt-3">
                <p className="text-xs text-gray-400">Password: <span className="font-mono bg-gray-700 px-2 py-1 rounded">{client.password}</span></p>
            </div>
        )}
        <div className="mt-4 flex justify-end space-x-2">
           <button
             onClick={() => onRenew(client.id)}
             className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
             <RenewIcon/>
             <span className="ml-2">Renew</span>
           </button>
           <button
             onClick={() => onDelete(client.id)}
             className="inline-flex items-center px-3 py-1 border border-gray-600 text-sm leading-4 font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-red-700 hover:border-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
             <DeleteIcon/>
             <span className="ml-2">Delete</span>
           </button>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
   