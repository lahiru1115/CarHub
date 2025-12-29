"use client";

import { useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from "@headlessui/react";
import { CustomFilterProps } from "@/types";
import { updateSearchParams, removeSearchParam } from "@/utils";

const CustomFilter = ({ title, options }: CustomFilterProps) => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleUpdateFilter = (option: { title: string; value: string }) => {
    if (option.value === "") {
      const newPathName = removeSearchParam(title);
      router.push(newPathName, { scroll: false });
    } else {
      const newPathName = updateSearchParams(title, option.value.toLowerCase());
      router.push(newPathName, { scroll: false });
    }
  };

  return (
    <div className="w-fit">
      <Listbox
        value={selectedOption}
        onChange={(option) => {
          setSelectedOption(option);
          handleUpdateFilter(option);
        }}
      >
        <div className="relative w-fit z-8">
          <ListboxButton className="custom-filter__btn">
            <span className="block truncate">{selectedOption.title}</span>
            <Image
              src="/chevron-up-down.svg"
              alt="Chevron"
              width={20}
              height={20}
              className="ml-4 object-contain"
            />
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="custom-filter__options">
              {options.map((option) => (
                <ListboxOption
                  key={option.value}
                  value={option}
                  className={({ focus }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      focus ? "bg-primary-blue text-white" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected }) => (
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.title}
                    </span>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default CustomFilter;
