
export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  password?: string; // Storing password is not secure, but included per request.
  expirationDate: string; // ISO string format
}
   