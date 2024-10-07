// import React from "react";
// import useDetallesReceta from "../../clase/DetallesReceta";
// import "../../../styles/styles.css";

// const VideoDeReceta = ({ idReceta }) => {
//   const { detallesReceta, cargando, error } = useDetallesReceta(idReceta);

//   if (cargando) {
//     return <div className="text-center">Cargando video de la receta...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500">Error: {error}</div>;
//   }

//   if (!detallesReceta || detallesReceta.length === 0) {
//     return (
//       <div className="text-center">No se ha seleccionado ninguna receta</div>
//     );
//   }

//   const obtenerUrlIncrustable = (url) => {
//     if (!url) return null;
//     const expresionRegular =
//       /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
//     const coincidencia = url.match(expresionRegular);
//     if (coincidencia && coincidencia[2].length === 11) {
//       return `https://www.youtube.com/embed/${coincidencia[2]}`;
//     }
//     return null;
//   };

//   const urlIncrustable = obtenerUrlIncrustable(detallesReceta[0].strYoutube);

//   if (!urlIncrustable) {
//     return (
//       <div className="text-center">
//         No hay video disponible para esta receta.
//       </div>
//     );
//   }

//   return (
//     <div className="flex sm:flex relative top-[-30] flex-col items-center">
//       <div className="relative w-[1000px] h-[500px] bg-white shadow-lg rounded-lg overflow-hidden m-6 transition-all duration-400">
//         <iframe
//           className="absolute inset-0 w-full h-full object-cover"
//           src={urlIncrustable}
//           title={detallesReceta[0].strMeal}
//           frameBorder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//         ></iframe>
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-20"></div>
//         <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
//           <h1 className="text-3xl font-bold text-white shadow-text">
//             {detallesReceta[0].strMeal}
//           </h1>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoDeReceta;
