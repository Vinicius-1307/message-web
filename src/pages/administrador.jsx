import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Admin() {
  const [showFormUser, setShowFormUser] = useState(true);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [text, setText] = useState(null);
  const router = useRouter();
  const [openInicio, setOpenInicio] = useState(null);

  const handleCreateMessage = async (event) => {
    event.preventDefault();

    await axios
      .post(
        'http://127.0.0.1:8000/api/message',
        {
          text,
          is_read: false,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      .then((response) => {
        alert(response.data.Message);
        router.reload();
        console.log(response.data.Message);
      })
      .catch((error) => {
        if (error.response.data) {
          alert(error.response.data.Message);
        }
        router.reload();
        console.log(error.response.data);
      })
      .finally(() => {
        setName(null);
        setPassword(null);
      });
  };

  return (
    <>
      {showFormUser ? (
        <div className="flex flex-col justify-center items-center w-full h-screen bg-teal-950  ">
          <form
            className="p-8 border border-emerald-400 rounded-sm"
            onSubmit={(e) => handleCreateUser(e)}
          >
            <h1 className="p-8 items-center text-white text-2xl ">
              Cadastrar Usuário
            </h1>

            <div>
              <label className="text-white flex flex-col mb-4">
                {' '}
                Nome:
                <input
                  className="p-2 text-black rounded-lg"
                  type="text"
                  name="name"
                  placeholder="Crie um Nome"
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            </div>

            <div className="">
              <label className="text-white flex flex-col">
                Senha:
                <input
                  className="p-2 text-black rounded-lg"
                  type="password"
                  name="password"
                  placeholder="Crie uma Senha"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>

            <div>
              <button className="p-2 bg-emerald-400 rounded-lg mt-8 hover:bg-emerald-500 w-full ">
                Cadastrar
              </button>
            </div>
          </form>

          <div>
            <button
              className="p-2 bg-emerald-400 rounded-lg mt-4 hover:bg-emerald-500 w-full"
              onClick={() => setShowFormUser(false)}
            >
              Criar Mensagem
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-screen bg-teal-950  ">
          <form
            className="p-8 border border-emerald-400 rounded-sm"
            onSubmit={(e) => handleCreateMessage(e)}
          >
            <h1 className="p-8 items-center text-white text-2xl ">
              Enviar uma Mensagem
            </h1>

            <div>
              <label className="text-white flex flex-col">
                {' '}
                Escreva sua Mensagem:
                <textarea
                  className="text-black mt-4 rounded-sm"
                  cols="30"
                  rows="10"
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
              </label>
            </div>

            <div>
              <button className="p-2 bg-emerald-400 rounded-lg mt-8 hover:bg-emerald-500 w-full">
                Enviar
              </button>
            </div>
          </form>

          <div>
            <button
              className="p-2 bg-emerald-400 rounded-lg mt-4 hover:bg-emerald-500 w-full"
              onClick={() => setShowFormUser(true)}
            >
              Cadastrar Usuário
            </button>
          </div>
        </div>
      )}
    </>
  );
}
