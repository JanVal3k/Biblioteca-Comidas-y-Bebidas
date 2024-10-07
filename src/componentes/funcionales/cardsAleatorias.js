import React, { useState, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import PopOverCards from "./popoverCards";

const Cards = ({ recetas }) => {
  const [esAbierto, setEsAbierto] = useState(false);
  const [selecionarReceta, setSelecionarReceta] = useState(null);

  const cerrarModal = useCallback(() => {
    setEsAbierto(false);
  }, []);

  const abrirModal = useCallback((receta) => {
    setSelecionarReceta(receta);
    setEsAbierto(true);
  }, []);

  return (
    <>
      {recetas.map((receta, index) => (
        <div
          key={index}
          className="w-full max-w-lg sm:w-full rounded-lg shadow-2xl  hover:scale-105 transition-transform duration-200 overflow-hidden"
        >
          <img
            className="w-full h-48 object-cover rounded-t-lg"
            src={receta.strMealThumb}
            alt={receta.strMeal}
          />
          <div className="p-5 flex flex-col justify-between h-[calc(100%-12rem)] overflow-y-auto bg-white">
            <div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                Receta: {receta.strMeal}
              </h5>
              <p className="mb-3 text-base font-normal text-gray-800">
                <b>País:</b> {receta.strArea}
                <br />
                <b>Categoría:</b> {receta.strCategory}
              </p>
              <h6 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                Ingredientes y Medidas:
              </h6>
              <ul className="mb-4">
                {receta.ingredientesYMedidas.map((item, idx) => (
                  <li
                    key={idx}
                    className="mb-1 text-base font-normal text-gray-800"
                  >
                    <b>{item.ingrediente}:</b> {item.medida}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => abrirModal(receta)}
              className="w-full inline-flex justify-center items-center px-3 py-2 text-base font-medium text-center text-white bg-teal-700 rounded-lg hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 transition-colors duration-300"
              aria-label={`Ver preparación de ${receta.strMeal}`}
            >
              Preparación
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}

      <Transition appear show={esAbierto} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={cerrarModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Preparación de {selecionarReceta?.strMeal}
                  </Dialog.Title>
                  <div className="mt-2">
                    <PopOverCards receta={selecionarReceta} />
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-teal-100 px-4 py-2 text-sm font-medium text-teal-900 hover:bg-teal-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 transition-colors duration-300"
                      onClick={cerrarModal}
                    >
                      Cerrar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Cards;
