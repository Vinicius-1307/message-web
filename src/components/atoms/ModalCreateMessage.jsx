import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from './Button';
import axios from 'axios';
import React from 'react';
import { Form } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Select from 'react-select';

export default function ModalCreateMessage() {
  const [text, setText] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      axios
        .get('http://127.0.0.1:8000/api/user/', {
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

  const handleCreateMessage = async (event) => {
    event.preventDefault();
    await axios
      .post(
        'http://127.0.0.1:8000/api/messages',
        {
          title,
          content: text,
          users: selectedUserId.map((user) => user.id),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.accessToken}`,
          },
        },
      )
      .then((response) => {
        sweetAlert('Mensagem enviada com sucesso!');
        router.reload();
      })
      .catch((error) => {
        if (error) {
          alert(error.response.data.message);
        }
        router.reload();
      });
  };

  const handleUserChange = (event) => {
    setSelectedUserId(event.target.value);
  };

  return (
    <>
      <div className=" mx-20 mb-4 mt-6">
        <Button color="bg-green-500" onClick={() => setModalShow(true)}>
          Criar mensagem
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
            onSubmit={(e) => handleCreateMessage(e)}
          >
            <h2 className="py-2 flex justify-center text-xl">Mensagens</h2>
            <hr className="mb-4" />
            <div className="mb-4">
              <Select
                isMulti
                value={selectedUserId}
                onChange={(selectedOptions) =>
                  setSelectedUserId(selectedOptions)
                }
              />
              {console.log(selectedUserId)}
            </div>
            <div>
              <label
                className="flex flex-col"
                onChange={(e) => setTitle(e.target.value)}
              >
                Escreva seu título:
                <input type="text" className="border-2 rounded-lg p-1 mb-2" />
              </label>
              <label className="flex flex-col">
                Escreva sua Mensagem:
                <textarea
                  className="text-black mt-2 rounded-lg border-solid border-2 border-sky-200"
                  cols="30"
                  rows="10"
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
              </label>
            </div>
            <div className="mx-36 mb-4 mt-6">
              <Button color="bg-blue-500">Enviar</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
