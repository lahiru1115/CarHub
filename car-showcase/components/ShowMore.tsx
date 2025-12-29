"use client";

import { useRouter } from "next/navigation";
import CustomButton from "./CustomButton";
import { ShowMoreProps } from "@/types";
import { updateSearchParams } from "@/utils";

const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
  const router = useRouter();

  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * 10;
    const newPathName = updateSearchParams("limit", `${newLimit}`);
    router.push(newPathName, { scroll: false });
  };

  return (
    <div className="w-full flex justify-center mt-10">
      {!isNext && (
        <CustomButton
          title="Show More"
          btnType="button"
          containerStyles="bg-primary-blue rounded-full text-white cursor-pointer"
          handleClick={handleNavigation}
        />
      )}
    </div>
  );
};

export default ShowMore;
