import React from "react";

const PopOverCards = ({ receta }) => {
  if (!receta) {
    return null;
  }
  return (
    <div className="max-w-md mx-auto relative overflow-hidden z-10 bg-teal-500 p-8 rounded-lg shadow-md">
      <h2 className="text-black font-bold">Paso a paso:</h2>
      <p
        className="text-black
      00 whitespace-pre-line"
      >
        {receta.strInstructions}
      </p>
    </div>
  );
};
export default PopOverCards;
