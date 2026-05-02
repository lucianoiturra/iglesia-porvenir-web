import { useState } from 'react';
import { SALAS, SERVICE_ROOMS } from '@/data/salas';

type RoomId = string;

interface RoomInfo {
  nombre: string;
  sub?: string;
  edad?: string;
  capacidad?: number;
  area?: number;
  desc: string;
  color?: string;
  iconColor?: string;
  img?: string | null;
}

function getRoomInfo(id: RoomId): RoomInfo | null {
  const sala = SALAS.find((s) => s.id === id);
  if (sala) {
    return {
      nombre: sala.nombre,
      sub: sala.sub,
      edad: sala.edad,
      capacidad: sala.capacidad,
      area: sala.area,
      desc: sala.desc,
      color: sala.color,
      iconColor: sala.iconColor,
      img: sala.img,
    };
  }
  const service = SERVICE_ROOMS.find((s) => s.id === id);
  if (service) {
    return { nombre: service.nombre, desc: service.desc };
  }
  return null;
}

// Zonas clicables sobre la imagen (coordenadas en espacio 1414×2000)
const FLOOR1_ROOMS = [
  { id: 'bebes',         x: 270,  y: 148,  w: 625, h: 788,  color: '59,130,246'  },
  { id: 'principiantes', x: 270,  y: 952,  w: 625, h: 915,  color: '16,185,129'  },
  { id: 'circ1',         x: 893,  y: 148,  w: 465, h: 1070, color: '148,163,184' },
  { id: 'cocina',        x: 1058, y: 1228, w: 300, h: 235,  color: '234,179,8'   },
  { id: 'bano1',         x: 893,  y: 1468, w: 465, h: 400,  color: '59,130,246'  },
];

const FLOOR2_ROOMS = [
  { id: 'balcon',         x: 108,  y: 35,   w: 515, h: 365, color: '16,185,129'  },
  { id: 'jovenes',        x: 742,  y: 35,   w: 620, h: 378, color: '251,146,60'  },
  { id: 'primarios',      x: 108,  y: 403,  w: 580, h: 645, color: '59,130,246'  },
  { id: 'circ2',          x: 698,  y: 403,  w: 320, h: 645, color: '148,163,184' },
  { id: 'intermediarios', x: 1028, y: 403,  w: 335, h: 645, color: '124,58,237'  },
  { id: 'gteen',          x: 108,  y: 1055, w: 580, h: 845, color: '20,184,166'  },
  { id: 'bano2',          x: 698,  y: 1055, w: 320, h: 845, color: '59,130,246'  },
  { id: 'infantes',       x: 1028, y: 1055, w: 335, h: 845, color: '16,185,129'  },
];

export default function FloorPlan() {
  const [floor, setFloor] = useState<1 | 2>(1);
  const [selectedRoom, setSelectedRoom] = useState<RoomId | null>(null);

  const info = selectedRoom ? getRoomInfo(selectedRoom) : null;

  const handleRoomClick = (id: RoomId) => {
    setSelectedRoom(id === selectedRoom ? null : id);
  };

  const rooms = floor === 1 ? FLOOR1_ROOMS : FLOOR2_ROOMS;

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">

      {/* Visor del plano — ancho fijo para que quepa en pantalla */}
      <div className="w-full lg:w-80 xl:w-96 shrink-0">
        {/* Tabs */}
        <div className="flex gap-2 mb-4" role="tablist" aria-label="Pisos del edificio">
          {([1, 2] as const).map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={floor === f}
              onClick={() => { setFloor(f); setSelectedRoom(null); }}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                floor === f
                  ? 'bg-[#003366] text-white'
                  : 'bg-[#F5F5F5] text-[#444444] hover:bg-[#E5E7EB]'
              }`}
            >
              Piso {f}
            </button>
          ))}
        </div>

        {/* Plano con zonas clicables */}
        <div className="relative rounded-xl border border-[#E5E7EB] overflow-hidden bg-white">
          <img
            src={floor === 1 ? '/images/planta-1.png' : '/images/planta-2.png'}
            alt={`Planta del ${floor === 1 ? 'primer' : 'segundo'} piso`}
            className="w-full block"
            draggable={false}
          />
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1414 2000"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {rooms.map(({ id, x, y, w, h }) => (
              <rect
                key={id}
                x={x} y={y} width={w} height={h}
                fill="transparent"
                className="cursor-pointer focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#1A78C2]"
                onClick={() => handleRoomClick(id)}
                tabIndex={0}
                role="button"
                aria-label={getRoomInfo(id)?.nombre ?? id}
                onKeyDown={(e) => e.key === 'Enter' && handleRoomClick(id)}
              />
            ))}
          </svg>
        </div>

        <p className="text-xs text-[#94A3B8] mt-2 text-center">
          Tocá cualquier recinto para ver sus detalles
        </p>
      </div>

      {/* Panel de información */}
      <div className="flex-1 min-w-0 max-w-md w-full">
        {info ? (
          <div
            className="rounded-xl border border-[#E5E7EB] overflow-hidden bg-white"
            style={{ borderTopWidth: '4px', borderTopColor: info.iconColor ?? '#1A78C2' }}
          >
            {/* Imagen de portada */}
            {info.img && (
              <img
                src={info.img}
                alt={info.nombre}
                className="w-full h-auto object-contain"
              />
            )}

            <div className="p-5">
              {info.edad && (
                <span
                  className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3"
                  style={{ color: info.iconColor, background: `${info.iconColor}18` }}
                >
                  {info.edad}
                </span>
              )}
              <h3 className="text-lg font-bold text-[#003366] mb-1">{info.nombre}</h3>
              {info.sub && <p className="text-sm text-[#6B7280] mb-3">{info.sub}</p>}
              {info.capacidad && (
                <div className="flex gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-xl font-bold" style={{ color: info.iconColor }}>{info.capacidad}</div>
                    <div className="text-xs text-[#6B7280]">niños</div>
                  </div>
                  <div className="w-px bg-[#E5E7EB]"></div>
                  <div className="text-center">
                    <div className="text-xl font-bold" style={{ color: info.iconColor }}>{info.area}</div>
                    <div className="text-xs text-[#6B7280]">m²</div>
                  </div>
                </div>
              )}
              <p className="text-sm text-[#444444] leading-relaxed">{info.desc}</p>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-[#E5E7EB] p-8 flex flex-col items-center justify-center text-center min-h-[200px]">
            <svg className="w-10 h-10 text-[#CBD5E1] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
              <path d="M3 9h18M9 21V9" strokeWidth="1.5" />
            </svg>
            <p className="text-sm text-[#94A3B8]">Seleccioná un recinto en el plano para ver sus detalles</p>
          </div>
        )}
      </div>

    </div>
  );
}
