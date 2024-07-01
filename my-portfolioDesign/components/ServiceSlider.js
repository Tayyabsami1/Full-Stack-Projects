import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper";

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import {
  RxCrop,
  RxPencil2,
  RxDesktop,
  RxReader,
  RxRocket,
  RxArrowTopRight
} from "react-icons/rx";

// data
const serviceData = [
  {
    icon: <RxCrop />,
    title: 'Branding',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    icon: <RxPencil2 />,
    title: 'Design',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    icon: <RxDesktop />,
    title: 'Development',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    icon: <RxReader />,
    title: 'Copywriting',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    icon: <RxRocket />,
    title: 'SEO',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];


const ServiceSlider = () => {
  return <Swiper breakpoints={{
    320: {
      slidesPerView: 1,
      spaceBetween: 15
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 15
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 15
    }}}
    FreeMode={true}
    pagination={{
      clickable: true,
    }}
    modules={{FreeMode,Pagination}}
    className="h-[240px] sm:h-[340px]">
      {serviceData.map((item, index) => {
        return (
            <SwiperSlide key={index}>
            <div>

            <div>
              {item.icon}
            </div>

            <div>
              <div>
                {item.title}
                <p>{item.description}</p>
              </div>
            </div>

            </div>
            </SwiperSlide>
            
        );
      })}
 </Swiper>;
};

export default ServiceSlider;
