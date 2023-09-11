import Button from '@/components/atoms/Button';
import InputComponent from '@/components/atoms/Input';
import CheckBox from '@/components/atoms/CheckBox';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ModalCreateMessage from '@/components/atoms/ModalCreateMessage';
import { useSession } from 'next-auth/react';

export default function Admin() {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleCreateUser = async (event) => {
    event.preventDefault();
    await axios
      .post(
        'http://127.0.0.1:8000/api/user/',
        {
          name,
          email,
          password,
          is_admin: checked,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.accessToken}`,
          },
        },
      )
      .then((response) => {
        alert('Conta criada com sucesso.');
        router.reload();
      })
      .catch((error) => {
        alert(error.response.data.message);
        router.reload();
      });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen bg-gray-200">
        <h1 className="p-10 text-4xl font-black text-blue-500">
          Message - ADM
        </h1>
        <div className="px-3.5 h-max w-96 bg-white rounded-lg border-solid border-2 border-gray-200 shadow-lg">
          <form onSubmit={(e) => handleCreateUser(e)}>
            <h2 className="py-4 flex justify-center text-xl mb-3">
              Cadastrar Usuário
            </h2>
            <InputComponent
              type="text"
              placeholder="Nome"
              onChange={(e) => setName(e.target.value)}
            />
            <InputComponent
              type="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputComponent
              type="password"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="pt-2 pb-4 flex flex-rows items-center">
              <CheckBox onChange={(e) => setChecked(e.target.checked)} />
              <span className="ml-2">Admnistrador?</span>
            </div>
            <div className="mb-4">
              <Button color="bg-blue-500">Cadastrar</Button>
            </div>
          </form>
        </div>
        <ModalCreateMessage />
      </div>
    </>
  );
}
