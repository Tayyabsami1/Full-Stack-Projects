import Link from "next/link";
import {RiLinkedinLine,RiInstagramLine, RiFacebookLine,RiCamera3Line} from "react-icons/ri";
const Socials = () => {
  return <div className="flex  items-center text-lg gap-x-5">
    <Link href={'https://www.instagram.com/_.ayawnn/'} target="_blank" className="hover:text-accent transition-all duration-300 ">
    <RiInstagramLine/>
    </Link>
    <Link href={'https://www.linkedin.com/in/ayaan-ali-91565b284'} target="_blank" className="hover:text-accent transition-all duration-300">
    <RiLinkedinLine/>
    </Link>
    <Link href={'https://www.facebook.com/profile.php?id=100012843728398'} target="_blank"  className="hover:text-accent transition-all duration-300">
    <RiFacebookLine/>
    </Link>
    <Link href={'http://vsco.co/ayawnn04'}  target="_blank" className="hover:text-accent transition-all duration-300">
    <RiCamera3Line/>
    </Link>
  </div>;
};

export default Socials;
