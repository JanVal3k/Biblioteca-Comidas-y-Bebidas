import { useState, useEffect } from "react";

const useListaTragos = () => {
  const [bebidas, setBebidas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerTragos = async () => {
      try {
        setCargando(true);
        const categorias = ["Alcoholic", "Non_Alcoholic", "Optional_Alcohol"];
        const bebidasPorCategoria = await Promise.all(
          categorias.map(async (categoria) => {
            const response = await fetch(
              `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${categoria}`
            );
            const data = await response.json();
            return data.drinks.map((drink) => ({
              ...drink,
              strAlcoholic: categoria.replace("_", " "),
            }));
          })
        );

        const todasLasBebidas = bebidasPorCategoria.flat();
        setBebidas(todasLasBebidas);
        console.log("Bebidas obtenidas:", todasLasBebidas);
      } catch (err) {
        setError("Error al obtener la lista de Bebidas");
        console.error("Error al obtener la lista de Bebidas:", err);
      } finally {
        setCargando(false);
      }
    };

    obtenerTragos();
  }, []);

  return { bebidas, cargando, error };
};

export default useListaTragos;
