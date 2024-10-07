import React, { useState, useEffect } from "react";
import useDetallesReceta from "../../clase/DetallesReceta";
import "../../../styles/styles.css";

const IngredientesYPreparacion = ({ idReceta }) => {
  const { detallesReceta, cargando, error } = useDetallesReceta(idReceta);
  const [mostrarInstrucciones, setMostrarInstrucciones] = useState(false);
  useEffect(() => {
    if (detallesReceta && detallesReceta.length > 0) {
      setMostrarInstrucciones(false); // Reset al cambiar de receta
    }
  }, [detallesReceta]);

  if (cargando) {
    return <div className="text-center">Cargando imagen de la receta...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!detallesReceta || detallesReceta.length === 0) {
    return (
      <div className="text-center">No se ha seleccionado ninguna receta</div>
    );
  }

  const toggleInstrucciones = () => {
    setMostrarInstrucciones(!mostrarInstrucciones);
  };

  return (
    <div className="flex flex-col items-center w-full md:w-auto">
      <div className="relative w-full md:w-[1000px] h-[500px] bg-gray-200 rounded-2xl overflow-hidden m-6 transition-all duration-400">
        <img
          src={detallesReceta[0].strMealThumb}
          alt={detallesReceta[0].strMeal}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className={`absolute border-2 rounded-xl border-4 border-gray-300 inset-0 p-6 bg-gradient-to-b from-gray-100 to-white flex flex-col justify-center items-center ${
            mostrarInstrucciones
              ? "opacity-0 pointer-events-none"
              : "opacity-100"
          } transition-opacity duration-400`}
        >
          <div className="absolute inset-0 p-6 m-6 bg-gradient-to-b from-gray-100 to-white z-10 flex flex-col justify-center items-center">
            <h1 className="text-3xl text-center font-bold mb-4">
              Ingredientes y medidas para: {detallesReceta[0].strMeal}
            </h1>
            <div className="w-full columns-2 md:columns-4 gap-4">
              {detallesReceta[0].ingredientesYMedidas.map((item, index) => (
                <div
                  key={index}
                  className="break-inside-avoid mb-2 text-base sm:text-lg md:text-xl"
                >
                  <span className="font-bold">{item.ingrediente}:</span>{" "}
                  {item.medida}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4 md:hidden">
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow-lg hover:bg-gray-500 transition-colors duration-200"
                onClick={toggleInstrucciones}
              >
                {mostrarInstrucciones ? "Ingredientes" : "Preparación"}
              </button>
            </div>
            <div className="hidden md:flex justify-center mt-4">
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow-lg hover:bg-gray-500 transition-colors duration-200 mr-4"
                onClick={toggleInstrucciones}
              >
                {mostrarInstrucciones ? "Ingredientes" : "Preparación"}
              </button>
            </div>
          </div>
        </div>
        <div
          className={`absolute inset-0 bg-white border-4 border-gray-300 rounded-xl transition-all duration-400 ${
            mostrarInstrucciones
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="text-base sm:text-lg md:text-xl absolute inset-0 p-6 flex flex-col justify-center items-center">
            <h1 className="text-3xl text-center font-bold text-black mb-4">
              {detallesReceta[0].strMeal}
            </h1>
            <p className="text-lg text-center text-black">
              Categoría: {detallesReceta[0].strCategory}
            </p>
            <p className="text-lg text-center text-black mt-2">
              Origen: {detallesReceta[0].strArea}
            </p>
            <p className="text-md text-center text-black mt-4 overflow-y-auto max-h-[200px]">
              {detallesReceta[0].strInstructions}
            </p>
            <div className="flex justify-center mt-4 md:hidden">
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow-lg hover:bg-gray-500 transition-colors duration-200"
                onClick={toggleInstrucciones}
              >
                {mostrarInstrucciones ? "Ingredientes" : "Preparación"}
              </button>
            </div>
            <div className="hidden md:flex justify-center mt-4">
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow-lg hover:bg-gray-500 transition-colors duration-200 mr-4"
                onClick={toggleInstrucciones}
              >
                {mostrarInstrucciones ? "Ingredientes" : "Preparación"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientesYPreparacion;
