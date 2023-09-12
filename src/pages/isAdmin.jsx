import axios from 'axios';
import { useEffect } from 'react';

export default function isAdmin() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      axios
        .get('http://127.0.0.1:8000/api/user/', {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setUsers(response.data.users);
        })
        .catch((error) => {
          console.error('Erro ao obter a lista de usuários.', error);
        });
    }
  }, [session]);
}
