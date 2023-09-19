import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Button from '@/components/atoms/Button';

export default function User() {
  const [messages, setMessages] = useState([]);
  const [checked, setChecked] = useState(false);
  const [messageIds, setMessageIds] = useState([]);
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

  const handleCheckedMessage = async (event) => {
    event.preventDefault();
    const messageId = messageIds[0];
    if (!messageId) {
      alert('Nenhum ID de mensagem selecionado.');
      return;
    }
    await axios
      .patch('http://127.0.0.1:8000/api/messages/${messsage.id}', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => {
        alert(response.data.message);
        router.reload();
      })
      .catch((error) => {
        if (error) {
          alert(error.data);
        }
        router.reload();
      });
  };

  function handleCheckBox({ id, isRemoved = false }) {
    if (!isRemoved) {
      const newArray = [...messageIds, id];
      setMessageIds(newArray);
      return;
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen bg-gray-200">
        <h1 className="p-10 text-4xl font-black text-blue-500">
          Message - {session?.user.name}
        </h1>
        <div className="px-3.5 h-max w-96 bg-white rounded-lg border-solid border-2 border-gray-200 shadow-lg">
          <h2 className="py-4 flex justify-center text-xl mb-3">Mensagens</h2>
          <div>
            {messages && messages.length > 0 ? (
              messages.map((message, index) => (
                <li key={index} className="list-none text-left border-b-2 mb-2">
                  <label className="flex flex-col relative">
                    <div className="flex flex-col">
                      <span>Título: {message.title}</span>
                      <span>Conteúdo: {message.content}</span>
                    </div>
                    <input
                      className="absolute right-4 top-4"
                      type="checkbox"
                      onChange={() => handleCheckBox({ id: message.id })}
                    />{' '}
                  </label>
                  {console.log(handleCheckBox)}
                </li>
              ))
            ) : (
              <p className="text-lg text-blue-500 text-center">
                Não há nenhuma mensagem para você!
              </p>
            )}
          </div>
          <Button
            color="bg-blue-500"
            onClick={(event) => handleCheckedMessage(event, messages)}
          >
            Marcar como lida
          </Button>
        </div>
      </div>
    </>
  );
}
// export async function getServerSideProps(ctx) {
//   try {
//     const messages = await api.get(`http://127.0.0.1:8000/api/list-messages/`);

//     return {
//       props: {
//         messages: messages,
//       },
//     };
//   } catch (error) {
//     if (error.response) {
//       console.log('error', error);
//     }
//     return {
//       redirect: {
//         destination: `/${
//           error.response ? '?error=' + error.response.data.message : ''
//         }`,
//       },
//       props: {},
//     };
//   }
// }
