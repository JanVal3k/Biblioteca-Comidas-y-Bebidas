import { useState, useEffect } from "react";

const useBusquedaPais = (pais) => {
  const [paises, setPaises] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerPaises = async () => {
      if (!pais) return;

      try {
        setCargando(true);
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${pais}`
        );
        const data = await response.json();

        if (data.meals) {
          setPaises(data.meals);
        } else {
          throw new Error("No se encontraron recetas para este país");
        }
        setError(null);
      } catch (err) {
        setError("Error al obtener las recetas");
        console.error("Error al obtener las recetas:", err);
      } finally {
        setCargando(false);
      }
    };

    obtenerPaises();
  }, [pais]);

  return { paises, cargando, error };
};

export default useBusquedaPais;
