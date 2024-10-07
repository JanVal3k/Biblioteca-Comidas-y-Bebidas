import React, { useState, useEffect, forwardRef } from "react";
import useListaTragos from "../clase/listarTragos";
import useBusquedaBebida from "../clase/tragosPorID";
import MientrasSelecciona2 from "./componenteDeCarga2";

const SelectorBebidas = forwardRef((props, ref) => {
  //--------------------------------------------------
  const { bebidas, cargando, error } = useListaTragos();
  const [bebidaSeleccionada, setBebidaSeleccionada] = useState(null);
  const [mientasSeSelecciona2, setMientasSeSelecciona2] = useState(false);
  //--------------------------------------------------
  const {
    bebida: detallesBebida,
    cargando: cargandoDetalles,
    error: errorDetalles,
  } = useBusquedaBebida(bebidaSeleccionada?.idDrink);

  useEffect(() => {
    if (detallesBebida) {
      console.log("Detalles de la bebida:", detallesBebida);
    }
  }, [detallesBebida]);

  if (cargando)
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-500">
        Cargando lista de bebidas...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-[70vh] text-red-500">
        Error al cargar la lista de bebidas: {error}
      </div>
    );

  const handleSeleccionBebida = (bebida) => {
    setBebidaSeleccionada(bebida);
    console.log("Bebida seleccionada:", bebida);
    setMientasSeSelecciona2(true);
  };

  const bebidasPorTipo = {
    Alcoholic: bebidas.filter((b) => b.strAlcoholic === "Alcoholic"),
    "Non Alcoholic": bebidas.filter((b) => b.strAlcoholic === "Non Alcoholic"),
    "Optional Alcohol": bebidas.filter(
      (b) => b.strAlcoholic === "Optional Alcohol"
    ),
  };

  return (
    <div
      ref={ref}
      className="flex flex-col md:flex-row h-[70vh] bg-gray-200 overflow-auto"
    >
      <div className="w-full md:w-1/3 p-4 shadow-lg overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Detalles de la bebida
        </h1>
        {bebidaSeleccionada ? (
          <div className="bg-gradient-to-r from-violet-300 to-violet-400 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2 text-center">
              {detallesBebida?.strDrink || bebidaSeleccionada.strDrink}
            </h2>
            <img
              src={
                detallesBebida?.strDrinkThumb ||
                bebidaSeleccionada.strDrinkThumb
              }
              alt={detallesBebida?.strDrink || bebidaSeleccionada.strDrink}
              className="w-full h-[40vh] md:h-[50vh] object-cover rounded-lg mb-4"
            />
            <p className="text-black mb-2 text-center">
              Tipo:{" "}
              {detallesBebida?.strAlcoholic || bebidaSeleccionada.strAlcoholic}
            </p>
            {detallesBebida && (
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-2">
                  Ingredientes y Medidas:
                </h3>
                <table className="w-full">
                  <tbody>
                    {Object.keys(detallesBebida)
                      .filter(
                        (key) =>
                          key.startsWith("strIngredient") && detallesBebida[key]
                      )
                      .map((key, index) => {
                        const measureKey = `strMeasure${index + 1}`;
                        return (
                          <tr key={key} className="border-b last:border-b-0">
                            <td className="py-2 pr-4">{detallesBebida[key]}</td>
                            <td className="py-2 text-gray-500">
                              {detallesBebida[measureKey] || "Al gusto"}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <p className="text-black text-center">
            Selecciona una bebida para ver sus detalles
          </p>
        )}
        <div className="w-full max-h-full h-[60vh] flex justify-center items-center">
          {!mientasSeSelecciona2 && <MientrasSelecciona2 />}
        </div>
      </div>
      <div className="w-full md:w-2/3 p-4 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(bebidasPorTipo).map(([tipo, bebidasDeTipo]) => (
            <div
              key={tipo}
              className="bg-gradient-to-r from-violet-300 to-violet-400 p-4 rounded-lg shadow"
            >
              <h2 className="text-xl font-bold mb-4 text-center">{tipo}</h2>
              <ul className="space-y-2">
                {bebidasDeTipo.map((bebida) => (
                  <li
                    key={bebida.idDrink}
                    className="p-2 rounded cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => handleSeleccionBebida(bebida)}
                  >
                    {bebida.strDrink}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default SelectorBebidas;
