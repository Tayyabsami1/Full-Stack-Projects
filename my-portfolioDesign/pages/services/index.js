import ServicesSlider from '../../components/ServiceSlider';
import Bulb from '../../components/Bulb';
import Circles from '../../components/Circles';
import {motion } from 'framer-motion';
import {fadeIn} from '../../variants'

// icons
import {
  RxCrop,
  RxPencil2,
  RxDesktop,
  RxReader,
  RxRocket,
} from "react-icons/rx";



const Services = () => {
  return <div className='h-full py-36 flex items-center'>
    <Circles/>
    <div className="container mx-auto">
      <div className='flex flex-col xl:flex-row gap-x-8 items-center'>
       <div className='flex text-center lg:text-left  xl:w-[30vw] flex-col mb-4 xl:mb-0 '>
          <h2 className='h2 xl:mt-8 '>
            My Services
            <span className='text-accent'>
              .
            </span>
          </h2>
            <p className='mb-4 max-w-[400px] mx-auto lg:mx-0'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam aliquid perspiciatis saepe inventore sit quo mollitia exercitationem eum aperiam minima.
            </p>
       </div>
        <ServicesSlider/>
    </div>
    </div>

    <Bulb/>
  </div>;
};

export default Services;
