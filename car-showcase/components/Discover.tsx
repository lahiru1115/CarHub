"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SearchBar from "./SearchBar";
import CarCard from "./CarCard";
import CustomFilter from "./CustomFilter";
import ShowMore from "./ShowMore";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";

const Discover = () => {
  const searchParams = useSearchParams();
  const [allCars, setAllCars] = useState([]);
  const [isDataEmpty, setIsDataEmpty] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const manufacturer = searchParams.get("manufacturer") || "";
      const model = searchParams.get("model") || "";
      const year = Number(searchParams.get("year")) || 0; // for rapidapi - 2020
      const fuel = searchParams.get("fuel") || "";
      const limit = Number(searchParams.get("limit")) || 12;

      try {
        const cars = await fetchCars({
          manufacturer,
          model,
          year,
          fuel,
          limit,
        });

        if (cars?.data && cars?.data.length > 0) {
          setAllCars(cars.data); // for rapidapi - cars
          setIsDataEmpty(false);
        } else {
          setAllCars([]);
          setIsDataEmpty(true);
          setMessage(cars?.message);
        }
      } catch (error) {
        setAllCars([]);
        setIsDataEmpty(true);
        setMessage("Failed to fetch data. Please try again later.");
      }
    };

    fetchData();
  }, [searchParams]);

  return (
    <div className="mt-12 padding-x padding-y max-width" id="discover">
      <div className="home__text-container">
        <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
        <p>Explore our wide range of cars from different manufacturers</p>
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>
        {!isDataEmpty ? (
          <section className="w-full">
            <div className="home__cars-wrapper">
              {allCars.map((car, index) => (
                <CarCard key={index} car={car} />
              ))}
            </div>
            <ShowMore
              pageNumber={(Number(searchParams.get("limit")) || 10) / 10}
              isNext={
                (Number(searchParams.get("limit")) || 10) > allCars.length
              }
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;
