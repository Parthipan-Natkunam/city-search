import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { CityCard } from "../components";
import { useFetchAllCities } from "../hooks";
import { useCitiesState } from "../context/CitiesContext";
import { getCurrentPageData } from "../utils";

const CitiesPage: React.FC = (): JSX.Element => {
  const { isLoading, isError } = useFetchAllCities(process.env.CITIES_ENDPOINT);
  const { filteredData: cities, currentPage, itemsPerPage } = useCitiesState();

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {isError && <h1>Something went wrong...</h1>}
      {cities?.length ? (
        <>
          {getCurrentPageData(cities, currentPage, itemsPerPage).map(
            ({ city: name, population, province, lat, lng }: any) => (
              <Grid item xs={12} sm={6} lg={4} key={`grid-${lat}-${lng}`}>
                <CityCard
                  name={name}
                  population={population}
                  province={province}
                  lat={lat}
                  lng={lng}
                />
              </Grid>
            )
          )}
        </>
      ) : null}
    </>
  );
};

export default CitiesPage;
