import Button from '@/components/atoms/Button';
import InputComponent from '@/components/atoms/Input';
import CheckBox from '@/components/atoms/CheckBox';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function User() {
  const [messages, setMessages] = useState([]);
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      axios
        .get('http://127.0.0.1:8000/api/list-messages/', {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        })
        .then((response) => {
          setMessages(response.data.data.messages);
        })
        .catch((error) => {
          console.error('Erro ao obter a lista de mensagens.', error);
        });
    }
  }, [session]);

  return (
    <>
      {console.log(messages)}
      <div className="flex flex-col justify-center items-center h-screen bg-gray-200">
        <h1 className="p-10 text-4xl font-black text-blue-500">
          Message - {session?.user.name}
        </h1>
        <div className="px-3.5 h-max w-96 bg-white rounded-lg border-solid border-2 border-gray-200 shadow-lg">
          <h2 className="py-4 flex justify-center text-xl mb-3">Mensagens</h2>
          <div>
            {messages && messages.length > 0 ? (
              messages.map((message, index) => (
                <input key={index} type="text" {...message.messages} />
              ))
            ) : (
              <p className="text-lg text-blue-500 text-center">
                Não há nenhuma mensagem para você!
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
