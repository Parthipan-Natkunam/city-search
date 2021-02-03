import * as React from "react";
import { CitiesFetchResult } from "../types";

export const useFetchAllCities = (
  citiesEndpoint: string
): CitiesFetchResult => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState(null);
  const [isError, setIsError] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchAllCities = async () => {
      try {
        const response = await fetch(citiesEndpoint);
        const data = await response.json();
        setIsLoading(false);
        setData(data);
      } catch (error: unknown) {
        setIsLoading(false);
        setIsError(true);
      }
    };
    fetchAllCities();
  }, [setIsLoading, setData, setIsError]);
  return {
    isLoading,
    isError,
    data,
  };
};
