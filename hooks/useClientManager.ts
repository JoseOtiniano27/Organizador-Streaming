
import { useState, useEffect, useCallback } from 'react';
import { Client } from '../types';

const LOCAL_STORAGE_KEY = 'streamingClients';

export function useClientManager() {
  const [clients, setClients] = useState<Client[]>(() => {
    try {
      const storedClients = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedClients ? JSON.parse(storedClients) : [];
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(clients));
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [clients]);

  const addClient = (clientData: Omit<Client, 'id' | 'expirationDate'>) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

    const newClient: Client = {
      ...clientData,
      id: crypto.randomUUID(),
      expirationDate: expirationDate.toISOString(),
    };
    setClients(prevClients => [...prevClients, newClient]);
  };

  const renewClient = useCallback((id: string) => {
    setClients(prevClients =>
      prevClients.map(client => {
        if (client.id === id) {
          const newExpirationDate = new Date();
          newExpirationDate.setDate(newExpirationDate.getDate() + 30);
          return { ...client, expirationDate: newExpirationDate.toISOString() };
        }
        return client;
      })
    );
  }, []);

  const deleteClient = useCallback((id: string) => {
    setClients(prevClients => prevClients.filter(client => client.id !== id));
  }, []);
  
  const now = new Date();
  const activeClients = clients.filter(c => new Date(c.expirationDate) >= now).sort((a,b) => new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime());
  const inactiveClients = clients.filter(c => new Date(c.expirationDate) < now).sort((a,b) => new Date(b.expirationDate).getTime() - new Date(a.expirationDate).getTime());

  return { activeClients, inactiveClients, addClient, renewClient, deleteClient };
}
   