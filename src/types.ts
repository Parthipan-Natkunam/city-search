type NetworkFetchResult = {
  isLoading: boolean;
  isError: boolean;
};

type City = {
  city: string;
  lat: number;
  lng: number;
  country: string;
  iso2: string;
  province: string;
  capital: string;
  population: number;
  population_proper: number;
};

export type CitiesFetchResult = NetworkFetchResult & { data: Array<City> };
