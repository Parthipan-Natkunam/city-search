import * as React from "react";
import { useFetchAllCities } from "./hooks";

const App: React.FC = (): JSX.Element => {
  const { isLoading, isError, data: cities } = useFetchAllCities(
    process.env.CITIES_ENDPOINT
  );

  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {isError && <h1>Something went wrong...</h1>}
      {cities?.length && (
        <div>
          {cities.map(({ city, lat, lng }: any) => (
            <p key={`city-${lat}-${lng}`}>{city}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
