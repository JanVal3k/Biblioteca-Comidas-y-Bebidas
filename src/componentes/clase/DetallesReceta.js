import { useState, useEffect } from "react";

const useDetallesReceta = (idReceta) => {
  const [detallesReceta, setDetallesReceta] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerDetallesReceta = async () => {
      if (!idReceta) return;

      try {
        setCargando(true);
        const respuesta = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idReceta}`
        );
        const resultadosRecetas = await respuesta.json();

        if (resultadosRecetas.meals && resultadosRecetas.meals.length > 0) {
          setDetallesReceta(procesarRecetas(resultadosRecetas.meals));
        } else {
          throw new Error("No se encontraron detalles para esta receta");
        }
        setError(null);
      } catch (err) {
        setError("Error al obtener los detalles de la receta");
        console.error("Error al obtener los detalles de la receta:", err);
      } finally {
        setCargando(false);
      }
    };

    obtenerDetallesReceta();
  }, [idReceta]);

  const procesarRecetas = (recetasCrudas) => {
    return recetasCrudas.map((receta) => {
      const ingredientesYMedidas = [];
      for (let i = 1; i <= 20; i++) {
        const ingrediente = receta[`strIngredient${i}`];
        const medida = receta[`strMeasure${i}`];
        if (
          ingrediente &&
          ingrediente.trim() !== "" &&
          medida &&
          medida.trim() !== ""
        ) {
          ingredientesYMedidas.push({
            ingrediente: ingrediente.trim(),
            medida: medida.trim(),
          });
        }
      }
      return {
        ...receta,
        ingredientesYMedidas,
      };
    });
  };
  console.log(detallesReceta);
  return { detallesReceta, cargando, error };
};

export default useDetallesReceta;
