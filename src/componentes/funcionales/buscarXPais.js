import React, { forwardRef, useState } from "react";
import usePaisesDisponibles from "../clase/listarPaises";
import useBusquedaPais from "../clase/porPaisApiMealsDB";
import Tabs from "./TabsParaPaises";
import ImagenesReceta from "./seccionesTabs/tabImagenReceta";
import IngredientesYPreparacion from "./seccionesTabs/ingredientesYPreparacion";
import CargandoComponente from "./cargandoImagenes";
import MientrasSelecciona from "./componenteDeCarga";
//import VideoDeReceta from "./seccionesTabs/videoReceta";
import "../../styles/styles.css";

const SelectorPais = forwardRef((props, ref) => {
  const {
    paises,
    cargando: cargandoPaises,
    error: errorPaises,
  } = usePaisesDisponibles();

  const [paisSeleccionado, setPaisSeleccionado] = useState("");
  const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);
  const [tabActiva, setTabActiva] = useState("Imágenes");
  const [estaCargando, setEstaCargando] = useState(false);
  const [mientasSeSelecciona, setMientasSeSelecciona] = useState(false);

  const {
    paises: recetas,
    cargando: cargandoRecetas,
    error: errorRecetas,
  } = useBusquedaPais(paisSeleccionado);

  const handlePaisChange = (e) => {
    setPaisSeleccionado(e.target.value);
    setRecetaSeleccionada(null);
    setMientasSeSelecciona(true);
  };

  const handleRecetaClick = (idReceta) => {
    setRecetaSeleccionada(idReceta);
    setTabActiva("Imagen");
    setEstaCargando(true);
    setTimeout(() => setEstaCargando(false), 2000);
  };

  if (cargandoPaises) return <div>Cargando lista de países...</div>;
  if (errorPaises) return <div>Error: {errorPaises}</div>;

  const tabs = [
    {
      label: "Imagen",
      content: (
        <div className="h-full flex rounded-lg items-center justify-center overflow-hidden">
          {recetaSeleccionada ? (
            <ImagenesReceta idReceta={recetaSeleccionada} />
          ) : (
            <p className="text-xl text-gray-800">
              Selecciona una receta para ver su imagen
            </p>
          )}
        </div>
      ),
    },
    {
      label: "Receta",
      content: (
        <div className="h-full flex rounded-lg items-center justify-center overflow-hidden">
          {recetaSeleccionada ? (
            <IngredientesYPreparacion idReceta={recetaSeleccionada} />
          ) : (
            <p className="text-xl text-gray-800">
              Selecciona una receta para ver su preparacion e ingredientes.
            </p>
          )}
        </div>
      ),
    },
  ];

  return (
    <div
      ref={ref}
      className="flex flex-col md:flex-row relative h-[70vh] bg-gray-200 overflow-hidden"
    >
      <div className="w-full md:w-1/2 p-4 overflow-y-auto">
        <h2 className="text-2xl text-gray-800 font-bold mb-4">
          Selecciona un país:
        </h2>
        <select
          value={paisSeleccionado}
          onChange={handlePaisChange}
          className="w-full p-2 mb-4 hover:bg-gray-300 transition-all duration-200 border border-gray-400 rounded-lg"
        >
          <option value="" className="text-gray-800 font-bold">
            Selecciona un país
          </option>
          {paises.map((pais) => (
            <option key={pais} value={pais}>
              {pais}
            </option>
          ))}
        </select>
        {paisSeleccionado && (
          <div>
            <h3 className="text-xl text-gray-800 font-bold mb-4">
              Recetas de: {paisSeleccionado}:
            </h3>
            {cargandoRecetas ? (
              <div className="text-center text-gray-800 py-2">
                Cargando recetas...
              </div>
            ) : errorRecetas ? (
              <div className="text-center py-2 text-red-500">
                Error: {errorRecetas}
              </div>
            ) : (
              <ul className="list-node pl-5 px-10 ">
                {recetas.map((receta) => (
                  <li
                    key={receta.idMeal}
                    className="mb-6 cursor-pointer border-b text-gray-800 border-gray-400 rounded-md hover:text-gray-800 hover:bg-gray-300 hover:scale-105 hover:font-bold transition-all duration-200"
                    onClick={() => handleRecetaClick(receta.idMeal)}
                  >
                    {receta.strMeal}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        <div className="w-full h-[50vh] flex justify-center items-center">
          {!mientasSeSelecciona && <MientrasSelecciona />}
        </div>
      </div>
      <div className="w-full md:w-1/2 p-2 flex flex-col overflow-hidden">
        <div className="mb-4">
          <Tabs
            tabs={tabs.map((tab) => tab.label)}
            activeTab={tabActiva}
            onTabChange={setTabActiva}
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {estaCargando ? (
            <div className="h-full flex items-center justify-center">
              <CargandoComponente
                onCargandoCompletado={() => setEstaCargando(false)}
                pantallaCompleta={false}
              />
            </div>
          ) : (
            tabs.find((tab) => tab.label === tabActiva)?.content
          )}
        </div>
      </div>
    </div>
  );
});

export default SelectorPais;
