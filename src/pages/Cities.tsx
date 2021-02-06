import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { CityCard, Pagination } from "../components";
import { useFetchAllCities } from "../hooks";
import { useCitiesState, useCitiesDispatch } from "../context/CitiesContext";
import { getCurrentPageData } from "../utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paginationContainer: {
      marginTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      display: "flex",
      justifyContent: "center",
    },
  })
);

const CitiesPage: React.FC = (): JSX.Element => {
  const { isLoading, isError } = useFetchAllCities(process.env.CITIES_ENDPOINT);
  const {
    filteredData: cities,
    currentPage,
    itemsPerPage,
    totalPages,
  } = useCitiesState();
  const classes = useStyles();
  const currentPageDispatch = useCitiesDispatch();

  const handlePageChange = (pageNumber: number): void => {
    currentPageDispatch({ type: "setCurrentPage", currentPage: pageNumber });
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <>
      <Grid container>
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
      </Grid>
      <Grid container className={classes.paginationContainer}>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </Grid>
    </>
  );
};

export default CitiesPage;
