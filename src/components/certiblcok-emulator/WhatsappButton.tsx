import React from 'react';

const WhatsAppVerificationButton = ( ) => {
  return (
    <button
      className="group flex w-full max-w-md items-center justify-between rounded-2xl border border-green-100 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all hover:border-green-300 hover:shadow-[0_4px_12px_rgba(37,211,102,0.1)] active:scale-[0.99]"
    >
      {/* Sección Izquierda: Logo WhatsApp */}
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-4 w-4 text-[#25D366]" // Color oficial de WhatsApp
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.472 14.382C17.175 14.232 15.714 13.515 15.441 13.415C15.169 13.316 14.971 13.266 14.773 13.564C14.575 13.862 14.005 14.53 13.832 14.729C13.658 14.927 13.485 14.952 13.188 14.803C12.891 14.654 11.934 14.341 10.799 13.33C9.90699 12.535 9.30499 11.554 9.15599 11.256C9.00699 10.958 9.14099 10.82 9.28999 10.672C9.42399 10.538 9.58899 10.323 9.73799 10.15C9.88699 9.976 9.93599 9.852 10.035 9.654C10.134 9.455 10.085 9.281 10.01 9.132C9.93599 8.983 9.34099 7.519 9.09299 6.924C8.85199 6.346 8.60799 6.425 8.42899 6.425C8.25799 6.425 8.05999 6.425 7.86199 6.425C7.66399 6.425 7.34199 6.499 7.06999 6.797C6.79799 7.095 6.02999 7.814 6.02999 9.277C6.02999 10.74 7.09499 12.153 7.24399 12.352C7.39299 12.551 9.32999 15.534 12.296 16.815C13.002 17.12 13.553 17.302 13.987 17.44C14.764 17.687 15.473 17.652 16.036 17.568C16.662 17.475 17.975 16.775 18.247 16.006C18.52 15.237 18.52 14.592 18.446 14.468C18.371 14.344 18.173 14.282 17.876 14.133H17.472Z"
            fill="currentColor"
          />
          <path
            d="M12.004 2C6.481 2 2 6.48 2 12C2 13.966 2.565 15.797 3.55 17.355L2.344 21.758L6.852 20.574C8.36 21.467 10.13 21.986 12.004 21.986C17.527 21.986 22.008 17.506 22.008 11.986C22.008 6.466 17.523 2 12.004 2ZM12.004 20.316C10.334 20.316 8.761 19.851 7.411 19.049L7.094 18.861L4.423 19.562L5.136 16.958L4.93 16.63C4.062 15.253 3.585 13.659 3.585 11.986C3.585 7.34 7.362 3.563 12.008 3.563C16.654 3.563 20.431 7.34 20.431 11.986C20.431 16.632 16.649 20.316 12.004 20.316Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Sección Central: Textos */}
      <div className="ml-4 flex flex-1 flex-col items-start text-left">
        <span className="text-[9px] font-semibold text-slate-800">
          Verificar con WhatsApp
        </span>
        <span className="text-[6px] font-medium text-slate-500">
          Confirma la autenticidad del producto
        </span>
      </div>

      {/* Sección Derecha: Flecha */}
      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-gray-100 bg-white transition-transform duration-300 group-hover:translate-x-1">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#55CB66]" // Verde suave para la flecha como en la imagen
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </div>
    </button>
  );
};

export default WhatsAppVerificationButton;