import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/plugins/captions.css';

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  category: string;
}

const images: GalleryImage[] = [
  { src: '/images/renders/Imagen 1 - Entrada.jpg', alt: 'Entrada principal del complejo', caption: 'Entrada principal al complejo de salas', category: 'Exterior' },
  { src: '/images/renders/Sala bebes.png', alt: 'Sala de Bebés', caption: 'Sala de Bebés (0-12 meses)', category: 'Salas' },
  { src: '/images/renders/Imagen 3 - Sala principiantes.jpg', alt: 'Sala de Principiantes', caption: 'Sala Principiantes (1-3 años)', category: 'Salas' },
  { src: '/images/renders/Sala infantes.png', alt: 'Sala Infantes', caption: 'Sala Infantes (4-6 años)', category: 'Salas' },
  { src: '/images/renders/Sala priomarios.png', alt: 'Sala Primarios', caption: 'Sala Primarios (7-9 años)', category: 'Salas' },
  { src: '/images/renders/Sala intermediarios.png', alt: 'Sala Intermediarios', caption: 'Sala Intermediarios (10-12 años)', category: 'Salas' },
  { src: '/images/renders/Imagen 2 - Sala Gteen.jpg', alt: 'Sala Gteen', caption: 'Sala Gteen (13-15 años)', category: 'Salas' },
  { src: '/images/renders/Sala jovenes.png', alt: 'Sala de Jóvenes', caption: 'Sala de Jóvenes (16-25 años)', category: 'Salas' },
  { src: '/images/renders/Imagen 4 - Baño.jpg', alt: 'Baño accesible con mudador', caption: 'Baño accesible con mudador de bebés', category: 'Servicios' },
];

const categories = ['Todos', 'Exterior', 'Salas', 'Servicios'];

export default function ImageGallery() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const filtered = activeCategory === 'Todos'
    ? images
    : images.filter((img) => img.category === activeCategory);

  const lightboxSlides = filtered.map((img) => ({
    src: img.src,
    alt: img.alt,
    title: img.caption,
  }));

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Filtrar por categoría">
        {categories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${activeCategory === cat
                ? 'bg-[#003366] text-white'
                : 'bg-[#F5F5F5] text-[#444444] hover:bg-[#E5E7EB]'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setLightboxIndex(i)}
            className="group relative rounded-xl overflow-hidden aspect-video bg-[#E2EAF5] focus-visible:outline-[3px] focus-visible:outline-[#1A78C2] focus-visible:outline-offset-2"
            aria-label={`Abrir imagen: ${img.caption}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-[#003366]/0 group-hover:bg-[#003366]/40 transition-colors duration-300 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607zM10.5 7.5v6m3-3h-6" />
              </svg>
            </div>
            {/* Category badge */}
            <div className="absolute top-3 left-3">
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#0D1F2D]/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-full">
                {img.category}
              </span>
            </div>
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0D1F2D]/80 to-transparent p-4">
              <p className="text-white text-sm font-medium leading-tight">{img.caption}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={lightboxSlides}
        plugins={[Zoom, Captions]}
        zoom={{ maxZoomPixelRatio: 4, scrollToZoom: true }}
        captions={{ showToggle: false }}
        styles={{
          container: { backgroundColor: 'rgba(13, 31, 45, 0.97)' },
        }}
      />
    </div>
  );
}
