import Image from "next/image";

const Bulb = () => {
  return <div className="absolute -left-36 -bottom-12 rotate-12 mix-blend-color-dodge animate-pulse duration-300 ease-in-out transition-all z-10 w-[200px] xl:w-[260px]">
    <Image
      src={'/bulb.png'}
      width={260}
      height={200}
      className="h-full w-full"
      alt=""
    />
  </div>;
};

export default Bulb;
