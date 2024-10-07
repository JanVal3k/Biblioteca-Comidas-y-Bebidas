// Importamos los hooks necesarios de React
import { useState, useEffect } from "react";

// Definimos nuestro hook personalizado
const useScrollPosition = () => {
  // Creamos un estado para almacenar la posición del scroll
  // useState(0) inicializa el estado con el valor 0
  const [scrollPosition, setScrollPosition] = useState(0);

  // useEffect se utiliza para efectos secundarios en componentes funcionales
  // En este caso, lo usamos para añadir y eliminar un event listener
  useEffect(() => {
    // Definimos una función que actualiza la posición del scroll
    const updatePosition = () => {
      // window.pageYOffset nos da la cantidad de píxeles que el documento
      // ha sido desplazado verticalmente
      setScrollPosition(window.pageYOffset);
    };

    // Añadimos un event listener al objeto window
    // Este escuchará el evento 'scroll' y ejecutará updatePosition
    window.addEventListener("scroll", updatePosition);

    // Llamamos a updatePosition inmediatamente para establecer la posición inicial
    updatePosition();

    // Esta función de limpieza se ejecutará cuando el componente se desmonte
    // o cuando las dependencias del efecto cambien (en este caso, no hay dependencias)
    return () => window.removeEventListener("scroll", updatePosition);
  }, []); // El array vacío significa que este efecto solo se ejecuta una vez al montar el componente

  // El hook devuelve la posición actual del scroll
  return scrollPosition;
};

// Exportamos nuestro hook personalizado para poder usarlo en otros componentes
export default useScrollPosition;
