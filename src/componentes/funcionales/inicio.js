import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import "../../styles/styles.css";

const Inicio = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="w-full min-h-screen flex flex-col items-center justify-center text-center p-4 sm:p-6 relative bg-gradient-to-t from-white to-teal-100"
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <motion.h1
          className="text-4xl sm:text-6xl md:text-8xl font-bold text-teal-800 mb-6"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          ¡Bienvenido a recetas y bebidas!
        </motion.h1>

        <motion.p
          className="text-2xl sm:text-3xl md:text-4xl text-teal-600 mb-8"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Descubre el sabor del mundo con nuestra selección diaria de recetas.
        </motion.p>

        <motion.div
          className="space-y-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-lg sm:text-xl md:text-2xl text-teal-700 hover:text-teal-500 transition-colors duration-300">
            Sumérgete en la cocina de diferentes países y elige la receta que
            más te inspire.
          </p>
          <p className="text-lg sm:text-xl md:text-2xl text-teal-700 hover:text-teal-500 transition-colors duration-300">
            Déjate cautivar por nuestra exclusiva selección de tragos, perfectos
            para cada ocasión.
          </p>
          <motion.p
            className="text-2xl sm:text-3xl md:text-4xl text-teal-600 font-semibold"
            whileHover={{ scale: 1.05, originX: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            ¡La gastronomía global al alcance de tus manos!
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            Explora nuestras recetas
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
});

export default Inicio;
