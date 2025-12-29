import { FilterProps, CarProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, model, year, fuel, limit } = filters;

  // const headers = {
  //   "x-rapidapi-key": "2ce1071830msh82991b4edd93117p174a18jsnca4de5bf1e69",
  //   "x-rapidapi-host": "cars-by-api-ninjas.p.rapidapi.com",
  // };

  // const response = await fetch(
  //   `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&fuel_type=${fuel}&model=${model}`,
  //   { headers: headers }
  // );

  const response = await fetch(
    `http://localhost:8080/api/v1/cars?make=${manufacturer}&model=${model}&year=${year}&fuel_type=${fuel}&limit=${limit}`
  );

  const result = await response.json();
  return result;
}

export const calculateCarRent = (cityMpg: number, year: number) => {
  const basePricePerDay = 50;
  const milageFactor = 0.1;
  const ageFactor = 0.05;

  const milageRate = cityMpg * milageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  const rentalRatePerDay = basePricePerDay + milageRate + ageRate;
  return rentalRatePerDay.toFixed(0);
};

export async function generateCarImageURL(car: CarProps, angle?: string) {
  try {
    // const url = new URL("https://cdn.imagin.studio/getimage");
    const url = new URL("http://localhost:5236/api/v1/carimages");

    const { make, model, year } = car;

    // url.searchParams.append("customer", "javascript-mastery");
    // url.searchParams.append("modelFamily", model.split(" ")[0]);
    // url.searchParams.append("zoomType", "fullscreen");

    url.searchParams.append("make", make);
    url.searchParams.append("model", model);
    url.searchParams.append("year", `${year}`);
    angle ? url.searchParams.append("angle", `${angle}`) : null;

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error("Failed to fetch car image URL");
    }
    
    const result = await response.json();
    return result.imageUrl || "/default.png";
  } catch (error) {
    return "/default.png";
  }
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value);
  
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  return newPathname;
};

export const removeSearchParam = (param: string) => {
  const url = new URL(window.location.href);
  url.searchParams.delete(param);
  return url.pathname + url.search;
};
