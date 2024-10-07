import React, { useState, useEffect, useRef } from "react";
//---------------------------------------------
import Inicio from "./inicio";
import Menu from "./Menu";
import SlideImagenes from "./slideImagenes";
import BusquedaXPais from "./buscarXPais";
import CargandoComponente from "./cargandoImagenes";
import SelectorBebidas from "./buscarBebida";
import "../../styles/styles.css";
//---------------------------------
function App() {
  const [estaCargando, setEstaCargando] = useState(true);
  //---------------------------------
  const inicioRef = useRef(null);
  const diariasRef = useRef(null);
  const paisesRef = useRef(null);
  const bebidasRef = useRef(null);

  //---------------------------------
  useEffect(() => {
    const timerCarga = setTimeout(() => {
      setEstaCargando(false);
    }, 3000);
    return () => clearTimeout(timerCarga);
  }, []);

  if (estaCargando) {
    return (
      <CargandoComponente
        onCargandoCompletado={() => setEstaCargando(false)}
        pantallaCompleta={true}
      />
    );
  }
  //---Funcion del scroll---
  const scrollToSection = (sectionRef) => {
    if (sectionRef.current) {
      // Validar si el ref está asignado correctamente
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error("El ref no está asignado a ningún elemento.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="h-[90vh] w-full flex items-center justify-center ">
        <Inicio ref={inicioRef} />
      </div>
      <div className="w-full h-10 z-10">
        <div className="border-b-2 border-gray-400 w-3/4 mx-auto mt-4"></div>
      </div>
      <Menu
        scrollToSection={scrollToSection}
        refs={{ inicioRef, diariasRef, paisesRef, bebidasRef }}
      />
      <div className="flex-1 flex flex-col">
        <SlideImagenes ref={diariasRef} />
        <div className="w-full h-10 ">
          <div className="border-b-2 border-gray-400 w-3/4 mx-auto mt-4"></div>
        </div>
        <BusquedaXPais ref={paisesRef} />
        <div className="w-full h-10 ">
          <div className="border-b-2 border-gray-400 w-3/4 mx-auto mt-4"></div>
        </div>
        <SelectorBebidas ref={bebidasRef} />
        <div className="w-full h-16 ">
          <div className="border-b-2 border-gray-400 w-3/4 mx-auto mt-4"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
