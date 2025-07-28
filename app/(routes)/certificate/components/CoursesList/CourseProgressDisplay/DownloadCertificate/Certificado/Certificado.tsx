import { CertificadoProps } from "./Cetificado.types";

export function Certificado(props: CertificadoProps) {
  const { certRef, titleCourse, userName } = props;

  return (
    <div
      ref={certRef}
      className="w-full h-[400px] relative bg-white overflow-hidden"
    >
      {/* Formas decorativas de fondo */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full transform -translate-x-8 -translate-y-8"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-500 to-blue-500 transform translate-x-16 -translate-y-16" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%)' }}></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-blue-400 to-purple-500 rounded-full transform translate-x-16 translate-y-16"></div>
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-gradient-to-tr from-pink-500 to-purple-400 transform -translate-x-12 translate-y-12" style={{ clipPath: 'polygon(0% 100%, 100% 0%, 100% 100%)' }}></div>
      
      {/* Ribbon decorativo superior derecho */}
      <div className="absolute top-4 right-4 w-16 h-20 bg-gradient-to-b from-purple-500 to-blue-500 transform rotate-12">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-purple-600"></div>
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col items-center justify-center h-full px-12 relative z-10">
        {/* Título principal */}
        <h1 className="text-3xl font-bold text-gray-800 mb-1 tracking-wide">
          CERTIFICADO
        </h1>
        <h2 className="text-lg font-semibold text-gray-700 mb-4 tracking-widest">
          DE FINALIZACIÓN
        </h2>

        {/* Certifica a */}
        <p className="text-sm text-gray-600 mb-2 tracking-wide">
          CERTIFICA A:
        </p>

        {/* Nombre del usuario */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-1">
            {userName || "Nombre del Usuario"}
          </h3>
          <div className="w-80 h-0.5 bg-gray-800 mx-auto"></div>
        </div>

        {/* Texto descriptivo */}
        <p className="text-center text-gray-700 mb-3 max-w-sm leading-relaxed text-sm">
          Por haber completado los estudios y cumplido con los requisitos 
          planteados del curso:
        </p>

        {/* Nombre del curso */}
        <h4 className="text-xl font-bold text-gray-800 mb-6 text-center">
          {titleCourse || "Nombre del Curso"}
        </h4>

        {/* Footer */}
       <div className="absolute bottom-8 left-8">
          <p className="text-sm text-gray-600 mb-1 text-center">
            {new Date().toLocaleDateString()}
          </p>
            <div className="w-32 h-0.5 bg-gray-800 mx-auto"></div>
          <p className="text-sm font-semibold text-gray-700 tracking-widest">
            ARANGODEV.COM
          </p>
        </div>
      </div>

      {/* Elementos decorativos adicionales */}
      <div className="absolute top-1/2 left-4 w-3 h-3 bg-purple-400 rounded-full"></div>
      <div className="absolute top-1/3 right-8 w-2 h-2 bg-blue-800 rounded-full"></div>
      <div className="absolute bottom-1/3 left-8 w-4 h-4 bg-blue-400 rounded-full"></div>
      
      {/* Puntos decorativos */}
      <div className="absolute top-1/4 right-1/4">
        <div className="grid grid-cols-3 gap-1">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-gray-300 rounded-full"></div>
          ))}
        </div>
      </div>
      <p >{ new Date().toLocaleDateString()}</p>
    </div>
  );
}