import { useState, useEffect } from "react";

const useRecetasAleatorias = (cantidad = 3) => {
  //-----------------------------------------------
  const [recetas, setRecetas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  //-----------------------------------------------
  useEffect(() => {
    const obtenerRecetas = async () => {
      try {
        setCargando(true);

        const ahora = new Date().getTime();
        const cachedData = localStorage.getItem("recetasAleatoriasCache");
        let recetasCacheadas = null;

        // Intentar obtener recetas del cache

        if (cachedData) {
          const { timestamp, recetas } = JSON.parse(cachedData);
          const unDiaEnMS = 24 * 60 * 60 * 1000; // 1 dia en milisegundos
          if (ahora - timestamp < unDiaEnMS) {
            recetasCacheadas = recetas;
          }
        }

        if (recetasCacheadas && recetasCacheadas.length === cantidad) {
          setRecetas(procesarRecetas(recetasCacheadas));
          setCargando(false);
          return;
        }

        // Si no hay cache o la cantidad no coincide, hacer la llamada a la API
        const promesasRecetas = Array(cantidad)
          .fill()
          .map(() =>
            fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(
              (respuesta) => respuesta.json()
            )
          );

        const resultadosRecetas = await Promise.all(promesasRecetas);
        const nuevasRecetas = resultadosRecetas.map(
          (resultado) => resultado.meals[0]
        );

        // Guardar en el cache con timestamp
        localStorage.setItem(
          "recetasAleatoriasCache",
          JSON.stringify({
            timestamp: ahora,
            recetas: nuevasRecetas,
          })
        );

        setRecetas(procesarRecetas(nuevasRecetas));
        setError(null);
      } catch (err) {
        setError("Error al obtener las recetas");
        console.error("Error al obtener las recetas:", err);
      } finally {
        setCargando(false);
      }
    };

    obtenerRecetas();
  }, [cantidad]);

  // Función para procesar las recetas y extraer las medidas e ingredientes
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

  // Para depuración
  //console.log("Recetas procesadas:", recetas);

  return { recetas, cargando, error };
};

export default useRecetasAleatorias;
// recetas.forEach((receta, index) => {
//   console.log(`Receta ${index + 1}:`, receta); // Mostramos cada objeto de recetas
// });
// const resultado = JSON.stringify(
//   recetas,
//   (clave, valor) => {
//     if (valor === "" || valor === " " || valor === null) return undefined;
//     return valor;
//   },
//   2
// );
// console.log(`Este es el resultado: ${resultado}`);
