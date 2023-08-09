import Button from '@/components/atoms/Button';
import InputComponent from '@/components/atoms/Input';
import ModalCreateUser from '@/components/atoms/ModalCreateUser';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function FormsComponent() {
  const router = useRouter();
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        'http://127.0.0.1:8000/api/login',
        {
          name,
          password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      .then((response) => {
        alert(response.data.Message);
        console.log(response.data.data.is_admin);
        if (!!response.data.data.is_admin) {
          router.replace('/administrador');
        } else {
          router.replace('/mensagens');
        }
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
    <section>
      <div className="flex flex-col justify-center items-center h-screen bg-gray-200">
        <h1 className="p-10 text-4xl font-black text-blue-500">Message</h1>
        <div className="px-3.5 h-max w-96 bg-white rounded-lg border-solid border-2 border-gray-200 shadow-lg">
          <form onSubmit={(e) => handleSubmit(e)}>
            <h2 className="py-4 flex justify-center text-xl mb-3">
              Entrar no Message
            </h2>
            <InputComponent
              type="text"
              placeholder="E-mail ou nome"
              onChange={(e) => setName(e.target.value)}
            />
            <InputComponent
              type="password"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button color="bg-blue-500">Entrar</Button>
            <a className="flex justify-center text-blue-500 mt-3 mb-2" href="#">
              Esqueceu a conta?
            </a>
            <div className="h-4 border-b-2 border-gray-300 text-center">
              <span className="bg-white px-5 text-gray-300">ou</span>
            </div>
          </form>
          <ModalCreateUser />
        </div>
      </div>
    </section>
  );
}
