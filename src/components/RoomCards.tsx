import { useState, useEffect, useRef } from 'react';
import { SALAS, type Sala } from '@/data/salas';

function RoomModal({ sala, onClose }: { sala: Sala; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    // Focus the modal to trap keyboard
    setTimeout(() => {
      if (modalRef.current) modalRef.current.focus();
    }, 10);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl focus:outline-none"
        style={{ animation: 'modalIn 0.28s cubic-bezier(0.34,1.56,0.64,1)' }}
      >
        {sala.img && (
          <div className="relative">
            <img
              src={sala.img}
              alt={`Render de ${sala.nombre}`}
              className="w-full h-48 object-cover rounded-t-2xl"
            />
          </div>
        )}
        <div
          className="p-6"
          style={{ background: sala.img ? undefined : `linear-gradient(135deg, ${sala.color}66, ${sala.color}33)` }}
        >
          <span
            className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3"
            style={{ color: sala.iconColor, background: `${sala.iconColor}18` }}
          >
            {sala.edad}
          </span>
          <h3 id="modal-title" className="text-xl font-bold text-[#003366] mb-1">{sala.nombre}</h3>
          <p className="text-sm text-[#6B7280] mb-4">{sala.sub} · Piso {sala.piso}</p>

          <div className="flex gap-4 mb-4">
            <div className="text-center flex-1">
              <div className="text-2xl font-bold" style={{ color: sala.iconColor }}>{sala.capacidad}</div>
              <div className="text-xs text-[#6B7280]">niños</div>
            </div>
            <div className="w-px bg-[#E5E7EB]"></div>
            <div className="text-center flex-1">
              <div className="text-2xl font-bold" style={{ color: sala.iconColor }}>{sala.maestros}</div>
              <div className="text-xs text-[#6B7280]">maestros</div>
            </div>
            <div className="w-px bg-[#E5E7EB]"></div>
            <div className="text-center flex-1">
              <div className="text-2xl font-bold" style={{ color: sala.iconColor }}>{sala.area}</div>
              <div className="text-xs text-[#6B7280]">m²</div>
            </div>
          </div>

          <p className="text-sm text-[#444444] leading-relaxed">{sala.desc}</p>

          <button
            onClick={onClose}
            className="mt-5 w-full py-2.5 rounded-lg bg-[#003366] text-white text-sm font-semibold hover:bg-[#1A78C2] transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RoomCards() {
  const [selected, setSelected] = useState<Sala | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {SALAS.map((sala, i) => (
          <button
            key={sala.id}
            onClick={() => setSelected(sala)}
            className="reveal text-left rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,51,102,0.09)] bg-white hover:shadow-[0_8px_40px_rgba(0,51,102,0.15)] hover:-translate-y-1.5 transition-all duration-200 focus-visible:outline-[3px] focus-visible:outline-[#1A78C2] focus-visible:outline-offset-2"
            style={{ transitionDelay: `${(i % 4) * 0.1}s` }}
            aria-label={`Ver detalles de ${sala.nombre}`}
          >
            {/* Image or color placeholder */}
            <div
              className="relative h-44 flex items-center justify-center overflow-hidden"
              style={{ background: sala.color }}
            >
              {sala.img ? (
                <img
                  src={sala.img}
                  alt={`Render ${sala.nombre}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <span className="text-4xl font-black opacity-20 text-[#003366]">
                  {sala.nombre[0]}
                </span>
              )}
              <span className="absolute top-2.5 right-2.5 text-[10px] font-semibold uppercase tracking-wider bg-[#0D1F2D]/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-full">
                Piso {sala.piso}
              </span>
            </div>

            {/* Body */}
            <div className="p-5">
              <span
                className="inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-2"
                style={{ color: sala.iconColor, background: `${sala.iconColor}18` }}
              >
                {sala.edad}
              </span>
              <h3 className="text-[15px] font-bold text-[#003366] mb-1">{sala.nombre}</h3>
              <p className="text-xs text-[#6B7280]">{sala.capacidad} alumnos · {sala.maestros} maestros · {sala.area} m²</p>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <RoomModal sala={selected} onClose={() => setSelected(null)} />
      )}

      <style>{`
        @keyframes modalIn {
          from { transform: scale(0.94); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
}
