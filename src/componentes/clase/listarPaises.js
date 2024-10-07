import { useState, useEffect } from "react";

const usePaisesDisponibles = () => {
  const [paises, setPaises] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerPaises = async () => {
      try {
        setCargando(true);
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
        );
        const data = await response.json();

        if (data.meals) {
          const listaPaises = data.meals.map((item) => item.strArea).sort(); // sort ordena los elementos del array
          setPaises(listaPaises);
        } else {
          throw new Error("No se encontraron países");
        }
      } catch (err) {
        setError("Error al obtener la lista de países");
        console.error("Error al obtener la lista de países:", err);
      } finally {
        setCargando(false);
      }
    };

    obtenerPaises();
  }, []);

  return { paises, cargando, error };
};

export default usePaisesDisponibles;
