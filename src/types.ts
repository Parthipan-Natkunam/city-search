export type SearchableKey = "city";
export type ExactMatchSearchableKey = "province";
export type SortableKey = "name" | "population" | "distanceFromUser";

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
  distanceFromUser?: number;
};

export type NumericDataProps = keyof Pick<
  City,
  "lat" | "lng" | "populationNumeric" | "distanceFromUser"
>;
export type StringDataProps = keyof Omit<
  City,
  "lat" | "lng" | "populationNumeric" | "distanceFromUser"
>;

export type GeoCoordinates = {
  lat: number;
  lng: number;
};

export type CititesContextState = {
  data: Array<City>;
  filteredData: Array<City>;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  filters: Filters | null;
  provinces: Array<string>;
  isGeolocationEnabled?: boolean;
  userLocation?: GeoCoordinates;
};

export type Sortables = {
  sortKey: SortableKey;
  sortOrder: "ASC" | "DESC";
};

export type Filters = {
  name?: string;
  province?: string;
  sort?: Sortables;
};

export type CitiesAction = {
  type: CitiesActionTypes;
  data?: Array<City>;
  currentPage?: number;
  sortKey?: SortableKey;
  sortOrder?: "ASC" | "DESC";
  searchTerm?: string;
  province?: string;
  location?: GeoCoordinates;
};

export type CitiesDispatch = (action: CitiesAction) => void;

type CitiesActionTypes =
  | "setData"
  | "setCurrentPage"
  | "setSearchTerm"
  | "setProvinceFilter"
  | "setSortKey"
  | "setSortOrder"
  | "setUserLocation";
