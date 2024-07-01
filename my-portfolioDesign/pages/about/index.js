// icons
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaWordpress,
  FaFigma,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiFramer,
  SiAdobexd,
  SiAdobephotoshop,
} from "react-icons/si";

import { useState } from "react";
import Avatar from '../../components/Avatar'
import { motion } from "framer-motion";
import { fadeIn } from '../../variants'
import Circles from '../../components/Circles'
//  data
const aboutData = [
  {
    title: 'skills',
    info: [
      {
        title: 'International Customer Service',
      },
      {
        title: 'Multilingual Support Specialist',
      },
      {
        title: 'Professional Photographer',
      },
      {
        title: 'Sales and  Services', 
      },
      {
        title: 'Customer Acquisition Acceleration', 
      },
    ],
  },
  {
    title: 'experience',
    info: [
      {
        title: 'International Customer Sales Rep - Quality Resource',
        stage: '2024 - Present',
      },
      {
        title: 'Customer Sales Rep - Instant Logistics',
        stage: '2023 - 2024',
      },
      {
        title: 'Sales and Marketing Rep - Century Properties ',
        stage: '2022 - 2023',
      },
     
    ],
  },
  {
    title: 'credentials',
    info: [
      {
        title: 'Matriculation ',
        stage: '2018 - 2020',
      },
      {
        title: 'Intermediate Punjab College',
        stage: '2020 - 2022',
      },
      {
        title: 'German Language School',
        stage: '2023 - 2024',
      },
    ],
  },
];

const About = () => {
  const [Index, setIndex] = useState(0);
  return <div className="h-full  py-32 text-center xl:text-left">
    <Circles />
    <motion.div
      variants={fadeIn('right', '0.3')}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="hidden xl:flex absolute -bottom-56 -left-[430px] translate-z-0 z-30">
      <Avatar/>
    </motion.div>

    <div className="container mx-auto h-full flex flex-col items-center xl:flex-row gap-x-6 ">
      <div className="flex-1 flex flex-col justify-center">
        <motion.h2
        variants={fadeIn('down', '0.3')}
        initial="hidden"
        animate="show"
        exit="hidden"
         className="h2 text-xl xl:text-6xl">
          The Creative Bridge <span className="text-accent">Builder </span>: Bridging Cultures & Building Success
        </motion.h2>
        <motion.p
        variants={fadeIn('up', '0.3')}
        initial="hidden"
        animate="show"
        exit="hidden"
         className="max-w-[500px] mx-auto xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0 text-sm xl:text-xl xl:mt-5">
          Dynamic professional excelling in International CSR, photography, customer support, and sales and marketing. Fluent in German and proficient in Excel, Word, and Sheets, I bring a blend of creativity and strategic expertise to every project.
        </motion.p>
      </div>

      <motion.div
      variants={fadeIn('left', '0.3')}
      initial="hidden"
      animate="show"
      exit="hidden"
       className="flex flex-col w-full xl:max-w-[48%] h-[210px]">
        <div className="flex gap-x-4 xl:gap-x-8 m-auto xl:mx-0  mb-4 ">
          {aboutData.map((item, itemIndex) => {
            return (
              <div style={{ cursor: "pointer", zIndex: 40 }} key={itemIndex}
                className={`${Index === itemIndex && 'text-accent after:w-[100%] after:bg-accent after:transition-all after:duration-300'} cursor-pointer capitalize xl:text-lg relative after:w-8 after:h-[2px] after:bg-white
                  after:absolute after:-bottom-1 after:left-0 after:ease-in-out`}
                onClick={() => setIndex(itemIndex)}
              >
                {item.title}
              </div>
            );
          })}
        </div>
        <div className="bg-pink-400/10 py-2 xl:py-6 px-2 xl:px-4 flex flex-col gap-y-2 xl:gap-y-4 items-center xl:items-start rounded-md xl:rounded-lg">
          {
            aboutData[Index].info.map((item, itemIndex) => {
              return (
                <div key={itemIndex} className="flex flex-col flex-1 md:flex-row max-w-max gap-x-2 items-center ">
                  <div className="font-light mb-2 md:mb-0">{item.title}</div>
                  <div className="hidden md:flex">-</div>
                  <div>{item.stage}</div>
                </div>
              )
            })
          }
        </div>
      </motion.div>
    </div>
  </div>;
};

export default About;
