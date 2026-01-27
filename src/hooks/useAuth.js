import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';


//custom hook

export const useAuth = () => {
  const context = useContext(AuthContext);
//Provider (component qui envoie context value pour children)
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }

  return context;
};