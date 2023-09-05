import Button from '@/components/atoms/Button';
import InputComponent from '@/components/atoms/Input';
import CheckBox from '@/components/atoms/CheckBox';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ModalCreateMessage from '@/components/atoms/ModalCreateMessage';
import { useSession } from 'next-auth/react';

export default function User() {
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      axios
        .get('http://127.0.0.1:8000/api/messages/', {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setUsers(response.data.users);
        })
        .catch((error) => {
          console.error('Erro ao obter a lista de usuários:', error);
        });
    }
  }, [session]);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen bg-gray-200">
        <h1 className="p-10 text-4xl font-black text-blue-500">
          Message - USER
        </h1>
        <div className="px-3.5 h-max w-96 bg-white rounded-lg border-solid border-2 border-gray-200 shadow-lg">
          <h2 className="py-4 flex justify-center text-xl mb-3">Mensagens</h2>
        </div>
      </div>
    </>
  );
}
