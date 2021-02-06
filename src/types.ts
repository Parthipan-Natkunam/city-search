export type SearchableKey = "city";

export type NetworkFetchResult = {
  isLoading: boolean;
  isError: boolean;
};

export type CityRawResponse = {
  city: string;
  lat: string;
  lng: string;
  country: string;
  iso2: string;
  admin_name: string;
  capital: string;
  population: string;
  population_proper: string;
};

export type City = {
  city: string;
  lat: number;
  lng: number;
  province: string;
  population: string;
  populationNumeric: number;
};

export type CititesContextState = {
  data: Array<City>;
  filteredData: Array<City>;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  isDataReady: boolean;
};

export type CitiesAction = {
  type: CitiesActionTypes;
  data?: Array<City>;
  currentPage?: number;
  isReady?: boolean;
};

export type CitiesDispatch = (action: CitiesAction) => void;

type CitiesActionTypes =
  | "setData"
  | "setCurrentPage"
  | "setFilteredData"
  | "toggleDataReady";
