import Circles from '../../components/Circles';
import { BsArrowRight } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const Contact = () => {

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(1122)
    
  };
  return <div className='h-full '>
    <div className="container mx-auto py-32 text-center xl:text-left flex items-center justify-center h-full">
      <div className='flex flex-col max-w-[700px] '>
        <motion.h2 variants={fadeIn('down', 0.4)} initial="hidden" animate="show" exit="hidden" className='text-center h2 mb-12 '>Lets <span className='text-accent'>Connect.</span></motion.h2>
        <motion.form
          variants={fadeIn('right', 0.4)} initial="hidden" animate="show" exit="hidden"
          className='flex flex-col flex-1 gap-6 w-full mx-auto'>
          <div className="flex gap-x-6 w-full">
            <input  type="text" placeholder='name' className='input' required />
            <input   type="text" placeholder='email' className='input' required />
          </div>
          <input  type="text" placeholder='subject' className='input' required/>
          <textarea  placeholder='message' name="message" id="msg" className='textarea'></textarea>
          <motion.button type='submit' onClick={submitHandler} variants={fadeIn('up', 0.3)} initial="hidden" animate="show" exit="hidden" className='btn rounded-full border border-white/50 max-w-[170px] px-8 flex items-center
                justify-center transition-all duration-300 ease-in-out hover:border-accent overflow-hidden group'>
            <span className='group-hover:-translate-y-[120%] transition-all duration-500 ease-in-out' >Let&apos;s Talk</span>
            <BsArrowRight className='-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0
                  group-hover:opacity-100 transition-all duration-200 ease-in-out absolute text-[22px]'/>
          </motion.button>
        </motion.form>
      </div>
    </div>
  </div>;
};

export default Contact;
