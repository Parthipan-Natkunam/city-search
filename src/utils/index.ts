import {
  City,
  CityRawResponse,
  SearchableKey,
  ExactMatchSearchableKey,
  NumericDataProps,
  StringDataProps,
  Filters,
  GeoCoordinates,
} from "../types";

const oneRadian = Math.PI / 180;

function processCityName(name: string | undefined): string {
  return name?.trim()?.length ? name.trim() : "Unnamed City";
}

function processGenericString(input: string | undefined): string {
  return input?.trim()?.length ? input.trim() : "N/A";
}

function processNumericString(numericString: string | undefined): number {
  // using Number() shorthand operator '+',
  //assuming default lat/lng/populationNumeric(will be used for sorting) to be 0 ¯\_(ツ)_/¯
  return Number.isNaN(+numericString) ? 0 : +numericString;
}

export function getprocessedResponse(
  rawResponse: Array<CityRawResponse>
): Array<City> {
  if (rawResponse?.length) {
    return rawResponse.map(
      (data: CityRawResponse): City => {
        const { city, admin_name: province, lat, lng, population } = data;
        return {
          city: processCityName(city),
          lat: processNumericString(lat),
          lng: processNumericString(lng),
          population: processGenericString(population),
          province: processGenericString(province),
          populationNumeric: processNumericString(population),
        };
      }
    );
  }
  return [];
}

export function getCurrentPageData(
  FilteredData: Array<City>,
  currentPage: number,
  itemsPerPage: number
): Array<City> {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const excludedUpperIndex = currentPage * itemsPerPage;

  return FilteredData?.length
    ? [...FilteredData].slice(startIndex, excludedUpperIndex)
    : [];
}

export function searchForStringValues(
  list: Array<City>,
  key: SearchableKey,
  searchTerm: string
): Array<City> {
  const trimmedSearchTerm = searchTerm?.trim()?.toLowerCase();
  if (trimmedSearchTerm?.length) {
    return list.filter(
      (item: City) => item[key].toLowerCase().indexOf(trimmedSearchTerm) > -1
    );
  }
  return list;
}

export const debounce = (callback: Function, timeout?: number): Function => {
  let timeoutId: number | null = null;
  return (input: string | undefined) => {
    timeoutId && window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => callback(input), timeout ?? 300);
  };
};

export function getAllProvinces(originalList: Array<City>): Array<string> {
  const uniqueProvinces = new Set([
    "None",
    ...originalList.map((city: City) => city.province),
  ]);
  return Array.from(uniqueProvinces);
}

export function getExactMatchData(
  list: Array<City>,
  key: ExactMatchSearchableKey,
  value?: string
): Array<City> {
  if (!value || value === "None") return list;
  return list.filter((item: City) => item[key] === value);
}

function sortStrings(
  list: Array<City>,
  key: StringDataProps,
  order?: "ASC" | "DESC"
): Array<City> {
  return list.sort((item1, item2) =>
    order === "DESC"
      ? item2[key].localeCompare(item1[key])
      : item1[key].localeCompare(item2[key])
  );
}

function sortNumbers(
  list: Array<City>,
  key: NumericDataProps,
  order?: "ASC" | "DESC"
): Array<City> {
  return list.sort((item1, item2) =>
    order === "DESC" ? item2[key] - item1[key] : item1[key] - item2[key]
  );
}

export function getFilteredResults(
  originalList: Array<City>,
  filters: Filters
): Array<City> {
  let results: Array<City>;

  // perform city search if searchTerm is present
  results = searchForStringValues(originalList, "city", filters?.name);

  // perform province filter
  results = getExactMatchData(results, "province", filters?.province);

  // sort data
  if (filters?.sort?.sortKey) {
    const sortOrder = filters?.sort?.sortOrder;
    const sortKey = filters?.sort?.sortKey;

    switch (sortKey.toLowerCase()) {
      case "name":
        return sortStrings([...results], "city", sortOrder);
      case "population":
        return sortNumbers([...results], "populationNumeric", sortOrder);
      case "distance":
        return sortNumbers([...results], "distanceFromUser", sortOrder);
      default:
        return results;
    }
  }

  return results;
}

export const getUserLocation = (): Promise<GeoCoordinates> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation not supported by the browser");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lng } = position.coords;
          if (typeof lat === void 0 || typeof lng === void 0) {
            reject("Browser returned invalid location");
          }
          resolve({ lat, lng });
        },
        () => reject("Unable to get device location")
      );
    }
  });
};

function degreeToRadians(locIndegree: GeoCoordinates): GeoCoordinates {
  const { lat, lng } = locIndegree;
  return {
    lat: lat * oneRadian,
    lng: lng * oneRadian,
  };
}

function degreeToRadiansNumeric(degree: number): number {
  return degree * oneRadian;
}

export function calculateDistanceBetweenPointsInKm(
  location1: GeoCoordinates,
  location2: GeoCoordinates
) {
  //calc based on Haversine formula, error rate 0.5%
  const earthRadius = 6371;
  const { lat: deltaLat, lng: deltaLng } = degreeToRadians({
    lat: location2.lat - location1.lat,
    lng: location2.lng - location1.lng,
  });
  const sideA =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(degreeToRadiansNumeric(location1.lat)) *
      Math.cos(degreeToRadiansNumeric(location2.lat)) *
      Math.sin(deltaLng / 2) *
      Math.sin(deltaLng / 2);
  const sideC = 2 * Math.atan2(Math.sqrt(sideA), Math.sqrt(1 - sideA));
  return earthRadius * sideC; // disatnce in KM = RadiusofEarth*sideC
}
