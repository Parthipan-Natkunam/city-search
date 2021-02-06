import * as React from "react";
import { CitiesAction, CitiesDispatch, CititesContextState } from "../types";
import { getFilteredResults, getAllProvinces } from "../utils";

const initialState: CititesContextState = {
  data: [],
  filteredData: [],
  provinces: [],
  currentPage: 1,
  totalPages: 0,
  itemsPerPage: 6,
  filters: null,
};

type ProviderProps = { children: React.ReactNode };

const CitiesStateContext = React.createContext<CititesContextState>(
  initialState
);
const CitiesDispatchContext = React.createContext<CitiesDispatch | undefined>(
  undefined
);

const getFilteredState = (
  state: CititesContextState,
  resetProvinceArray?: boolean
): CititesContextState => {
  const { data, filters } = state;
  const filteredData = getFilteredResults(data, filters);
  return {
    ...state,
    filteredData: filteredData,
    provinces: resetProvinceArray
      ? getAllProvinces(filteredData)
      : state.provinces,
    totalPages: Math.ceil(filteredData.length / state.itemsPerPage),
    currentPage: 1,
  };
};

function citiesReducer(state: CititesContextState, action: CitiesAction) {
  switch (action.type) {
    case "setData":
      return action.data
        ? {
            ...state,
            data: action.data,
            filteredData: action.data,
            provinces: getAllProvinces(action.data),
            totalPages: Math.ceil(action.data.length / state.itemsPerPage),
          }
        : state;
    case "setCurrentPage":
      return action.currentPage
        ? { ...state, currentPage: action.currentPage }
        : state;
    case "setSortKey":
      let filtersCopy = {
        ...state.filters,
      };
      if (action.sortKey) {
        filtersCopy = {
          ...filtersCopy,
          sort: {
            sortKey: action.sortKey,
            sortOrder: filtersCopy?.sort?.sortOrder ?? "ASC",
          },
        };
      } else {
        delete filtersCopy.sort;
      }
      return { ...state, filters: filtersCopy };
    case "setSortOrder": {
      if (action.sortOrder) {
        const filtersCopy = {
          ...state.filters,
          sort: {
            ...state.filters.sort,
            sortOrder: action.sortOrder,
          },
        };
        return { ...state, filters: filtersCopy };
      }
      return;
    }
    case "setSearchTerm":
      if (action.searchTerm !== undefined) {
        const newState = {
          ...state,
          filters: { ...state.filters, name: action.searchTerm },
        };
        return getFilteredState(newState, true);
      }
      return;
    case "setProvinceFilter":
      if (action.province) {
        const newState = {
          ...state,
          filters: { ...state.filters, province: action.province },
        };
        return getFilteredState(newState);
      }
      return;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export function CitiesProvider({ children }: ProviderProps) {
  const [state, dispatch] = React.useReducer(citiesReducer, initialState);

  return (
    <CitiesStateContext.Provider value={state}>
      <CitiesDispatchContext.Provider value={dispatch}>
        {children}
      </CitiesDispatchContext.Provider>
    </CitiesStateContext.Provider>
  );
}

export function useCitiesState() {
  const context = React.useContext(CitiesStateContext);
  if (context === undefined) {
    throw new Error("useCitiesState must be within CitiesProvider");
  }
  return context;
}

export function useCitiesDispatch() {
  const context = React.useContext(CitiesDispatchContext);
  if (context === undefined) {
    throw new Error("useCitiesDispatch must be within CitiesProvider");
  }
  return context;
}
