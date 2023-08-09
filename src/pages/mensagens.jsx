import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { useState } from 'react';

export default function Message({ getmessages }) {
  const [showModalMessage, setShowModalMessage] = useState(true);
  const [showMessageRead, setShowMessageRead] = useState(true);

  console.log(getmessages);
  return (
    <>
      <Transition appear show={showModalMessage}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setShowModalMessage(false)}
        >
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="min-w-full transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all">
                  <div className="flex justify-between items-center p-4 rounded-t border-b border-gray-200">
                    <h3 className="text-base font-semibold text-gray-900">
                      Mensagens não lidas
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowModalMessage(false)}
                      // onClick={() => setShowMessageRead(message.text == true)}
                      className="text-gray-400 bg-transparent transition-colors hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                      data-modal-toggle="defaultModal"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div className="max-w-2xl p-10">
                    <div className="flex flex-col">

                      {getmessages.length > 0 ? (
                        getmessages.filter(message => message.is_read == false).map((message) => (
                          <div className='p-2 text-green-600'>{message.text}</div>
                        ))
                      ) : (
                        <span className="text-white">Nenhuma mensagem encontrada.</span>
                      )}



                      <button className="py-2 px-3 bg-emerald-400 rounded-lg hover:bg-emerald-500 mt-10">
                        Próxima
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition >

      <div className="flex flex-col justify-center items-center w-full h-screen bg-teal-950  ">
        <div className="w-[500px]">
          <table className="w-full">
            <thead className="w-full bg-green-950">
              <tr className="text-green-300">
                <th className="text-start py-2 px-1">Mensagem</th>
                <th className="text-start py-2 px-1">Data Envio</th>
                <th className="text-start py-2 px-1">Lida</th>
              </tr>
            </thead>

            <tbody>


              {getmessages.length > 0 ? (
                getmessages.filter(message => message.is_read == true).map((message) => (
                  <>
                    <tr className="text-green-400 even:bg-teal-900">
                      <td className="px-1">{message.text}</td>
                      <td className="px-1">{message.created_at}</td>
                      <td className="px-1">
                        {!!message.is_read ? 'Sim' : 'Não'}
                      </td>
                    </tr>
                  </>
                ))


              ) : (
                <span className="text-white">Nenhuma mensagem encontrada.</span>
              )}
            </tbody>

            <tbody>


              {getmessages.length > 0 ? (
                getmessages.filter(message => message.is_read == false).map((message) => (
                  <>
                    <tr className="text-white even:bg-teal-900">
                      <td className="px-1">{message.text}</td>
                      <td className="px-1">{message.created_at}</td>
                      <td className="px-1">
                        {!!message.is_read ? 'Sim' : 'Não'}
                      </td>
                    </tr>
                  </>
                ))


              ) : (
                <span className="text-white">Nenhuma mensagem encontrada.</span>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps() {
  const res = await axios.get(
    'http://127.0.0.1:8000/api/message',
    {},
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );

  return {
    props: {
      getmessages: res.data.data,
    },
  };

  // export async function getServerSideProps() {
  //   const res = await axios.get(
  //     'http://127.0.0.1:8000/api/message',
  //     {},
  //     {
  //       headers: { 'Content-Type': 'application/json' },
  //     },
  //   );

  //   return {
  //     props: {
  //       getmessages: res.data.data,
  //     },
  //   };
}
