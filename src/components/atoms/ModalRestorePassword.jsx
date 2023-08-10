import { useState } from 'react';
import { useRouter } from 'next/router';

import Modal from 'react-bootstrap/Modal';
import InputComponent from './Input';
import Button from './Button';
import axios from 'axios';

export default function ModalRestorePassword(props) {
  const [password, setPassword] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const router = useRouter();

  // const handleRestorePassword = async (event) => {
  //   event.preventDefault();
  //   await axios
  //     .post(
  //       'http://127.0.0.1:8000/api/user/',
  //       {
  //         name,
  //         email,
  //         password,
  //       },
  //       {
  //         headers: { 'Content-Type': 'application/json' },
  //       },
  //     )
  //     .then((response) => {
  //       alert(response.data.Message);
  //       router.reload();
  //       console.log(response.data.Message);
  //     })
  //     .catch((error) => {
  //       console.log(error.response.data);
  //       if (error.response.data) {
  //         alert(error.response.data.Message);
  //       }
  //       router.reload();
  //     })
  //     .finally(() => {
  //       setName(null);
  //       setEmail(null);
  //       setPassword(null);
  //     });
  // };
  return (
    <>
      <div className="flex justify-center">
        <button
          className="text-blue-500 mt-3 mb-2"
          onClick={() => setModalShow(true)}
        >
          Esqueceu sua senha?
        </button>
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
            onSubmit={(e) => handleRestorePassword(e)}
          >
            <h1 className="text-black text-4xl ">Troque sua senha</h1>
            <h2 className="text-sm text-gray-500">É rápido e fácil.</h2>
            <hr className="mb-4" />
            <InputComponent
              type="password"
              placeholder="Digite sua senha"
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputComponent
              type="password"
              placeholder="Confirme sua senha"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mx-36 mb-4 mt-6">
              <Button color="bg-green-500">Salvar</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
