import { createContext, useContext, useEffect } from 'react';
import { useState } from 'react';
import { getSession, signOut } from 'next-auth/react';
import api from '../services/api';
import { LoadingButtonComponent } from '@/components/atoms/LoadingButton';

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const appName = 'Market Master';

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getUserData() {
    const session = await getSession();

    if (session && !user) {
      api
        .get(`/users/${session?.user.id}`)
        .then((response) => {
          setUser(response.data.users);
          setIsLoading(false);
        })
        .catch(function (error) {
          signOut();
          if (error.response) {
            console.log(error.response.data.message);
          }
        });
    } else {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return isLoading ? (
    <LoadingButtonComponent />
  ) : (
    <GlobalContext.Provider value={{ appName, user }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
