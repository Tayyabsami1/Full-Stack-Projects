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
          <motion.h2
          variants={fadeIn('up',0.3)}
          initial="hidden"
          animate="show"
          exit="hidden"
           className='h2 xl:mt-8 '>
            My Services
            <span className='text-accent'>
              .
            </span>
          </motion.h2>
            <motion.p
            variants={fadeIn('left',0.5)}
            initial="hidden"
            animate="show"
            exit="hidden"
             className='mb-4 max-w-[400px] mx-auto lg:mx-0 font-light'>
              <span className='text-accent font-bold'>Multilingual Creative Catalyst:</span> I craft compelling stories, bridge cultural divides, and drive sustainable growth through strategic CSR, captivating photography, and data-driven marketing.
            </motion.p>
       </div>
       <motion.div
       variants={fadeIn('right',0.7)}
       initial="hidden"
       animate="show"
       exit="hidden"
       className='w-full xl:max-w-[80%]'>
        <ServicesSlider/>

       </motion.div>
    </div>
    </div>

    <Bulb/>
  </div>;
};

export default Services;
