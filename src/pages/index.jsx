import Button from '@/components/atoms/Button';
import InputComponent from '@/components/atoms/Input';
import ModalCreateUser from '@/components/atoms/ModalCreateUser';
import ModalRestorePassword from '@/components/atoms/ModalRestorePassword';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function FormsComponent() {
  const router = useRouter();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn('credentials', {
      email: email,
      password: password,
      callbackUrl: '/administrador',
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
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputComponent
              type="password"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button color="bg-blue-500">Entrar</Button>
          </form>
          <ModalRestorePassword />
          <div className="h-4 border-b-2 border-gray-300 text-center">
            <span className="bg-white px-5 text-gray-300">ou</span>
          </div>
          <ModalCreateUser />
        </div>
      </div>
    </section>
  );
}
