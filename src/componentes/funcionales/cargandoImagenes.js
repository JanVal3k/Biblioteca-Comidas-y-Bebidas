import React, { useEffect } from "react";

const CargandoComponente = ({
  onCargandoCompletado,
  pantallaCompleta = true,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onCargandoCompletado();
    }, 10000);

    return () => clearTimeout(timer);
  }, [onCargandoCompletado]);

  return (
    <div
      className={`${
        pantallaCompleta
          ? "fixed top-0 left-0 w-full h-full z-50"
          : "w-full h-full z-10"
      } flex flex-col items-center justify-center `}
    >
      <img
        src="imagen/Cocking-unscreen.gif"
        alt="Cargando..."
        className="w-64 h-64 md:w-96 md:h-96"
      />
      <br />
      <p className="mt-4 text-xl font-bold text-gray-800">
        Cargando recetas...
      </p>
    </div>
  );
};

export default CargandoComponente;
