
const ReportButton = ( ) => {
  return (
    <button
      className="group flex w-full max-w-md items-center justify-between rounded-2xl bg-gradient-to-br from-[#C53F3F] to-[#9A2525] p-4 text-white shadow-lg transition-all hover:shadow-red-900/20 active:scale-[0.99]"
    >
      {/* Sección Izquierda: Icono de Alerta */}
      {/* Usamos bg-white/20 para crear el efecto de transparencia sobre el rojo */}
      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            fill="white" // Fondo blanco sólido del círculo
            fillOpacity="0" // Lo hacemos transparente si quieres solo el borde, pero en la imagen parece un icono relleno blanco solido
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2L2 20H22L12 2ZM13 16H11V18H13V16ZM13 10H11V14H13V10Z" 
            fill="white" // Icono de alerta relleno blanco
          />
          {/* Versión SVG más limpia del triángulo de alerta */}
          <path
            d="M11.006 4.60608C11.4173 3.80918 12.5562 3.80918 12.9675 4.60608L20.8953 19.9662C21.2723 20.6966 20.7424 21.5714 19.9145 21.5714H4.05904C3.23114 21.5714 2.70123 20.6966 3.07823 19.9662L11.006 4.60608Z"
            fill="white"
          />
          <path
            d="M12 9V14"
            stroke="#B91C1C"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 17.5V17"
            stroke="#B91C1C"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Sección Central: Textos */}
      <div className="ml-4 flex flex-1 flex-col items-start text-left">
        <span className="text-[9px] font-semibold text-white">
          Reportar
        </span>
        <span className="text-[6px] font-medium text-red-100 leading-tight">
          Producto abierto, dañado o con sellos violados
        </span>
      </div>

      {/* Sección Derecha: Flecha */}
      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:translate-x-1">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </div>
    </button>
  );
};

export default ReportButton;