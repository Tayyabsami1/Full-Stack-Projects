import Image from "next/image";

import ParticlesContainer from '../components/ParticlesContainer'
import ProjectsBtn from '../components/ProjectsBtn';
import Avatar from '../components/Avatar'

import { easeInOut, motion } from 'framer-motion';
import { fadeIn } from "../variants";

const Home = () => {
  return( <div className="bg-gradient-to-r from primary/10 to via-black/30 to-black/10 h-full ">

    <div className="w-full h-full  mt-28 xl:mt-0">
      <div className="text-center flex flex-col justify-center xl:pt-40  xl:text-left h-full container mx-auto">
        <motion.h1 className=" md:text-5xl xl:text-6xl h1"
          variants={fadeIn('down', 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
        >The Client Whisperer: Engage. Advocate. <span className="text-accent">Capture.</span></motion.h1>
        <motion.p className="max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-1 xl:mb-16 md:mb-1"
          variants={fadeIn('down', 0.5)}
          initial="hidden"
          animate="show"
          exit="hidden"
        >Multilingual professional with expertise in International CSR, photography, customer support & sales/marketing. Proficient in German & Microsoft Office Word, Excel, Sheets. Bridges cultures, captures visuals, & delivers exceptional service.</motion.p>
        <div className="flex justify-center xl:hidden relative">
          <ProjectsBtn />
        </div>

        <motion.div
          variants={fadeIn('down', 0.6)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="hidden xl:flex">
          <ProjectsBtn />
        </motion.div>
      </div>

    </div>

    <div className="h-full w-[1200px] absolute right-0 bottom-0 ">
      <div className="bg-none xl:bg-explosion xl:bg-cover xl:bg-right xl:bg-no-repeat w-full h-full absolute mix-blend-color-dodge translate-z-0">
      </div>
      <ParticlesContainer />
      <motion.div
        variants={fadeIn('up', 0.5)}
        initial="hidden"
        animate="show"
        exit="hidden"
        transition={{ duration: 1, ease: easeInOut }}
        className="h-full w-full max-h-[678px] max-w-[737px] absolute xl:-bottom-20  lg:right-[1%] lg:bottom-0 "><Avatar /></motion.div>
    </div>

  </div>);
};

export default Home;
