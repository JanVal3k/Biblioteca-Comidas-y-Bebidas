import React, { useState, useEffect } from "react";

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

const useBusquedaBebida = (bebidaId) => {
  const [bebida, setBebida] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerBebida = async () => {
      if (!bebidaId) return;

      try {
        setCargando(true);
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`
        );
        const data = await response.json();

        if (data.drinks) {
          const bebidasProcesadas = procesarRecetas(data.drinks);
          setBebida(bebidasProcesadas[0]); // Tomamos la primera bebida procesada
        } else {
          throw new Error("No se encontró la bebida");
        }
        setError(null);
      } catch (err) {
        setError("Error al obtener la bebida");
        console.error("Error al obtener la bebida:", err);
      } finally {
        setCargando(false);
      }
    };

    obtenerBebida();
  }, [bebidaId]);

  return { bebida, cargando, error };
};

export default useBusquedaBebida;
