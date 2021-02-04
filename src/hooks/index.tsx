import * as React from "react";
import { NetworkFetchResult } from "../types";
import { getprocessedResponse } from "../utils";
import { useCitiesDispatch } from "../context/CitiesContext";

export const useFetchAllCities = (
  citiesEndpoint: string
): NetworkFetchResult => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isError, setIsError] = React.useState<boolean>(false);

  const dataDispatch = useCitiesDispatch();

  React.useEffect(() => {
    const fetchAllCities = async () => {
      try {
        const response = await fetch(citiesEndpoint);
        const data = await response.json();
        const processedData = getprocessedResponse(data);
        setIsLoading(false);
        dataDispatch({ type: "setData", data: processedData });
      } catch (error: unknown) {
        setIsLoading(false);
        setIsError(true);
      }
    };
    fetchAllCities();
  }, [setIsLoading, setIsError]);
  return {
    isLoading,
    isError,
  };
};
