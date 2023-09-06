import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import Modal from 'react-bootstrap/Modal';
import InputComponent from './Input';
import Button from './Button';
import axios from 'axios';

export default function ModalCreateUser(props) {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleCreateUser = async (event) => {
    event.preventDefault();
    await axios
      .post(
        'http://127.0.0.1:8000/api/user/',
        {
          name,
          email,
          password,
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
        if (error) {
          alert(error.response.data.message);
        }
        router.reload();
      });
  };
  return (
    <>
      <div className=" mx-20 mb-4 mt-6">
        <Button color="bg-green-500" onClick={() => setModalShow(true)}>
          Criar nova conta
        </Button>
      </div>
      <Modal
        show={modalShow}
        centered
        onHide={() => setModalShow(false)}
        className="flex justify-center w-96"
      >
        <Modal.Body>
          <form
            className="px-3.5 h-max rounded-sm"
            onSubmit={(e) => handleCreateUser(e)}
          >
            <h1 className="text-black text-4xl ">Cadastre-se</h1>
            <h2 className="text-sm text-gray-500">É rápido e fácil.</h2>
            <hr className="mb-4" />
            <InputComponent
              type="text"
              placeholder="Nome"
              onChange={(e) => setName(e.target.value)}
            />
            <InputComponent
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputComponent
              type="password"
              placeholder="Nova senha"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mx-36 mb-4 mt-6">
              <Button color="bg-green-500">Cadastre-se</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
