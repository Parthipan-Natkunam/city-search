import { City, CityRawResponse, SearchableKey } from "../types";

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
  const trimmedSearchTerm = searchTerm.trim().toLowerCase();
  if (trimmedSearchTerm.length) {
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
