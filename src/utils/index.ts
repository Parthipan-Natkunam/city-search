import {
  City,
  CityRawResponse,
  SearchableKey,
  SortableKey,
  ExactMatchSearchableKey,
  NumericDataProps,
  StringDataProps,
  Filters,
} from "../types";

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
    results =
      filters.sort.sortKey.toLowerCase() === "population"
        ? sortNumbers(results, "populationNumeric", sortOrder)
        : sortStrings(results, "city", sortOrder);
  }
  return results;
}
