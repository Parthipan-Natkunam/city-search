import * as React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Navbar } from "./components";
import { useFetchAllCities } from "./hooks";

const App: React.FC = (): JSX.Element => {
  const { isLoading, isError, data: cities } = useFetchAllCities(
    process.env.CITIES_ENDPOINT
  );

  return (
    <>
      <CssBaseline>
        <Navbar brandTitle="City Searcher" />
        {/* {isLoading && <h1>Loading...</h1>}
      {isError && <h1>Something went wrong...</h1>}
      {cities?.length && (
        <div>
          {cities.map(({ city, lat, lng }: any) => (
            <p key={`city-${lat}-${lng}`}>{city}</p>
          ))}
        </div>
      )} */}
      </CssBaseline>
    </>
  );
};

export default App;
