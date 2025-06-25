import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function OfferCarousel() {
  // Mock data pra passagens em oferta (substituir por API)
  const offers = [
    {
      id: 1,
      origin: 'Salvador',
      destination: 'Morro de São Paulo',
      price: 99.90,
      date: '2025-07-01',
      image: 'https://via.placeholder.com/600x300?text=Morro+de+Sao+Paulo',
    },
    {
      id: 2,
      origin: 'Ilhéus',
      destination: 'Itacaré',
      price: 79.90,
      date: '2025-07-05',
      image: 'https://via.placeholder.com/600x300?text=Itacare',
    },
    {
      id: 3,
      origin: 'Porto Seguro',
      destination: 'Arraial d\'Ajuda',
      price: 59.90,
      date: '2025-07-10',
      image: 'https://via.placeholder.com/600x300?text=Arraial+d+Ajuda',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Passagens em Oferta</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="h-80"
      >
        {offers.map((offer) => (
          <SwiperSlide key={offer.id}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
              <img src={offer.image} alt={offer.destination} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{offer.origin} → {offer.destination}</h3>
                <p className="text-gray-600">Data: {offer.date}</p>
                <p className="text-blue-600 font-bold">R$ {offer.price.toFixed(2)}</p>
                <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Comprar
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default OfferCarousel;