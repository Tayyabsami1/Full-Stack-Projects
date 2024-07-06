import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode, Navigation } from "swiper";

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';


import {
  RxRocket,
  RxArrowTopRight,
  RxCrop
} from "react-icons/rx";
import { MdOutlineSell, MdOutlineVideoCameraBack } from "react-icons/md";
import { TbDeviceLandlinePhone } from "react-icons/tb";
import { BsPencil } from "react-icons/bs";

// data
const serviceData = [
  {
    icon: <RxCrop />,
    title: 'Branding',
    description: 'Craft compelling stories and spark connection that build brand loyalty and ignite customer engagement.',
  },
  {
    icon: <MdOutlineSell />,
    title: 'Sales and Marketing',
    description: ' Fuel your Brand\'s success with expert strategies, generate leads, and drive growth.',
  },
  {
    icon: <MdOutlineVideoCameraBack />,
    title: 'Photography',
    description: ' Capture images that speak a thousand words, elevating your brand and connecting with your audience.',
  },
  {
    icon: <TbDeviceLandlinePhone />,
    title: 'CSR for Growth',
    description: 'Align your business with positive impact.Customized CSR that enhance engagement.',
  },
  {
    icon: <BsPencil />,
    title: 'Copywriting',
    description: 'Craft persuasive copy that resonates with your audience, drives action, and achieves your marketing goals.',
  },
  {
    icon: <RxRocket />,
    title: 'SEO',
    description: ' Enhance your online presence with SEO strategies that boost website traffic and improve rankings.',
  },
];


const ServiceSlider = () => {
  return <Swiper
    breakpoints={{
      320: {
        slidesPerView: 1,
        spaceBetween: 15
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 15
      }
    }}
    FreeMode={true}
    pagination={{
      clickable: true,
    }}
    modules={[FreeMode, Pagination]}
    className="h-[240px] sm:h-[340px]">
    {serviceData.map((item, index) => {
      return (
        <SwiperSlide key={index}>
          <div className="bg-[rgba(65,47,123,0.15)] h-max rounded-lg py-8 px-6 flex sm:flex-col gap-x-6 sm:gap-x-0 cursor-pointer hover:bg-[rgba(89,65,169,0.15)] transition-all duration-100 ease-in-out group">

            <div className="text-4xl text-accent mb-4">
              {item.icon}
            </div>

            <div className="m-8">
              <div className="mb-2 text-lg">{item.title}</div>
              <p className="max-w-[350px] leading-normal">{item.description}</p>
            </div>
            <div className="text-2xl">
              <RxArrowTopRight style={{ zIndex: 100 }} className="group-hover:rotate-45 group-hover:text-accent transition-all duration-300" />
            </div>
          </div>
        </SwiperSlide>

      );
    })}
  </Swiper>;
};

export default ServiceSlider;
