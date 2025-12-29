"use client";

import { useState, useEffect, Fragment } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { CarProps } from "@/types";
import { specialNames } from "@/constants";
import { generateCarImageURL } from "@/utils";

interface CarDetailsProps {
  isOpen: boolean;
  closeModel: () => void;
  car: CarProps;
}

const CarDetails = ({ isOpen, closeModel, car }: CarDetailsProps) => {
  const [carImages, setCarImages] = useState<string[]>([
    "/default.png",
    "/default.png",
    "/default.png",
    "/default.png",
  ]);

  useEffect(() => {
    const fetchCarImages = async () => {
      const images = await Promise.all([
        generateCarImageURL(car),
        generateCarImageURL(car, "front"),
        generateCarImageURL(car, "side"),
        generateCarImageURL(car, "rear"),
      ]);
      setCarImages(images);
    };

    fetchCarImages();
  }, [car]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModel}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25"></div>
          </TransitionChild>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="flex flex-col gap-5 relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl p-6 bg-white text-left shadow-xl transition-all">
                  <button
                    type="button"
                    onClick={closeModel}
                    className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full cursor-pointer"
                  >
                    <Image
                      src="/close.svg"
                      alt="Close"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </button>
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="relative w-full h-40 bg-[url(../public/pattern.png)] bg-cover bg-center rounded-lg">
                      <Image
                        src={carImages[0]}
                        alt="Car Image"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                        className="object-contain"
                      />
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                        <Image
                          src={carImages[1]}
                          alt="Car Image"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                        <Image
                          src={carImages[2]}
                          alt="Car Image"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                        <Image
                          src={carImages[3]}
                          alt="Car Image"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <h2 className="text-xl font-semibold">
                      {car.make} {car.model}
                    </h2>
                    <div className="flex flex-wrap gap-4 mt-3">
                      {Object.entries(car).map(([key, value]) => (
                        <div
                          className="flex justify-between gap-5 w-full text-right"
                          key={key}
                        >
                          <h4 className="text-grey capitalize">
                            {key
                              .split("_")
                              .map((word, index) =>
                                index === 1 && word.toLowerCase() === "mpg"
                                  ? "MPG"
                                  : word
                              )
                              .join(" ")}
                          </h4>
                          <p className="text-black-100 font-semibold">
                            {specialNames.find((item) => item.name === value)
                              ?.display || (
                              <span className="capitalize">{value}</span>
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CarDetails;
