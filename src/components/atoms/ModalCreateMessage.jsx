import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from './Button';
import axios from 'axios';
import React from 'react';
import { Form } from 'react-bootstrap';
import makeAnimated from 'react-select/animated';
import { useSession } from 'next-auth/react';

export default function ModalCreateMessage() {
  const [text, setText] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      axios
        .get('http://127.0.0.1:8000/api/user/', {
          Authorization: `Bearer ${session.accessToken}`,
        })
        .then((response) => {
          console.log(response.data);
          setUsers(response.data);
        })
        .catch((error) => {
          console.error('Erro ao obter a lista de usuários:', error);
        });
    }
  }, [session]);

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
            onSubmit={(e) => handleCreateUser(e)}
          >
            <h2 className="py-2 flex justify-center text-xl">Mensagens</h2>
            <hr className="mb-4" />
            <div className="mb-4">
              <Form.Group>
                <Form.Select value={selectedUserId} onChange={handleUserChange}>
                  <option value="">Todos os usuários</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div>
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
