import React from "react";
import useScrollPosition from "../clase/scrollMenu";

const Menu = ({ scrollToSection, refs }) => {
  const scrollPosition = useScrollPosition();
  const isScrolled = scrollPosition > 0;

  return (
    <div
      className={`${
        isScrolled
          ? "fixed top-0 left-1/2 transform -translate-x-1/2 rounded-full shadow-xl overflow-hidden"
          : "absolute top-[5vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-xl overflow-hidden rounded-full"
      } transition-all duration-200 ease-in-out z-10 rounded-full shadow-xl group overflow-hidden
      // Añadido: clases para hacer el menú responsive
      w-[95%] sm:w-auto`}
    >
      <div className="px-4 sm:px-8 py-2 sm:py-4 bg-white rounded-full shadow-xl relative z-10 overflow-hidden">
        <nav className="flex flex-wrap items-center justify-center space-x-2 sm:space-x-4">
          <a
            onClick={() => scrollToSection(refs.inicioRef)}
            className="font-bold uppercase text-black hover:text-white transition-colors duration-300 relative z-10 cursor-pointer text-xs sm:text-sm"
          >
            Inicio
          </a>

          <a className="font-bold uppercase text-black hover:text-white transition-colors duration-300 relative z-10 cursor-default hidden sm:inline">
            |
          </a>

          <a
            onClick={() => scrollToSection(refs.diariasRef)}
            className="font-bold uppercase text-black hover:text-white transition-colors duration-300 relative z-10 cursor-pointer text-xs sm:text-sm"
          >
            Diarias
          </a>

          <a className="font-bold uppercase text-black hover:text-white transition-colors duration-300 relative z-10 cursor-default hidden sm:inline">
            |
          </a>

          <a
            onClick={() => scrollToSection(refs.paisesRef)}
            className="font-bold uppercase text-black hover:text-white transition-colors duration-300 relative z-10 cursor-pointer text-xs sm:text-sm"
          >
            Paises
          </a>

          <a className="font-bold uppercase text-black hover:text-white transition-colors duration-300 relative z-10 cursor-default hidden sm:inline">
            |
          </a>

          <a
            onClick={() => scrollToSection(refs.bebidasRef)}
            className="font-bold uppercase text-black hover:text-white transition-colors duration-300 relative z-10 cursor-pointer text-xs sm:text-sm"
          >
            Tragos y Bebidas
          </a>

          <span className="absolute w-full h-full top-0 left-0 bg-teal-200 rounded-full transform scale-x-0 group-hover:scale-x-110 transition-transform group-hover:duration-500 duration-1000 origin-right"></span>
          <span className="absolute w-full h-full top-0 left-0 bg-teal-400 rounded-full transform scale-x-0 group-hover:scale-x-110 transition-transform group-hover:duration-700 duration-700 origin-right"></span>
          <span className="absolute w-full h-full top-0 left-0 bg-teal-600 rounded-full transform scale-x-0 group-hover:scale-x-110 transition-transform group-hover:duration-1000 duration-500 origin-right"></span>
        </nav>
      </div>
    </div>
  );
};

export default Menu;
