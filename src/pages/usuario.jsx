import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSession, useSession } from 'next-auth/react';
import Button from '@/components/atoms/Button';

export default function User({ GetAllMessages }) {
  const [messageIds, setMessageIds] = useState([]);
  const router = useRouter();
  const { data: session } = useSession();

  const handleCheckedMessage = async (event) => {
    event.preventDefault();
    await axios
      .patch(
        `http://127.0.0.1:8000/api/read/${messageIds}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        },
      )
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
      {console.log(GetAllMessages)}
      <div className="flex flex-col justify-center items-center h-screen bg-gray-200">
        <h1 className="p-10 text-4xl font-black text-blue-500">
          Message - {session?.user.name}
        </h1>
        <div className="px-3.5 h-max w-96 bg-white rounded-lg border-solid border-2 border-gray-200 shadow-lg">
          <h2 className="py-4 flex justify-center text-xl mb-3">Mensagens</h2>
          <div>
            {GetAllMessages?.length > 0 ? (
              GetAllMessages.map((message, index) => (
                <li key={index} className="list-none text-left border-b-2 mb-2">
                  <label className="flex flex-col relative">
                    <div className="flex flex-col">
                      <span>Título: {message.title}</span>
                      <span>Conteúdo: {message.content}</span>
                    </div>
                    <input
                      className="absolute right-4 top-4"
                      type="checkbox"
                      onClick={(e) => {
                        if (e.target.checked) {
                          handleCheckBox({ id: message.id });
                        } else {
                          handleCheckBox({ id: message.id, isRemoved: true });
                        }
                      }}
                      checked={message.isSelected}
                    />
                  </label>
                </li>
              ))
            ) : (
              <p className="text-lg text-blue-500 text-center">
                Não há nenhuma mensagem para você, ou já foram marcadas como
                lidas!
              </p>
            )}
          </div>
          {GetAllMessages?.length > 0 && (
            <div className="flex justify-center">
              <button
                className="bg-blue-500 w-40 h-12 text-white rounded-lg mb-2"
                onClick={(event) => handleCheckedMessage(event)}
              >
                Marcar como lida
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/list-messages/`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      },
    );
    return {
      props: {
        GetAllMessages: response.data.data.messages,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
    if (error.response) {
      console.log('error', error);
    }
  }
}
