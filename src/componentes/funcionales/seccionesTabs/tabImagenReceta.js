import React from "react";
import useDetallesReceta from "../../clase/DetallesReceta";

const ImagenesReceta = ({ idReceta }) => {
  const { detallesReceta, cargando, error } = useDetallesReceta(idReceta);

  if (cargando) {
    return <div className="text-center">Cargando imagen de la receta...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!detallesReceta) {
    return (
      <div className="text-center">No se ha seleccionado ninguna receta</div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full md:w-auto">
      {detallesReceta.map((receta, index) => (
        <img
          src={receta.strMealThumb}
          alt={receta.strMeal}
          className="max-w-[80vw] md:max-w-[60vh] min-w-[60vh] h-auto rounded-xl shadow-2xl hover:scale-105 transition-transform duration-200 mb-4"
        />
      ))}
    </div>
  );
};

export default ImagenesReceta;
