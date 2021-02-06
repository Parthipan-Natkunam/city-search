import * as React from "react";
import { CitiesAction, CitiesDispatch, CititesContextState } from "../types";

const initialState: CititesContextState = {
  data: [],
  filteredData: [],
  currentPage: 1,
  totalPages: 0,
  itemsPerPage: 6,
  isDataReady: false,
};

type ProviderProps = { children: React.ReactNode };

const CitiesStateContext = React.createContext<CititesContextState>(
  initialState
);
const CitiesDispatchContext = React.createContext<CitiesDispatch | undefined>(
  undefined
);

function citiesReducer(state: CititesContextState, action: CitiesAction) {
  switch (action.type) {
    case "setData":
      return action.data
        ? {
            ...state,
            data: action.data,
            filteredData: action.data,
            totalPages: Math.ceil(action.data.length / state.itemsPerPage),
          }
        : state;
    case "setCurrentPage":
      return action.currentPage
        ? { ...state, currentPage: action.currentPage }
        : state;
    case "setFilteredData":
      return action.data
        ? {
            ...state,
            filteredData: action.data,
            totalPages: Math.ceil(action.data.length / state.itemsPerPage),
            currentPage: 1,
          }
        : state;
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
