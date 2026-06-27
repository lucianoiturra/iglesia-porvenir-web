export interface Sala {
  id: string;
  nombre: string;
  sub: string;
  edad: string;
  capacidad: number;
  maestros: number;
  area: number;
  piso: 1 | 2;
  img: string | null;
  color: string;
  iconColor: string;
  desc: string;
}

export interface ServiceRoom {
  id: string;
  nombre: string;
  desc: string;
}

export const SALAS: Sala[] = [
  {
    id: 'bebes',
    nombre: 'Sala de Bebés',
    sub: 'Sala de Bebés',
    edad: '0 a 12 meses',
    capacidad: 10,
    maestros: 2,
    area: 15.5,
    piso: 1,
    img: '/images/renders/thumbs/Sala bebes.webp',
    color: '#DBEAFE',
    iconColor: '#3B82F6',
    desc: 'Un espacio seguro y acogedor especialmente diseñado para los bebés de la congregación. El acceso con coches es directo desde el corredor principal, y el baño para personas con movilidad reducida con mudador de bebés está a pasos de esta sala. Un lugar para que los padres puedan participar del culto con tranquilidad.',
  },
  {
    id: 'principiantes',
    nombre: 'Sala Principiantes',
    sub: 'Sala Principiantes',
    edad: '1 a 3 años',
    capacidad: 15,
    maestros: 3,
    area: 17.7,
    piso: 1,
    img: '/images/renders/thumbs/Imagen 3 - Sala principiantes.webp',
    color: '#D1FAE5',
    iconColor: '#059669',
    desc: 'Diseñada para los niños que dan sus primeros pasos en la fe. Con espacio para 15 niños y 3 maestros, ofrece un ambiente cálido y estimulante a escala infantil, con todo lo necesario para que los pequeños descubran el amor de Dios a través del juego.',
  },
  {
    id: 'infantes',
    nombre: 'Sala Infantes',
    sub: 'Sala Infantes',
    edad: '4 a 6 años',
    capacidad: 10,
    maestros: 4,
    area: 10.3,
    piso: 2,
    img: '/images/renders/thumbs/Sala infantes.webp',
    color: '#D1FAE5',
    iconColor: '#059669',
    desc: 'Los preescolares tienen aquí su propio espacio de descubrimiento. Con 4 maestros para 10 niños, esta sala ofrece una atención muy personalizada donde los niños aprenden las historias bíblicas a través del juego, la música y la creatividad.',
  },
  {
    id: 'primarios',
    nombre: 'Sala Primarios',
    sub: 'Sala Primarios',
    edad: '7 a 9 años',
    capacidad: 20,
    maestros: 3,
    area: 19.3,
    piso: 2,
    img: '/images/renders/thumbs/Sala priomarios.webp',
    color: '#BFDBFE',
    iconColor: '#3B82F6',
    desc: 'Pensada para el grupo más numeroso de la iglesia. Los niños de primer ciclo básico cuentan aquí con espacio para actividades grupales dinámicas, presentaciones, juegos y estudio bíblico activo.',
  },
  {
    id: 'intermediarios',
    nombre: 'Sala Intermediarios',
    sub: 'Sala Intermediarios',
    edad: '10 a 12 años',
    capacidad: 10,
    maestros: 2,
    area: 13.4,
    piso: 2,
    img: '/images/renders/thumbs/Sala intermediarios.webp',
    color: '#EDE9FE',
    iconColor: '#7C3AED',
    desc: 'Un espacio íntimo pensado para acompañar a los preadolescentes en una etapa clave de su desarrollo. El tamaño más reducido favorece las conversaciones profundas, el debate y el estudio bíblico conectado a su realidad cotidiana.',
  },
  {
    id: 'gteen',
    nombre: 'Sala Gteen',
    sub: 'Sala Gteen',
    edad: '13 a 15 años',
    capacidad: 21,
    maestros: 2,
    area: 17.1,
    piso: 2,
    img: '/images/renders/thumbs/Imagen 2 - Sala Gteen.webp',
    color: '#CCFBF1',
    iconColor: '#0D9488',
    desc: 'Un espacio amplio para los adolescentes de 13 a 15 años. Diseñada para fomentar la conexión entre pares, el liderazgo y la construcción de una identidad cristiana sólida durante los años más determinantes de la adolescencia temprana.',
  },
  {
    id: 'jovenes',
    nombre: 'Sala de Jóvenes',
    sub: 'Sala de Jóvenes',
    edad: '16 a 25 años',
    capacidad: 20,
    maestros: 1,
    area: 17.5,
    piso: 2,
    img: '/images/renders/thumbs/Sala jovenes.webp',
    color: '#FED7AA',
    iconColor: '#EA580C',
    desc: 'El espacio de los jóvenes adultos cuenta con un panel acústico tipo acordeón que permite dividirlo en dos ambientes independientes o unirlos para actividades más grandes.',
  },
];

export const SERVICE_ROOMS: ServiceRoom[] = [
  {
    id: 'acceso',
    nombre: 'Acceso y escalera',
    desc: 'Corredor de acceso principal con pasillo vidriado y nueva escalera metálica con pasamanos a ambos lados. La escalera incluye un descanso intermedio para mayor seguridad.',
  },
  {
    id: 'circ1',
    nombre: 'Hall de entrada (Piso 1)',
    desc: 'Espacio central de circulación del primer piso (27.2 m²). Incluye el hall de ingreso, la escalera al segundo piso y el corredor de distribución hacia todas las salas, baño y cocina.',
  },
  {
    id: 'circ2',
    nombre: 'Pasillo de circulación (Piso 2)',
    desc: 'Corredor de circulación del segundo piso que da acceso a todas las salas del nivel superior (16.0 m²).',
  },
  {
    id: 'bano1',
    nombre: 'Baño accesible + Mudador',
    desc: 'Baño para personas con movilidad reducida (5.6 m²) que cumple con la normativa de accesibilidad universal. Incluye camilla de mudador de bebés, barras de apoyo y espacio suficiente para silla de ruedas.',
  },
  {
    id: 'bano2',
    nombre: 'Baño Piso 2',
    desc: 'Baño del segundo piso (5.2 m²) con inodoro, lavamanos y revestimiento cerámico completo.',
  },
  {
    id: 'cocina',
    nombre: 'Cocina',
    desc: 'Espacio para calentar y preparar alimentos (2.7 m²) con lavaplatos, refrigerador y microondas.',
  },
  {
    id: 'balcon',
    nombre: 'Balcón',
    desc: 'Balcón exterior del segundo piso (7.6 m²). Se revisará su estado estructural antes del inicio de obras.',
  },
];

export const PROYECTO = {
  metaTotal: 49365960,
  montoRecaudado: 24000000,
  costos: [
    {
      titulo: 'Estructura y accesos',
      desc: 'Demoliciones, nuevo acceso vidriado, escalera metálica y refuerzos estructurales.',
      monto: 11434000,
    },
    {
      titulo: 'Terminaciones interiores',
      desc: 'Tabiques, pinturas, cielos, pisos de cerámica y porcelanato, puertas y ventanas.',
      monto: 11180000,
    },
    {
      titulo: 'Baños, cocina y especialidades',
      desc: 'Baño accesible con mudador, cocina equipada, instalaciones de agua y alcantarillado.',
      monto: 6540000,
    },
    {
      titulo: 'Techumbre nueva',
      desc: 'Reemplazo completo del techo con filtraciones e instalación de canaletas exteriores.',
      monto: 5600000,
    },
    {
      titulo: 'Proyecto eléctrico completo',
      desc: 'Iluminación LED, WiFi, cámaras de seguridad, TV en cada sala y circuitos independientes.',
      monto: 6380000,
    },
    {
      titulo: 'Otros ítems y retiro de escombros',
      desc: 'Limpieza de obra, retiro de materiales y otros costos de cierre de proyecto.',
      monto: 350000,
    },
  ],
  avances: [] as { fecha: string; titulo: string; desc: string; fotos: string[] }[],
};

export const BANCO = {
  banco: 'BCI',
  tipoCuenta: 'Cuenta corriente',
  numeroCuenta: '35418532',
  rut: '65.002.737-K',
  titular: 'Iglesia de Porvenir',
  correo: 'tesoreriaporvenir@hotmail.com',
  asunto: 'Proyecto Nuevas Generaciones Porvenir',
};
