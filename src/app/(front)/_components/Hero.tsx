import Image, { StaticImageData } from "next/image";

const Hero = ({ image }: { image: StaticImageData }) => {
  return (
    <div className="bg-slate-700 flex justify-center items-center min-h-72 relative">
      <Image
        src={image}
        alt="Picture of the author"
        className="absolute inset-0 object-cover w-full h-full"
      />
    </div>
  );
};

export default Hero;
