import * as React from "react";
import { NetworkFetchResult } from "../types";
import { getprocessedResponse, debounce } from "../utils";
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
        const { data } = await response.json();
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

export const useScreenWidth = (): { width: number; isSmall: boolean } => {
  const [windowWidth, setWindowWidth] = React.useState<number>(
    window.innerWidth
  );
  const [isSmall, setIsSmall] = React.useState<boolean>(false);
  const threshold = 769;

  React.useEffect(() => {
    setIsSmall(windowWidth < threshold);
  }, [windowWidth, setIsSmall]);

  React.useEffect(() => {
    const debouncedHandler = debounce(() => {
      setWindowWidth(window.innerWidth);
    });

    const resizeHandler = (ev: UIEvent) => debouncedHandler();

    window.addEventListener("resize", resizeHandler);

    debouncedHandler();

    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return {
    width: windowWidth,
    isSmall,
  };
};
