/* eslint-disable react/jsx-key */
// icons
import {
  HiHome,
  HiUser,
  HiViewColumns,
  HiRectangleGroup,
  HiChatBubbleBottomCenterText,
  HiEnvelope,
} from 'react-icons/hi2';

// nav data
export const navData = [
  { name: 'home', path: '/', icon: <HiHome /> },
  { name: 'about', path: '/about', icon: <HiUser /> },
  { name: 'services', path: '/services', icon: <HiRectangleGroup /> },
  { name: 'work', path: '/work', icon: <HiViewColumns /> },
  {
    name: 'testimonials',
    path: '/testimonials',
    icon: <HiChatBubbleBottomCenterText />,
  },
  {
    name: 'contact',
    path: '/contact',
    icon: <HiEnvelope />,
  },
];
import Link from 'next/link';
import { useRouter } from 'next/router';

const Nav = () => {
  const router=useRouter();
  const pathName=router.pathname;
  return <nav className='flex flex-col  items-center xl:justify-center gap-y-4 fixed h-max bottom-0 mt-auto xl: right-[2%] z-50 top-0 w-full xl:w-16 xl:max-w-md xl:h-screen'>
    <div className='flex w-full xl:flex-col items-center justify-between xl:justify-center gap-y-10 px-4 xl:px-0 md:px-40 xl:h-max py-8 h-[80px] bg-white/10 backdrop-blur-sm text-3xl xl-text-xl xl:rounded-full '>
      {navData.map((link, index) => {
        return <Link className={`${link.path===pathName && 'text-accent'} relative flex items-center hover:text-accent transition-all ease-in duration-200 `} key={index} href={link.path} >
          {link.icon}
        </Link>
      })}
    </div>
  </nav>;
};

export default Nav;
