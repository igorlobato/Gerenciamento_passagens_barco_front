import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function OfferCarousel() {
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
    <div className="carousel">
      <h2 className="carousel-title">Passagens em Oferta</h2>
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
        className="swiper"
      >
        {offers.map((offer) => (
          <SwiperSlide key={offer.id} className="swiper-slide">
            <div className="carousel-slide">
              <img src={offer.image} alt={offer.destination} className="carousel-image" />
              <div className="carousel-content">
                <h3 className="carousel-slide-title">{offer.origin} → {offer.destination}</h3>
                <p className="carousel-slide-text">Data: {offer.date}</p>
                <p className="carousel-slide-price">R$ {offer.price.toFixed(2)}</p>
                <button className="carousel-slide-button">Comprar</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default OfferCarousel;