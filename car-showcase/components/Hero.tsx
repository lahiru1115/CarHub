"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CustomButton from "./CustomButton";

const Hero = () => {
  const handleScroll = () => {
    const discoverSection = document.getElementById("discover");
    if (discoverSection) {
      discoverSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">
          Find, book or rent a car -- quickly and easily!
        </h1>
        <p className="hero__subtitle">
          Streamline your car rental process with our all-in-one platform.
        </p>
        <CustomButton
          title="Expore Cars"
          containerStyles="bg-primary-blue text-white rounded-full mt-10 cursor-pointer"
          handleClick={handleScroll}
        />
      </div>
      <motion.div
        className="hero__image-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="hero__image"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.75 }}
        >
          <Image
            src="/hero.png"
            alt="Hero"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
          />
        </motion.div>
        <div className="hero__image-overlay" />
      </motion.div>
    </div>
  );
};

export default Hero;
